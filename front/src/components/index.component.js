import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {

  constructor(props) {
    super(props);
    this._api = "http://localhost:5000/api/";
    this.state = {episodes: []};
  }

  componentDidMount(){
      axios.get(this._api + "episodes")
        .then(response => {
          this.setState({ episodes: response.data.episodes });
      })
        .catch(function (error) {
          console.log(error);
      })
  }

  tabRow(){
    let object = this.state.episodes;
    return Object.keys(object).map(function(objectKey, index) {
      let value = object[objectKey];
      return <TableRow object={value} key={index} indice={index}/>;
    });
  }

  render() {
    if(this.state.episodes === '') return '<div></div>';

    return (
      <div>
        <h3 align="center">Liste d'épisodes</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
          <tr>
            <th>Nom de l'épisode</th>
            <th>Code</th>
            <th>Note</th>
            <th colSpan="2">Action</th>
          </tr>
          </thead>
          <tbody>
          { this.tabRow() }
          </tbody>
        </table>
      </div>
    );
  }
}