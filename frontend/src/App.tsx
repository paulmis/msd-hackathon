import React from 'react';
import logo from './logo.svg';
import './App.css';
import Chat from './Chat';

function App() {
  return (
    <div className="app">
      <div className="header">
        <p>text</p>
      </div>
      <div className="main">
        <div className="left">
          <p>text</p>
        </div>
        <div className="right">
          <p>text</p>
          <Chat></Chat>
        </div>
      </div>
    </div>
  );
}

export default App;
