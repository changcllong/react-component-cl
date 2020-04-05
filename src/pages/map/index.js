import React, { Component } from 'react';
import Test from '../../component/test';

import './index.scss';

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'green'
        }
        this.changeColor = this.changeColor.bind(this);
    }

    changeColor() {
        this.setState({
            color: 'red'
        });
    }

    // componentWillUpdate() {
    //     this.setState({
    //         color: 'pink'
    //     });
    // }

    render() {
        return (
            <section id="map-box">
                <div className="cl-map-container">
                    <div className="cl-map-content"></div>
                </div>
                <div className="cl-map-wrapper">
                    <div className="cl-map-middle">
                        <div className="cl-map-main">中间</div>
                    </div>
                    <div className="cl-map-left">
                        左栏
                    </div>
                    <div className="cl-map-right">
                        右栏
                    </div>
                </div>
            </section>
        );
    }
}
