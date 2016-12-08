import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';

import Navigation from 'components/App/Navigation/Navigation';

import {test} from 'helpers/AppHelpers';

import {setData} from 'actions/App/AppActions';

import _ from 'lodash';

require("sass/app.scss");

export class AppPage extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div className="app-container">
        <Navigation {...this.props} />

        <div className="content-container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

AppPage.propTypes = {};

// Which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return state;
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(AppPage);
