import React, { Component } from 'react';
import './App.css';
import Infowindow from './Infowindow.js';


class App extends Component {
  state = {
    sidebarOpen: false,
    markers: [],
    infoWOpen: false,
    currentMarker: {},
    map: '',
    infowindow: '',
    locations: [
        {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
        {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
        {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
        {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
        {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
        {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
        ]
      }
  componentDidMount() {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDRxmJRw4I4YQIMPSBFVuYfuWl79PLyDZQ&v=3&callback=initMap')
    window.initMap = this.initMap
  }

  initMap = () => {
    // Create a new blank array for all the listing markers.
    let markers = [];

    const google = window.google;
  let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7413549, lng: -73.9980244},
      zoom: 13
    })

  let infowindow = new google.maps.InfoWindow();
  console.log('infowindow'+infowindow);
  this.setState({map: map, infowindow: infowindow})


    var locations = [
      {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
      {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
      {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
      {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
      {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
      {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
    ];

    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
      // Get the position from the location array.
      let position = locations[i].location;
      let title = locations[i].title;

      // Create a marker per location, and put into markers array.
      let marker = new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        id: i
      });

      // Push the marker to our array of markers.
      markers.push(marker);
      //  infowindow.open(map, marker)
      // Create an onclick event to open an infowindow at each marker.
      marker.addListener('click', () => {
        this.openInfoWindow(marker);
      });
    }
    this.setState({markers: markers});
  }

  openInfoWindow = (marker) => {
    this.setState({
      currentMarker: marker,
      infoWOpen: true
      });

    //this.state.infowindow.open(this.state.map, this.state.currentMarker)
    }


  updateInfowindow = () => {
      if(this.state.infoWOpen) {

      if (this.state.infowindow) {

        this.state.infowindow.setContent('<div>' + this.state.currentMarker.title + '</div>');
        this.state.infowindow.open(this.state.map, this.state.currentMarker);
        // Make sure the marker property is cleared if the infowindow is closed.
        this.state.infowindow.addListener('closeclick', () => {
      //    this.state.infowindow.setMarker = null;
          this.setState({
            currentMarker: null,
            infoWOpen: false
            });
        });
      }
    }

  }

  openSidebar = () => {
    this.setState( (prevState) => {
      return {sidebarOpen: !prevState.sidebarOpen};
    });
  }
  closeSidebar = () => {
    this.setState({sidebarOpen: false});
  }

  render() {
    return (
      <div className='app'>
      <header>

        <nav className='navigation'>
          <button className='menu-button' onClick={this.openSidebar}>
            <div className='menu-button-line'/>
            <div className='menu-button-line'/>
            <div className='menu-button-line'/>
          </button>
          <h1>Explore the world</h1>
        </nav>
      </header>
    { this.state.sidebarOpen &&
        <div className='sidebar'>
          <ul>
            <li><a href='/'>ez</a></li>
            <li><a href='/'>az</a></li>
          </ul>
        </div>
    }


{/*      <nav className='list' role='navigation'>

        {this.state.markers.map( (marker, i) => (
              <a key={i} className='list-item' href='localhost:3000/#'onKeyPress={this.updateInfowindow.bind(this, marker)}
                                       onClick={this.updateInfowindow.bind(this, marker)}>
                {marker.title}
              </a>
          )
        ) }
        </nav> */}
        <main>
	         <div id='map' onClick={this.closeSidebar}></div>
	      </main>

      <div>

     {this.updateInfowindow()}
     /*{
      this.state.infoWindowIsOpen &&
        <Infowindow
          updateInfowindow={this.state.updateInfowindow}
          currentMarker={this.state.currentMarker}
        />} */
      </div>
      </div>
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
