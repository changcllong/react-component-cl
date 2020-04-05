
import '@babel/polyfill';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import {
//     observable,
//     computed,
//     action,
//     autorun,
//     transaction,
//     toJS
// } from 'mobx';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import './index.scss';
import Main from  './main';
import Map from './map';
import Bundle from '../component/bundle';
import PrintContainer from './print';
import { matchRoutes } from 'react-router-config';

const List = (props) => (
    <Bundle load={() => import('./list')}>
        {(List) => <List {...props}/>}
    </Bundle>
);

if (module.hot) {
    module.hot.accept();
}

const routes = [
    { 
        component: () => <div></div>,
        routes: [
            { 
                path: '/',
                exact: true,
                component: Main
            },
            { 
                path: '/child/:id',
                component: List,
                routes: [
                    { 
                        path: '/child/:id/grand-child',
                        component: PrintContainer
                    }
                ]
            }
        ]
    }
];

const branch = matchRoutes(routes, '/child/23');

console.log(branch);

ReactDOM.render(
    (
        <Router>
            <div>
                <Route exact path="/" component={Main} />
                <Route path="/map" component={Map} />
                <Route path="/list" component={List} />
                <Route path="/print" component={PrintContainer} />
            </div>
        </Router>
    ),
    document.getElementById('root')
);
