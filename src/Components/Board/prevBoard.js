import React, { Component } from 'react'
import Player from '../Player/Player'
import './Board.css'

import sound from './dice_sound.mp3'
import winSound from './win.mp3'

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
        currentPlayer: 1,
        input: 100,
        isWin: false,
        gameIsOn: true
    }

    diceSound = () => {
        this.audio = new Audio(sound)
        this.audio.load()
        this.audio.play()
    }

    winSound = () => {
        this.audio = new Audio(winSound)
        this.audio.load()
        this.audio.play()
    }

    randomDice = () => {
        return Math.floor((Math.random() * 6) + 1)
    }

    updateDice = async () => {
        this.diceSound();
        const dice1 = this.randomDice();
        const dice2 = this.randomDice();
        this.setState({ dice1, dice2 })
    }

    checkIfDouble = () => {
        return this.state.dice1 === this.state.dice2
    }

    roleDice = async () => {
        console.log("currentPlayer", this.state.currentPlayer);
        console.log("player1CurScore", this.state.player1CurScore);
        console.log("player2CurScore", this.state.player2CurScore);
        if (this.state.gameIsOn) {
            await this.updateDice();
            if (this.state.currentPlayer === 1) {
                if (this.checkIfDouble()) {
                    this.hold();
                    this.setState({ player1CurScore: 0 })
                }
                else {
                    this.setState({ player1CurScore: this.state.player1CurScore + this.state.dice1 + this.state.dice2 })
                    console.log(this.checkWin());

                    if(this.checkWin()){
                        this.setState({isWin:true})
                    }
                }
            }
            else {
                if (this.checkIfDouble()) {
                    this.hold();
                    this.setState({ player2CurScore: 0 })
                }
                else {
                    this.setState({ player2CurScore: this.state.player2CurScore + this.state.dice1 + this.state.dice2 })
                    console.log(this.checkWin());
                    if(this.checkWin()){
                        this.setState({isWin:true})
                    }
                }
            }
        }
    };

    checkWin = () => {
        console.log('this.state.player1Score', this.state.player1Score);
        console.log('parseInt(this.state.input)', parseInt(this.state.input));
        if (this.state.player1Score >= parseInt(this.state.input)) {
            this.winSound();
            this.setState({ player1Score: 'YOU WON!', gameIsOn: false })
            console.log('1 win');
            return true
        }
        else if (this.state.player2Score >= parseInt(this.state.input)) {
            this.winSound();
            this.setState({ player2Score: 'YOU WON!', gameIsOn: false })
            console.log('2 win');

            return true
        }
        else {console.log('else')}
    }

    hold = async () => {
        if (this.state.gameIsOn) {
            this.setState({ player1CurScore: 0, player2CurScore: 0 })
            if (this.state.currentPlayer === 1) {
                this.checkWin();
                this.setState({
                    player1Score: this.state.player1CurScore + this.state.player1Score,
                    currentPlayer: 2,
                })
            }
            else {
                this.checkWin();
                this.setState({
                    player2Score: this.state.player2CurScore + this.state.player2Score,
                    currentPlayer: 1,
                })
            }
        }

    }

    newGame = () => {
        this.setState({
            player1Id: 1,
            player1Score: 0,
            player1CurScore: 0,
            player1Active: 0,
            player2Id: 2,
            player2Score: 0,
            player2CurScore: 0,
            player2Active: 1,
            dice1: 0,
            dice2: 0,
            currentPlayer: 1,
            input: 100
        })
        window.location.reload();

    }

    playTill = (e) => {
        console.log(e.target.value);
        this.setState({ input: e.target.value })
    }

    isPlayer = () =>{
        return this.state.currentPlayer === 1
    }

    isPlayer2 = () =>{
        return this.state.currentPlayer != 1
    }

    render() {
        return (
            <div className='boardContainer'>
                <div className='buttons'>
                    <button onClick={this.newGame}>+ NEW GAME</button>
                    <span>is win{this.state.isWin}</span>
                    <div className='diceContainer'>
                        <div className={`dice dice${this.state.dice1}`}></div>
                        <div className={`dice dice${this.state.dice2}`}></div>
                    </div>
                    <div className="bottomBut">
                        <button onClick={this.roleDice}><span><i className="sync icon"></i></span>ROLE DICE</button>
                        <button onClick={this.hold}><span><i className="hand rock icon"></i></span>HOLD</button>
                        <input name='val' type="number" placeholder="FINEL SCORE" min={2} onChange={this.playTill} />
                    </div>
                </div>
                <div style={{color: this.state.currentPlayer === 1 ? 'red': 'green'}}>{this.state.currentPlayer}</div>
                <Player
                    id={this.state.player1Id}
                    score={this.state.player1Score}
                    current={this.state.player1CurScore}
                    isPlayerActive ={this.isPlayer()}
                />
                <Player
                    id={this.state.player2Id}
                    score={this.state.player2Score}
                    current={this.state.player2CurScore}
                    isPlayerActive ={this.isPlayer2()}

                />
            </div>
        )
    }
}
