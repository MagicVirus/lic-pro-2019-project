import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class TableRow extends Component {
  constructor(props) {
    super(props);
    this._api = "http://localhost:5000/api/";
    this.delete = this.delete.bind(this);
  }

  delete() {
    axios.delete(this._api + "episodes/" + this.props.object.id)
      .then(res => {
        window.location.reload();
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <tr>
        <td>
          {this.props.object.name}
        </td>
        <td>
          {this.props.object.code}
        </td>
        <td>
          {this.props.object.note}
        </td>
        <td>
          <Link to={"/editer/"+this.props.object.id} className="btn btn-action btn-primary">Editer</Link>
          <br/>
          <button onClick={this.delete} className="btn btn-action btn-danger">Supprimer</button>
        </td>
      </tr>
    );
  }
}

export default TableRow;