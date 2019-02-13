import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {

  constructor(props) {
    super(props);
    this._api = "http://localhost:5000/";
    this.state = {episodes: []};

  }
  componentDidMount(){
      axios.get(this._api + "episodes").then(response => {
          this.setState({ business: response.data });
      })
  }

    tabRow(){
        return this.state.episodes.map(function(object, i){
            const serie = {
                episode_name: "lol",
                episode_code: "lol",
                episode_mark: 25,
            }
            return <TableRow obj={serie} key={0} />;

    }

  render() {
    if(this.state.episodes === '') return '<div></div>'

    return (
      <div>
        <h3 align="center">Liste d'épisodes</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
          <tr>
            <th>Id</th>
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