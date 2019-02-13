import React, {Component}  from 'react';
import axios from 'axios';

export class Create extends Component{
  constructor(props) {
    super(props);
    this.onChangeEpisodeName = this.onChangeEpisodeName.bind(this);
    this.onChangeEpisodeCode = this.onChangeEpisodeCode.bind(this);
    this.onChangeEpisodeMark = this.onChangeEpisodeMark.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      episode_name: '',
      episode_code: '',
      episode_mark:''
    }
  }
  onChangeEpisodeName(e) {
    this.setState({
      episode_name: e.target.value
    });
  }
  onChangeEpisodeCode(e) {
    this.setState({
      episode_code: e.target.value
    })
  }
  onChangeEpisodeMark(e) {
    this.setState({
      episode_mark: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
        episode_name: this.state.episode_name,
        episode_code: this.state.episode_code,
        episode_mark: this.state.episode_mark
    };
    axios.post('http://localhost:3000/create', obj)
        .then(res => console.log(res.data));

      this.setState({
          episode_name: '',
          episode_code: '',
          episode_mark: ''
      })

    console.log(`The values are ${this.state.episode_name}, ${this.state.episode_code}, and ${this.state.episode_mark}`)
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Ajouter un nouvel épisode</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Nom de l'épisode</label>
            <input
              type="text"
              className="form-control"
              value={this.state.episode_name}
              onChange={this.onChangeEpisodeName}
            />
          </div>
          <div className="form-group">
            <label>Code de l'épisode</label>
            <input type="text"
                   className="form-control"
                   value={this.state.episode_code}
                   onChange={this.onChangeEpisodeCode}
            />
          </div>
          <div className="form-group">
            <label>Note</label>
            <input type="number"
                   min="1"
                   placeholder="Note de l'épisode"
                   className="form-control"
                   value={this.state.episode_mark}
                   onChange={this.onChangeEpisodeMark}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Ajouter" className="btn btn-primary"/>
          </div>
        </form>
      </div>
    )
  }
}