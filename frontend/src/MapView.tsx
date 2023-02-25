import React, { Component } from "react";
import { Map, Marker, Overlay } from "pigeon-maps";

export type GoogleMapComponentProps = {
  cords: any;
};

export class GoogleMapComponent extends Component<GoogleMapComponentProps> {
  render() {
    console.log("created");
    return (
      <Map defaultCenter={[52.011898, 4.3602567]} defaultZoom={13}>
        {this.props.cords.map((cord: any, index: any) => {
          return (
              <Marker
                key={index}
                width={50}
                anchor={[cord.latitude, cord.longitude]}
                onClick={() => console.log("clicked")}
              />
          );
        })}
        {this.props.cords.map((cord: any, index: any) => {
          return (
            <Overlay anchor={[cord.latitude, cord.longitude]} offset={[60, 15]}>
              <span>This is Brussels</span>
            </Overlay>
          );
        })}
      </Map>
    );
  }
}
