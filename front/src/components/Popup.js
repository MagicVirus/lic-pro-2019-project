import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
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
          <Link to={'/episodes'} onClick={this.props.closePopup}>OK</Link>
        </div>
      </div>
    );
  }
}

export default Popup;