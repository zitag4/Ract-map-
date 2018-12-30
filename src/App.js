import React, { Component } from 'react';
import './App.css';
import Infowindow from './Infowindow.js';
import SearchList from './SearchList.js';
import axios from 'axios';



class App extends Component {
  state = {
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

  getVenues = () => {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?';
    const parameters = {
      client_id: 'GBCUIPW1GMDADLUUNRKTST4PIBCAI3PBGZAKI1WBX02CBXB4',
      client_secret: 'YEIZF1BKB2YANFN5YRLNMRQ0FXOJZXYHOG150NPZEXBVULYF',
      query: 'food',
      near: 'Hanover',
      v: '20182507'
    }

    axios.get(endPoint + new URLSearchParams(parameters)).then( (response) => {
      this.setState({
        venues: response.data.response.groups[0].items
      }, this.renderMap() )
    }).catch( (error) => console.log('error' + error) )
  }

  initMap = () => {
    // Create a new blank array for all the listing markers.
    let markers = [];

    const google = window.google;
  let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 52.3664032, lng: 9.7441556},
      zoom: 13
    })

  let infowindow = new google.maps.InfoWindow();

  this.setState({map: map, infowindow: infowindow})


      // Create a marker per location, and put into markers array.
      this.state.venues.map( (xvenue, i) => {
      let marker = new google.maps.Marker({
        map: map,
        position: {lat: xvenue.venue.location.lat, lng: xvenue.venue.location.lng},
        title: xvenue.venue.name,
        address: xvenue.venue.location.address,
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
     })

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

        this.state.infowindow.setContent('<div>' + '<h3>' + this.state.currentMarker.title + '</h3>' + '<p>' + this.state.currentMarker.address+'</p>' + '</div>');
        this.state.infowindow.open(this.state.map, this.state.currentMarker);
        this.state.currentMarker.setAnimation(
					window.google.maps.Animation.BOUNCE)
          setTimeout((this.state.currentMarker.setAnimation((null))), 1000);
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

  /*openSidebar = () => {
    this.setState( (prevState) => {
      return {sidebarOpen: !prevState.sidebarOpen};
    });
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display === 'none' ? sidebar.style.display = 'block' : sidebar.style.display = 'none';
  }
  closeSidebar = () => {
    this.setState({sidebarOpen: false});
  }*/




  render() {
    return (
      <div className='app'>



        <SearchList
          openInfoWindow = {this.openInfoWindow}
          markers = {this.state.markers}
          map = {this.state.map}
        />

        <main>
	         <div id='map'
                role='application'
              >
           </div>
	      </main>

      <div tabIndex={0}>

     {this.updateInfowindow()}
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
