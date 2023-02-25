import React from 'react'
import './Message.css'

export enum MessageType {
    User = "message-user",
    API = "message-api",
    Error = "message-error"
}

export type MessageProps = {
    text: string,
    type: MessageType
}

export class MessageContent implements MessageProps {
    text: string
    type: MessageType

    constructor(text: string, type: MessageType) {
        this.text = text
        this.type = type
    }
}

export default class Message extends React.Component<MessageProps>{
    render() {
        return <div className={"message " + this.props.type}>
            <p>{this.props.text}</p>
        </div>
    }
}