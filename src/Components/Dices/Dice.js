import React, { Component } from 'react'
import './Dice.css'

export default class Dice extends Component {
    render() {
        // console.log('1',this.props.dice1);
        return (
            <div className = {`dice dice${this.props.dice}`}>
            </div>
        )
    }
}
