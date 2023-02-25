import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './chat/Chat';
import List from './list/List';

export type ListState = {
  organizations: Map<string, string>[]
}

export default class App extends React.Component<{}, ListState> {
  constructor(props: any) {
    super(props);
    this.state = {
      organizations: []
    }
  }


  render() {
    return (
      <div className="app">
        <div className="header">
          <img src="logo.png" className="logo"/>
          <div className="appTitle">
            <h2>Desearch</h2>
            <p>Find the right organizations in Delft</p>
          </div>
        </div>
        <div className="main">
          <div className="left">
            <p>text</p>
          </div>
          <div className="right">
            <Chat update_callback={(orgs) => this.setState({organizations: orgs})}/>
          </div>
        </div>
        <List organizations={this.state.organizations}/>
      </div>
    );
  }
}
