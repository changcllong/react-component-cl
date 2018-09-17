import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Print extends Component {
    constructor(props) {
        super(props);
        const list = new Array(100);
        for (let i = 0; i < 100; i++) {
            list[i] = i;
        }
        this.state = {
            list
        };
    }

    componentWillUnmount() {
        document.body.removeChild(this.wrapper);
        this.root.style.display = 'block';
    }

    componentDidMount() {
        this.wrapper = document.createElement('div');
        this.root = document.getElementById('root');
        document.body.appendChild(this.wrapper);
        this.appendWrapperToDocBody();
        this.root.style.display = 'none';
        setTimeout(() => {
            window.print();
            this.props.print(false);
        });
    }

    appendWrapperToDocBody() {
        ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            this.renderPrintList(),
            this.wrapper
        );
    }

    renderPrintList() {
        const {
            list
        } = this.state;
        return (
            <ul className="cl-print-list">
                {
                    list.map(item => {
                        return (<li key={item}>{item}</li>);
                    })
                }
            </ul>
        );
    }

    render() {
        return null;
    }
}
