import React, { Component } from 'react'



class Infowindow extends Component {
  render() {
    return(
      <aside
			className="info-window-box"
		>
			<h2>{this.props.currentMarker.title}</h2>
			<article>
      { this.props.updateInfowindow}
				{<p>Ki van itt</p>}
			</article>
		</aside>
    )
  }
}

export default Infowindow
