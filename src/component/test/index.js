import React, { Component } from 'react';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'pink'
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.siblingRef) {
            newProps.siblingRef.setState({color: 'red'});
        }
    }

    render() {
        const { children } = this.props;
        return (
            <div style={{ backgroundColor: this.state.color }}>
                {children}
            </div>
        );
    }
}
