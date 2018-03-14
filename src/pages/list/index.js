import React, { Component } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Transition from '../../component/transition/transition';
import './index.scss';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.toggleExpand = this.toggleExpand.bind(this);
        this.state = {
            listItem: [],
            expand: [true, true]
        };
    }

    onClick() {
        const _listItem = this.state.listItem.slice();
        _listItem.push(_listItem.length);
        this.setState({
            listItem: _listItem
        });
    }

    onDelete() {
        const _listItem = this.state.listItem.slice();
        _listItem.pop();
        this.setState({
            listItem: _listItem
        });
    }

    toggleExpand(index) {
        const _expand = this.state.expand.slice();
        _expand[index] = !_expand[index];
        this.setState({
            expand: _expand
        });
    }

    onEnter(node) {
        node.className = 'cl-block cl-anima-block-enter';
    }

    onEntering(node, onEntered) {
        node.scrollTop;
        node.className = 'cl-block cl-anima-block-enter cl-anima-block-enter-active';
        setTimeout(() => {
            onEntered && onEntered();
        }, 3000);
    }

    onEntered(node) {
        node.className = 'cl-block';
    }

    onExiting(node, onExited) {
        node.className = 'cl-block cl-anima-block-exit-active';
        setTimeout(() => {
            onExited && onExited();
        }, 3000);
    }

    render() {
        const { listItem, expand } = this.state;
        return (
            <section>
                <TransitionGroup component="ul" className="cl-list">
                    {listItem.map((item, index) => {
                        return (
                            <CSSTransition
                                classNames="cl-anima-list"
                                timeout={1000}
                                key={index}>
                                <li className="cl-list-item">{item}</li>
                            </CSSTransition>
                        );
                    })}
                </TransitionGroup>
                <button onClick={this.onClick}>添加</button>
                <button onClick={this.onDelete}>删除</button>
                <div>
                    <TransitionGroup style={{ height: '200px' }}>
                        {expand[0] ? (
                            <CSSTransition
                                key={1}
                                classNames="cl-anima-block"
                                appear={true}
                                timeout={3000}>
                                <div className="cl-block" />
                            </CSSTransition>
                        ) : null}
                    </TransitionGroup>
                    <button onClick={this.toggleExpand.bind(this, 0)}>{expand[0] ? '收起' : '展开'}</button>
                </div>
                <div>
                    <div style={{ height: '200px' }}>
                        <Transition
                            onEnter={this.onEnter.bind(this)}
                            onEntering={this.onEntering.bind(this)}
                            onEntered={this.onEntered.bind(this)}
                            onExiting={this.onExiting.bind(this)}
                            in={expand[1]}>
                            <div className="cl-block" />
                        </Transition>
                    </div>
                    <button onClick={this.toggleExpand.bind(this, 1)}>{expand[1] ? '收起' : '展开'}</button>
                </div>
            </section>
        );
    }
}
