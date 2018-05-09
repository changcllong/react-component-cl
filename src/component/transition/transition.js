import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const NULL = 0;
const EXITED = 1;
const ENTERING = 2;
const ENTERED = 3;
const EXITING = 4;

export default class Transition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: EXITED
        };
        if (props.in) {
            this.nextStatus = ENTERING;
        }
    }

    setNextCallback(callBack) {
        let active = true;
        this.nextCallback = (e) => {
            if (active) {
                active = false;
                callBack(e);
            }
        }

        this.nextCallback.cancle = () => {
            active = false;
        }
    }

    cancleNextCallBack() {
        if (this.nextCallback) {
            this.nextCallback.cancle();
            this.nextCallback = null;
        }
    }

    safeSetState(nextState, callBack) {
        this.paddingState = nextState;

        this.setNextCallback(callBack);

        this.setState(nextState, () => {
            this.paddingState = null;
            this.nextCallback();
        });
    }

    performEnter(node) {
        const { onEnter, onEntering, onEntered } = this.props;
        const { status } = this.state;
        if (!onEntering) {
            this.safeSetState({ status: ENTERED }, () => {
                onEntered && onEntered(node);
            });
        } else {
            if (status !== EXITING) {
                onEnter && onEnter(node);
            }
            this.safeSetState({ status: ENTERING }, () => {
                this.setNextCallback(() => {
                    this.safeSetState({ status: ENTERED }, () => {
                        onEntered && onEntered(node);
                    });
                });
                onEntering(node, this.nextCallback);
            });
        }
    }

    onEntered(node) {
        const { onEntered } = this.props;
        onEntered && onEntered(node);
        this.status = ENTERED;
    }

    performExit(node) {
        const { onExit, onExiting, onExited } = this.props;
        const { status } = this.state;
        if (!onExiting) {
            this.safeSetState({ status: EXITED}, () => {
                onExited && onExited();
            });
        } else {
            if (status !== ENTERING) {
                onExit && onExit(node);
            }
            this.safeSetState({ status: EXITING }, () => {
                this.setNextCallback(() => {
                    this.safeSetState({ status: EXITED }, () => {
                        onExited && onExited();
                    });
                });
                onExiting(node, this.nextCallback);
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
        const nextStatus = this.nextStatus
        if (nextStatus) {
            this.nextStatus = NULL;

            this.cancleNextCallBack();

            const node = ReactDOM.findDOMNode(this);
            if (nextStatus === ENTERING) {
                this.performEnter(node);
            } else {
                this.performExit(node);
            }
        }
    }

    componentDidMount() {
        this.updateStatus();
    }

    componentWillReceiveProps(nextProps) {
        const { status } = this.paddingState || this.state;
        if (nextProps.in) {
            if (status !== ENTERING && status !== ENTERED) {
                this.nextStatus = ENTERING;
            }
        } else {
            if (status !== EXITING || status !== EXITED) {
                this.nextStatus = EXITING;
            }
        }
    }

    componentDidUpdate() {
        this.updateStatus();
    }

    render() {
        const { children } = this.props;
        const { status } = this.state;
        if (!this.props.in && status === EXITED) {
            return null;
        }
        const child = React.Children.only(children);
        return child;
    }
}
