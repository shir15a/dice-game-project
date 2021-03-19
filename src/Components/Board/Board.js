import React, { Component } from 'react'
import Player from '../Player/Player'
import './Board.css'

import sound from './dice_sound.mp3'


export default class Board extends Component {
    state = {
        player1Id: 1,
        player1Score: 0,
        player1CurScore: 0,
        player2Id: 2,
        player2Score: 0,
        player2CurScore: 0,
        dice1: 0,
        dice2: 0,
        currentPlayer: 0
    }

    sound = ()=>{
        this.audio = new Audio(sound)
        this.audio.load()
        this.audio.play()
    }

    randomDice = () =>{
        return Math.floor((Math.random()*6)+1)
    }

    updateDice = async () => {
        this.sound()
        let dice1 = this.randomDice();
        let dice2 = this.randomDice();
  
        this.setState({ dice1: dice1, dice2: dice2 })

        
    }

    roleDice = async () => {
        console.log("currentPlayer", this.state.currentPlayer);
        console.log("player1CurScore", this.state.player1CurScore);
        console.log("player2CurScore", this.state.player2CurScore);

        await this.updateDice();

        if (this.state.currentPlayer === 0) {
            if (this.state.dice1 === this.state.dice2) {
                this.hold();
                this.setState({ player1CurScore: 0 })
            }
            else {
                this.setState({ player1CurScore: this.state.player1CurScore + this.state.dice1 + this.state.dice2 })
            }
        }
        else {
            if (this.state.dice1 === this.state.dice2) {
                this.hold();
                this.setState({ player2CurScore: 0 })
            }
            else {
                this.setState({ player2CurScore: this.state.player2CurScore + this.state.dice1 + this.state.dice2 })

            }

        }
    };

    hold = async () => {
        this.setState({ player1CurScore: 0, player2CurScore: 0 })
        if (this.state.currentPlayer === 0) {
            this.setState({
                player1Score: this.state.player1CurScore + this.state.player1Score,
                currentPlayer: 1,
            })
        }
        else {
            this.setState({
                player2Score: this.state.player2CurScore + this.state.player2Score,
                currentPlayer: 0,
            })
        }
    }


    render() {
        return (
            <div className='boardContainer'>
                <div className='buttons'>
                    <button>+ NEW GAME</button>
                    <div className='diceContainer'>
                        <div className={`dice dice${this.state.dice1}`}></div>
                        <div className={`dice dice${this.state.dice2}`}></div>
                    </div>
                    <div className="bottomBut">
                        <button onClick={this.roleDice}><span><i className="sync icon"></i></span>ROLE DICE</button>
                        <button onClick={this.hold}><span><i className="hand rock icon"></i></span>HOLD</button>
                        <input type="text" placeholder="FINEL SCORE" />
                    </div>
                </div>
                <Player
                    id={this.state.player1Id}
                    score={this.state.player1Score}
                    current={this.state.player1CurScore} />
                <Player
                    id={this.state.player2Id}
                    score={this.state.player2Score}
                    current={this.state.player2CurScore} />
            </div>
        )
    }
}
