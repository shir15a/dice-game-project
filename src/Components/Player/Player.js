import React, { Component } from 'react'
import './Player.css'

export default class Player extends Component {

    render() {
        return (
            <div className={`player player${this.props.id}`}>
                <h1>PLAYER {this.props.id}</h1>
                <h1>SCORE {this.props.score}</h1>
                <div className="current">
                    <h1>CURRENT</h1>
                    <h2>{this.props.current}</h2>
                </div>
            </div>
        )
    }
}
