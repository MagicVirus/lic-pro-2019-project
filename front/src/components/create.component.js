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
      name: '',
      code: '',
      note:''
    }
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
    axios.post('http://localhost:5000/create', obj)
        .then(res => console.log(res.data));

      this.setState({
          name: '',
          code: '',
          note: ''
      })

    console.log(`on envoie ${this.state.name}, ${this.state.code}, and ${this.state.note}`)
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
                   placeholder="Note de l'épisode"
                   className="form-control"
                   value={this.state.note}
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