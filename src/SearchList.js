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
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
    this.setState({displayedMarkers: this.props.markers.filter( (marker) => match.test(marker.title) )})
    }
    else
    {this.setState({ displayedMarkers: this.props.markers })}


  }

  manageListClick = (element) => {
      this.props.openInfoWindow(element);
  }

  render() {
    this.props.markers.forEach( (marker) => marker.setMap(null))
    this.state.displayedMarkers.forEach( (marker) => marker.setMap(this.props.map))

    return(
      <div className='sidebar'>
      <form>
        <input className='input-field'
               type='text'
               placeholder='Finde a place'
               aria-label="Search"
               value={this.state.query}
               onChange={(event) => this.updateSearchQuery(event.target.value)}>
        </input>
      </form>
      <ul role="tablist">
        {this.state.displayedMarkers.map( (marker) => (
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
    )
  }
}

export default SearchList
