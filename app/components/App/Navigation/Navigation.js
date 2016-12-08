import React, {Component} from 'react';
import {Link} from 'react-router';

import './Navigation.scss';

export default class Navigation extends Component {
  render(){
    return (
      <nav className="navigation">
        <Link to="/" className="brand" >Sandbox</Link>
      </nav>
    );
  }
}