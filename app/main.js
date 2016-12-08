import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import {combineReducers} from 'redux';
import {Provider} from 'react-redux';

import * as reducers from './reducers/index.js';
import Routes from './routes.js';

import {store} from './store.js';

const reducer = combineReducers(reducers);
const storeReducer = store(reducer);

export class Main extends Component {
    render() {
        return (
            <Provider store={storeReducer}>
                <Routes />
            </Provider>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('root'));
