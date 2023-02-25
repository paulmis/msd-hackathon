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

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
backend_url = os.getenv("BACKEND_URL")

completions_data = pd.read_csv("data/completions.csv")
locations_data = pd.read_csv("data/locations.csv")
embeddings_data = pd.read_csv("data/embeddings.csv")

website_to_id = {j:i for i, j in enumerate(completions_data["url"].unique())}
id_to_website = {i:j for i, j in enumerate(completions_data["url"].unique())}

print(id_to_website)

app = Flask(__name__)
swagger = Swagger(app)

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=9007)