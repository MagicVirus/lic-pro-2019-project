import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import {Create} from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to={'/'} className="navbar-brand">Projet de qualité</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={'/'} className="nav-link">Accueil</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link">Créer</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/episodes'} className="nav-link">Lister</Link>
                </li>
              </ul>
            </div>
          </nav> <br/>
          <h2>Vous êtes ici chez vous !</h2> <br/>
          <Switch>
            <Route exact path='/create' component={ Create } />
            <Route path='/editer/:id' component={ Edit } />
            <Route path='/episodes' component={ Index } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;