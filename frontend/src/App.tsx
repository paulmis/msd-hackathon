import './App.css';
import Chat from './Chat';
import MapView from './MapView';

function App() {
  return (
    <div className="app">
      <div className="header">
        <p>text</p>
      </div>
      <div className="main">
        <div className="left">
          <MapView></MapView>
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
