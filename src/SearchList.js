import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import './App.css';

class SearchList extends Component{
  state = {
    searchQuery: '',
    displayedMarkers: this.props.markers
  }

  //updating the searchQuery state
  updateSearchQuery = (query) => {
    this.setState({ searchQuery: query })
    let dispMarkers;
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
       dispMarkers = this.props.markers.filter( (marker) => match.test(marker.title) );
       this.setState({displayedMarkers: dispMarkers})
    } else {
      this.setState({ displayedMarkers: this.props.markers })
      dispMarkers = this.props.markers
    }
    //display only the markers from search result
    this.props.markers.forEach( (marker) => marker.setMap(null))
    dispMarkers.forEach( (marker) => marker.setMap(this.props.map))
  }

  manageListClick = (element) => {
      this.props.openInfoWindow(element);
  }

  openSidebar = () => {
    this.updateSearchQuery(this.state.searchQuery);
    const sidebar = document.querySelector('.sidebar');
    console.log(sidebar.style.display);
    sidebar.style.display === 'flex' ? sidebar.style.display = 'none' : sidebar.style.display = 'flex';
  }

  render() {
    return(
      <div>
        <header>
            <button className='menu-button' onClick={this.openSidebar}
             aria-label="Navigation">
              <div className='menu-button-line'/>
              <div className='menu-button-line'/>
              <div className='menu-button-line'/>
            </button>
            <div className='title'>
            <h2>{this.props.h2Info}</h2>
            <p>Powerd by Foursquare</p>
            </div>
        </header>
        <div className='sidebar' role='Navigation'>
          <form>
            <input className='input-field'
                   type='text'
                   placeholder='Finde a place'
                   aria-label="Search"
                   value={this.state.searchQuery}
                   onChange={(event) => this.updateSearchQuery(event.target.value)}>
            </input>
          </form>
          <ul role="tablist">
            { this.state.displayedMarkers.map( (marker) => (
            <li key={marker.id}
                className='list-item'
                tabIndex={0}
                role='button'
                onClick={this.manageListClick.bind(this, marker)}
                onKeyPress={this.manageListClick.bind(this, marker)}>
              {marker.title}
            </li>
          ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SearchList
