import React from "react";
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';

class MapContainerProps {
  google: any;
}

class MapContainerState {
  selectedPlace: any;
}

export class MapContainer extends React.Component<MapContainerProps, MapContainerState> {
  onMarkerClick() {
    return;
  }

  onInfoWindowClose() {
    return;
  }
  
  render() {
    return (
      <Map google={this.props.google} zoom={14}
        initialCenter={{
          lat: 40.854885,
          lng: -88.081807
        }}>

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
 
        <Marker onClick={this.onMarkerClick}
        // name={'Current location'}
        />
      </Map>
    );
  }
}
 
export default GoogleApiWrapper({
  apiKey: (process.env.GOOGLE_MAPS_API_KEY!)
})(MapContainer)