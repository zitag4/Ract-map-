import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './App.css';

class App extends Component {
  /*From npm: https://www.npmjs.com/package/google-map-react*/
  static defaultProps = {
    center: {
      lat: 40.7413549,
      lng: -73.9980244
    },
    zoom: 13
  };


    render() {
      return (
        <div id='map'>
        {/*From npm: https://www.npmjs.com/package/google-map-react*/}
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDRxmJRw4I4YQIMPSBFVuYfuWl79PLyDZQ' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}>
        </GoogleMapReact>




      </div>
    )
  }
}

export default App;
