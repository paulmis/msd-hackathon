import React from "react";
import "./Chat.css";
import Message, { MessageType } from "./Message";

export default class Chat extends React.Component {
    _handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            console.log('do validate');
        }
    }

    render() {
        return <div className="chat">
            <input className="chat-input" type="text" onKeyDown={this._handleKeyDown} />
            <div className="messages">
                <Message message="Hello" type={MessageType.User} />
                <Message message="What's up?" type={MessageType.API} />
            </div>
        </div>
    } 
}