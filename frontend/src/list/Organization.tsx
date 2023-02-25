import React from "react";
import "./Organization.css"

export type OrganizationProps = {
    info: any
    displayFields: string[]
}

export default class Organization extends React.Component<OrganizationProps> {
    getName() {
        var name = this.props.info["Organization Name"]
        if (name.startsWith("The name of the organization is ")) {
            name = name.substring(0, name.length - 1)
            return name.substring(32)
        }
        return name
    }

    render() {
        return <div className="organization">
            <div className="organization-inner">
                <div className="org-left">
                    <h2>{this.getName()}</h2>
                    <p>{this.props.info["Description"]}</p>
                </div>
                <div className="org-right">
                    {this.props.displayFields.map((field, index) => 
                        <p key={index}><b>{field}:</b> {this.props.info[field]}</p>
                    )}
                </div>
            </div>
        </div>
    }
}
