import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const EXITED = 1;
const ENTERING = 2;
const ENTERED = 3;
const EXITING = 4;

export default class Transition extends Component {
    constructor(props) {
        super(props);
        if (props.in) {
            this.status = ENTERING;
        } else {
            this.status = EXITED;
        }
        this.state = {
            a: 0
        };
        // this.nextStatus = ENTERING;
        // this.status = EXITED;
    }

    performEnter(node) {
        const { onEnter, onEntering } = this.props;
        onEnter && onEnter(node);
        if (!onEntering) {
            setTimeout(() => {
                this.onEntered(node);
            }, 0);
        } else {
            // setTimeout(() => {
            //     onEntering(node, this.onEntered.bind(this, node));
            // }, 0);
            // onEntering(node, this.onEntered.bind(this, node));
            // debugger;
            this.forceUpdate(() => {
                console.log(node.offsetHeight);
                onEntering(node, this.onEntered.bind(this, node));
            });
        }
    }

    onEntered(node) {
        const { onEntered } = this.props;
        onEntered && onEntered(node);
        this.status = ENTERED;
    }

    performExit(node) {
        const { onExit, onExiting } = this.props;
        onExit && onExit(node);
        if (!onExiting) {
            this.forceUpdate(() => {
                this.onExited(node);
            });
        } else {
            // setTimeout(() => {
            //     onExiting(node);
            // }, 0);
            this.forceUpdate(() => {
                onExiting(node, this.onExited.bind(this, node));
            });
        }
    }

    onExited(node) {
        const { onExited } = this.props;
        onExited && onExited(node);
        this.status = EXITED;
        this.forceUpdate();
    }

    updateStatus() {
        console.log(this.status);
        const node = ReactDOM.findDOMNode(this);
        if (this.status === ENTERING) {
            this.performEnter(node);
        } else if (this.status === EXITING) {
            this.performExit(node);
        }
    }

    componentDidMount() {
        this.updateStatus();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.in !== this.props.in) {
            this.shouldUpdate = true;
            this.status = nextProps.in ? ENTERING : EXITING;
        }
    }

    componentDidUpdate() {
        if (this.shouldUpdate) {
            this.shouldUpdate = false;
            this.updateStatus();
        }
    }

    render() {
        const { children } = this.props;
        if (!this.props.in && this.status === EXITED) {
            return null;
        }
        const child = React.Children.only(children);
        return child;
    }
}
