import React, { Component } from 'react';
import './App.css';
import SearchList from './SearchList.js';
import axios from 'axios';

class App extends Component {
  state = {
    h2Info: 'Explore the world',
    venues: [],
    markers: [],
    infoWOpen: false,
    currentMarker: {},
    map: '',
    infowindow: ''
  }

  componentDidMount() {
    this.getVenues();
  }

  renderMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDRxmJRw4I4YQIMPSBFVuYfuWl79PLyDZQ&v=3&callback=initMap')
    window.initMap = this.initMap
  }

  //I used foursquare's places API to get location information
  getVenues = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?';
    const parameters = {
      client_id: 'GBCUIPW1GMDADLUUNRKTST4PIBCAI3PBGZAKI1WBX02CBXB4',
      client_secret: 'YEIZF1BKB2YANFN5YRLNMRQ0FXOJZXYHOG150NPZEXBVULYF',
      query: 'cinema',
      near: 'Hanover',
      v: '20181227'
    }
    //Making the request for locations data (https://github.com/axios/axios)
    axios.get(endPoint + new URLSearchParams(parameters)).then( (response) => {
      this.setState({
          venues: response.data.response.groups[0].items
        }, this.renderMap() )
      }).catch( (error) => {
        console.log('error' + error)
        this.setState({h2Info: 'Error in loading Foursquare API...'})
      })
  }

  initMap = () => {
    let markers = [];
    const google = window.google;
    // Constructor creates a new map
    let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 52.3664032, lng: 9.7441556},
      zoom: 13
    })
    let infowindow = new google.maps.InfoWindow();

    this.setState({map: map, infowindow: infowindow})

    // Create a marker per location, and put into markers array.
    this.state.venues.forEach( (venue, i) => {
      let marker = new google.maps.Marker({
        map: map,
        position: {lat: venue.venue.location.lat, lng: venue.venue.location.lng},
        title: venue.venue.name,
        address: venue.venue.location.address,
        animation: google.maps.Animation.DROP,
        id: i
      });
      // Push the marker to array of markers.
      markers.push(marker);
      // Create an onclick event to open an infowindow at each marker.
      marker.addListener('click', () => {
        this.openInfoWindow(marker);
      });
     })
    this.setState({markers: markers});
  }

  openInfoWindow = (marker) => {
    this.setState({
      currentMarker: marker,
      infoWOpen: true
    });
  }

  // When a marker is clicked the infowindow is showed with
  //informations about the currentMarker (last selected) locations
  updateInfowindow = () => {
    if(this.state.infoWOpen) {
      if (this.state.infowindow) {
        this.state.infowindow.setContent('<div> <h3>' + this.state.currentMarker.title + '</h3> <p>' + this.state.currentMarker.address+'</p> </div>');
        this.state.infowindow.open(this.state.map, this.state.currentMarker);
        this.state.currentMarker.setAnimation(
					window.google.maps.Animation.BOUNCE)
          setTimeout((this.state.currentMarker.setAnimation((null))), 1000);
        // clear marker property if the infowindow is closed.
        this.state.infowindow.addListener('closeclick', () => {
        //this.state.infowindow.setMarker = null;
          this.setState({
            currentMarker: null,
            infoWOpen: false
            });
        });
      }
    }
  }

  render() {
    return (
      <div className='app'>
        <SearchList
          openInfoWindow = {this.openInfoWindow}
          markers = {this.state.markers}
          map = {this.state.map}
          h2Info = {this.state.h2Info}/>
        <main>
	         <div id='map' role='application'></div>
	      </main>
        <div tabIndex={0}>{this.updateInfowindow()}</div>
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
