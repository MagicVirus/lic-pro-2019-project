import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {episode: []};
  }
  componentDidMount(){
    axios.get('http://localhost:3000/episode')
      .then(response => {
        this.setState({ episode: response.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  tabRow(){
    return this.state.episode.map(function(object, i){
      return <TableRow obj={object} key={i} />;
    });
  }

  render() {
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