import React from "react";
import "./Organization.css"

export type OrganizationProps = {
    info: any
    displayFields: string[]
}

export default class Organization extends React.Component<OrganizationProps> {

    render() {
        return <div className="organization">
            <div className="organization-inner">
                <div className="org-left">
                    <h2>{this.props.info["Organization Name"]}</h2>
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
