import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

const Main = (props) => {
    return (
        <ul className="cl-main-container">
            <li className="cl-main-item">
                <Link to="/map">leaflet</Link>
            </li>
            <li className="cl-main-item">
                todo
            </li>
            <li className="cl-main-item">c</li>
            <li className="cl-main-item">d</li>
        </ul>
    );
}

export default Main;
