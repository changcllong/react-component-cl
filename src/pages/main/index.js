import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: false
        };
    }

    componentDidMount() {
        this.setState({
            test: true
        });
        console.log('Main', this.state.test);
    }

    render() {
        return (
            <ul className="cl-list-main">
                <li className="cl-list-item-main">
                    <Link to="/list">transition</Link>
                </li>
                <li className="cl-list-item-main">
                    <Link to="/map">map</Link>
                </li>
                <li className="cl-list-item-main">
                    <Link to="/print">print</Link>
                </li>
            </ul>
        );
    }
}
