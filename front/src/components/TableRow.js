import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TableRow extends Component {
  render() {
    return (
      <tr>
        <td>
          {this.props.object.id}
        </td>
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
          <Link to={"/episodes/"+this.props.object.id} className="btn btn-action btn-primary">Editer</Link>
          <br/>
          <Link to={"/episodes/"+this.props.object.id} className="btn btn-action btn-danger">Supprimer</Link>
        </td>
      </tr>
    );
  }
}

export default TableRow;