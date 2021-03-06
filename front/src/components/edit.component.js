import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this._api = "http://localhost:5000/api/";
    this.onChangeEpisodeName = this.onChangeEpisodeName.bind(this);
    this.onChangeEpisodeCode = this.onChangeEpisodeCode.bind(this);
    this.onChangeEpisodeMark = this.onChangeEpisodeMark.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      code: '',
      note: 0
    }
  }

  componentDidMount() {
    axios.get(this._api + "episodes/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.episode.name,
          code: response.data.episode.code,
          note: response.data.episode.note });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeEpisodeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeEpisodeCode(e) {
    this.setState({
      code: e.target.value
    })
  }
  onChangeEpisodeMark(e) {
    this.setState({
      note: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      name: this.state.name,
      code: this.state.code,
      note: this.state.note
    };
    axios.put(this._api + "episodes/" + this.props.match.params.id, obj)
      .then(res => res.data);

    this.props.history.push('/index');
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Vous éditez l'épisode {this.state.name}</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Nom de l'épisode</label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeEpisodeName}
            />
          </div>
          <div className="form-group">
            <label>Code de l'épisode</label>
            <input type="text"
                   className="form-control"
                   value={this.state.code}
                   onChange={this.onChangeEpisodeCode}
            />
          </div>
          <div className="form-group">
            <label>Note</label>
            <input type="number"
                   min="1"
                   max="10"
                   className="form-control"
                   value={this.state.note}
                   onChange={this.onChangeEpisodeMark}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Mettre à jour" className="btn btn-primary"/>
          </div>
        </form>
      </div>
    )
  }
}