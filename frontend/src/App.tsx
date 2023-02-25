import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './chat/Chat';
import {GoogleMapComponent} from './MapView';

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

export default App;
