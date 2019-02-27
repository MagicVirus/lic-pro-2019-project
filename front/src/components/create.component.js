import React, {Component}  from 'react';
import axios from 'axios';
import Popup from './Popup';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css';


export class Create extends Component{
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
      note:'',
      showPopup: false
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

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
        name: this.state.name,
        code: this.state.code,
        note: this.state.note
    };
    axios.post(this._api + "episodes", obj)
        .then(res => res.data);

    this.togglePopup()

      this.setState({
          name: '',
          code: '',
          note: 0
      })
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h4>Ajouter un nouvel épisode</h4>
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
            <button className="btn btn-primary waves-effect waves-light" type="submit" value="Ajouter">Ajouter</button>
          </div>
        </form>
        {this.state.showPopup ?
          <Popup
            text='Episode ajouté !'
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
      </div>
    )
  }
}