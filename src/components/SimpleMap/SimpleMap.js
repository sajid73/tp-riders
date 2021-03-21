import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const key = "AIzaSyBwQd5WsEigDxI5FOo8aE6ENwHZe7TPSpM";
 
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 23.77,
      lng: 90.39
    },
    zoom: 11
  };
 
  render() {
    return (
      <div style={{ height: '90%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: key }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={23.777176}
            lng={90.399452}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default SimpleMap;