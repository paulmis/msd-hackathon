import React from 'react'
import './Message.css'

export enum MessageType {
    User,
    API
}

type MessageProps = {
    message: string,
    type: MessageType
}

export default class Message extends React.Component<MessageProps>{
    render() {
        return <div className={"message " + (this.props.type == MessageType.API ? "message-api" : "message-user")}>
            <p>{this.props.message}</p>
        </div>
    }
}