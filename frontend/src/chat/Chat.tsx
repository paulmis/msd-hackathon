import React from "react";
import "./Chat.css";
import Message, { MessageType, MessageContent } from "./Message";

export type ChatProps = {
    update_callback: (orgs: any[]) => void
}

export type ChatState = {
    messages: MessageContent[]
    history: any[]
}

export default class Chat extends React.Component<ChatProps, ChatState> {
    constructor(props: any) {
        super(props)
        this.state = {
            messages: [{text: "Hey, I'm Desearch. Write a question about organizations in Delft to get started.", type: MessageType.API}],
            history: [],
        }
    }
    
    isDisplayMessage(text: string): MessageContent | null {
        if (text.startsWith("User: ")) {
            return new MessageContent(text.substring(6), MessageType.User)
        } else if (text.startsWith("Christopher: ")) {
            return new MessageContent(text.substring(13), MessageType.API)
        } else {
            return null
        }
    }

    sendQuery(text: string) {
        console.log("Sending query: " + text)

        this.setState({
            messages: [...this.state.messages, {text: text, type: MessageType.User}]
        })

        console.log(JSON.stringify({
            messages: this.state.history,
            query: text
        }))

        fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({  
                messages: this.state.history,
                query: text
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            this.setState({
                history: data.messages,
                messages: data.messages.map((text: string) => this.isDisplayMessage(text)).filter((message: MessageContent | null) => message != null) as MessageContent[],
            })

            data.display = data.display.map((org: any) => ({
                ...org,
                "Organization Name": org["Organization Name"].startsWith("The name of the organization is ") ? org["Organization Name"].substring(32, org["Organization Name"].length - 1) : org["Organization Name"]
            }))

            this.props.update_callback(data.display)
        })
        .catch((error) => {
            console.error('Error:', error);

            this.setState({
                messages: [...this.state.messages, {text: "The API is unreachable", type: MessageType.Error}]
            })
        });
    }

    _handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            this.sendQuery(e.target.value)
        }
    }

    render() {
        return <div className="chat">
            <input className="chat-input" type="text" onKeyDown={this._handleKeyDown} />
            <div className="messages">
                {this.state.messages.map((message, index) => 
                    <Message key={index} text={message.text} type={message.type} />
                )}
            </div>
        </div>
    } 
}