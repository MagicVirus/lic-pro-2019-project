import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css';

class Popup extends Component {
  componentDidMount(){
    M.Sidenav.init();
  }
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1 id="popText">{this.props.text}</h1>
          <button className="center-block" id="confirmPopup" onClick={this.props.closePopup}>OK</button>
        </div>
      </div>
    );
  }
}

export default Popup;