
import 'babel-polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    observable,
    computed,
    action,
    autorun,
    transaction,
    toJS
} from 'mobx';
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import './index.scss';
import Main from  './main';
import Map from './map';
import List from './list';

if (module.hot) {
    module.hot.accept();
}

ReactDOM.render(
    (
        <Router>
            <div>
                <Route exact path="/" component={Main} />
                <Route path="/map" component={Map} />
                <Route path="/list" component={List} />
            </div>
        </Router>
    ),
    document.getElementById('root')
);
