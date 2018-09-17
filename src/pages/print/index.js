import React, { Component } from 'react';
import Print from './print';
import './index.scss';

export default class PrintContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            print: false
        }
    }

    print(open) {
        this.setState({
            print: open
        })
    }

    render() {
        const {
            print
        } = this.state;
        return (
            <section className="cl-print-main">
                <p className="cl-print-body">
                    BODY
                    <button onClick={this.print.bind(this, true)}>print</button>
                </p>
                { print ? <Print print={this.print.bind(this)} /> : null }
            </section>
        );
    }
}
