import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './chat/Chat';
import List from './list/List';
import {GoogleMapComponent} from './MapView';

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
function App() {

  return (
    <div className="app">
      <div className="header">
        <img src="logo.png" className="logo"/>
        <h2>Desearch</h2>
      </div>
      <div className="main">
        <div className="left">
        <GoogleMapComponent
          cords={[
            {latitude: 52.011898, longitude: 4.3602567},
            {latitude: 52.011898, longitude: 4.3602567},
            {latitude: 52.011898, longitude: 4.3602567},
            {latitude: 52.011898, longitude: 4.3602567},
            {latitude: 52.011898, longitude: 4.3602567},
            {latitude: 52.011898, longitude: 4.3602567},
          ]}
        />
        </div>
        <div className="right">
          <Chat/>
        </div>
      </div>
    </div>
  );
}
