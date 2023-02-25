from collections import deque
import time
from flask import Flask, jsonify, request
import os
from dotenv import load_dotenv
import openai
from flasgger import Swagger
import requests
import urllib
import numpy as np
import pandas as pd

app = Flask(__name__)
swagger = Swagger(app)

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
backend_url = os.getenv("BACKEND_URL")

completions_data = pd.read_csv("data/completions.csv")
locations_data = pd.read_csv("data/locations.csv")
embeddings_data = pd.read_csv("data/embeddings.csv")

website_to_id = {j:i for i, j in enumerate(completions_data["url"].unique())}
id_to_website = {i:j for i, j in enumerate(completions_data["url"].unique())}

def get_all_completions_data(index):
    filtered_data = completions_data[completions_data["url"] == id_to_website[index]]
    prompts = filtered_data["prompt"]
    completions = filtered_data["output"]

    return {i:j for i,j in zip(prompts, completions)}

def get_location_data(index):
    filtered_data = locations_data[locations_data["url"] == id_to_website[index]]
    if len(filtered_data) == 0:
        return np.array([-1, -1])
    locations = filtered_data["location"].iloc[0][1:-1].replace(' ', '')

    locations = locations.split(",")
    location = float(locations[0]), float(locations[1])
    
    return np.array(location)

def get_description_of_website(index):
    all_data = get_all_completions_data(index)
    if "Description" in all_data:
        return all_data["Description"]
    else:
        return None

def get_embedding_of_website(index):
    filtered_data = embeddings_data[embeddings_data["url"].str.startswith(id_to_website[index])]
    if len(filtered_data) == 0:
        return [0]*1536
    embedding = filtered_data["embedding"].iloc[0][1:-1].replace(' ', '')

    embedding = embedding.split(",")
    embedding = [float(i) for i in embedding]

    return embedding

website_embeddings = np.array([get_embedding_of_website(i) for i in range(len(website_to_id))]).reshape(-1, 1536)
website_locations = np.array([get_location_data(i) for i in range(len(website_to_id))])
website_descriptions = [get_description_of_website(i) for i in range(len(website_to_id))]

# read all from file init prompt
initial_prompt = open("data/init_prompt.txt", "r").read()

def get_completion(s):
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=initial_prompt + s,
        temperature=0.4,
        top_p=1,
        max_tokens=500,
        stop=["User:","BASE:"]
    )
    
    return response.choices[0].text

def get_embedding(s):
    # Get the query from the body of the request
    response = openai.Embedding.create(
        model="text-embedding-ada-002",
        input=[s],
    )['data'][0]['embedding']
    return np.array(response)

def search_by_query(s):
    # Get top 5 results
    # Get the embedding of the query
    query_embedding = get_embedding(s)
    # Get the cosine similarity of the query with all the embeddings
    similarities = np.dot(website_embeddings, query_embedding)
    # Get the top 5 results
    top_5 = np.argsort(similarities)[-5:]
    # Make a response of the form
    #[
    # {
    #     "url": "www.makerspacedelft.com",
    #     "id": 635
    # },
    # {
    #     "url": "www.makerspacepower.com",
    #     "id": 45
    # },
    # {
    #     "url": "www.powermaker.com",
    #     "id": 70
    # }]
    # as list of dicts
    response = []
    for i in top_5:
        response.append({"url": id_to_website[i], "id": i})
    return str(response)

def break_christopher_query(s):
    # Get every text in between <> and remove the <>
    # Regex
    import re
    broken = re.findall(r'<(.*?)>', s)
    response = ""
    for i in broken:
        splitted_query = i.split("=")
        if len(splitted_query) != 2:
            print("Invalid query")
            return None
        query_type = splitted_query[0]
        query_value = splitted_query[1]
        if query_type == "search":
            result = search_by_query(query_value)
            response += result
        elif query_type == "location":
            result = website_locations[int(query_value)]
            response += result
    return response


def talk_to_gpt(s, max_iters=10):
    response = get_completion(s)
    # Check if it ends with DATA
    if response.endswith("DATA"):
        response = response + "BASE:"
        query = response.split("Query:")[1].split("DATA")[0]
        broken_response = break_christopher_query(query)
        response += broken_response
        if max_iters == 1:
            return s + talk_to_gpt(response + "\nChristopher:", max_iters-1)
        elif max_iters == 0:
            return s + response
        else:
            return s + talk_to_gpt(response, max_iters-1)
    else:
        return s + response
# print(
#     talk_to_gpt("\nUser: Find me the locations of ai startups in delft.\n")
# )

# Endpoint for the chatbot
@app.route('/chat', methods=['POST'])
def chatbot():
    """
    This is the endpoint for the chatbot
    ---
    parameters:
      - name: body
        in: body
        required: true
        schema:
          id: Chatbot
          required:
            - query
          properties:
            query:
              type: string
              description: The query to the chatbot
              default: "Hello"
    responses:
      200:
        description: The response of the chatbot
    """
    # Get the query from the body of the request
    query = request.json['query']
    # Get the response from the chatbot
    prompt = "User:" + query+"\n"
    response = talk_to_gpt(prompt)
    # Return the response
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=9007)