import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const Main = (props) => {
    return (
        <ul className="cl-list-main">
            <li className="cl-list-item-main">
                <Link to="/list">transition</Link>
            </li>
            <li className="cl-list-item-main">
                <Link to="/map">leaflet</Link>
            </li>
            <li className="cl-list-item-main">c</li>
            <li className="cl-list-item-main">d</li>
        </ul>
    );
}

export default Main;
