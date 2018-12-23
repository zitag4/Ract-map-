import React, { Component } from 'react';
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

  componentDidMount() {
    this.renderMap()
  }

  renderMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDRxmJRw4I4YQIMPSBFVuYfuWl79PLyDZQ&v=3&callback=initMap')
    window.initMap = this.initMap
  }

   initMap = () => {
        const  map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 40.7413549, lng: -73.9980244},
          zoom: 13
          });
        }
/*  state = {
    marks: [
      {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
      {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
      {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
      {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
      {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
      {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
    ]} */



    render() {

      return (
        <div id='map'></div>
    );
  }
}

function loadScript(src) {
    let tag = window.document.getElementsByTagName('script')[0];
    let script = window.document.createElement('script');

    script.src = src;
    script.async = true;

    tag.parentNode.insertBefore(script, tag);
}

export default App;
