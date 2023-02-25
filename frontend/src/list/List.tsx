import React from "react";
import "./List.css";
import Organization from "./Organization";

export type ListProps = {
    organizations: Map<string, string>[]
}

export default class List extends React.Component<ListProps> {
    render() {
        return <div className="list">
                {
                    this.props.organizations.map((entry, index) => {
                        return <Organization key={index} info={entry} displayFields={["Industries", "Keywords"]}/>
                    })
                }
            </div>
    }
}