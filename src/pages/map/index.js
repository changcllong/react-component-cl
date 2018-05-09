import React, { Component } from 'react';
import Test from '../../component/test';

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
                <div
                    style={{ height: '100px', backgroundColor: this.state.color }}
                    onClick={this.changeColor}
                >test</div>
                <br />
                <Test ref={ref => { this.firstRef = ref; }}>
                    <span>first</span>
                </Test>
                <br />
                <Test siblingRef={this.firstRef}>
                    <span>last</span>
                </Test>
            </section>
        );
    }
}
