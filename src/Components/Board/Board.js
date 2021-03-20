import React, { Component } from 'react'
import Player from '../Player/Player'
import Dice from '../Dices/Dice'
import sound from './dice_sound.mp3'
import winSound from './win.mp3'
import './Board.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSync, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';


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
        if (this.state.gameIsOn) {
            await this.updateDice();
            if (this.state.currentPlayer === 1) {
                if (this.checkIfDouble()) {
                    this.hold();
                    this.setState({ player1CurScore: 0 })
                }
                else this.setState({ player1CurScore: this.state.player1CurScore + this.state.dice1 + this.state.dice2 })
            }
            else {
                if (this.checkIfDouble()) {
                    this.hold();
                    this.setState({ player2CurScore: 0 })
                }
                else this.setState({ player2CurScore: this.state.player2CurScore + this.state.dice1 + this.state.dice2 })
            }
        }
    };

    checkWin = () => {
        if (this.state.player1Score >= parseInt(this.state.input)) {
            this.winSound();
            this.setState({ player1Score: 'YOU WON!', gameIsOn: false })

            return true
        }
        else if (this.state.player2Score >= parseInt(this.state.input)) {
            this.winSound();
            this.setState({ player2Score: 'YOU WON!', gameIsOn: false })
            return true
        }
        else return false
    }

    hold = async () => {
        if (this.state.gameIsOn) {
            this.setState({ player1CurScore: 0, player2CurScore: 0 })
            if (this.state.currentPlayer === 1) {
                await this.setState({
                    player1Score: this.state.player1Score + this.state.player1CurScore,
                    currentPlayer: 2,
                })
                this.checkWin()
            }
            else {
                await this.setState({
                    player2Score: this.state.player2Score + this.state.player2CurScore,
                    currentPlayer: 1,
                })
                this.checkWin()
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
        this.setState({ input: e.target.value })
    }

    isPlayer = () => {
        return this.state.currentPlayer === 1
    }

    isPlayer2 = () => {
        return this.state.currentPlayer !== 1
    }

    render() {
        return (
            <div className='board'>
                <div className='buttons'>
                    <button onClick={this.newGame}><FontAwesomeIcon icon={faPlus} /> NEW GAME</button>
                    <div className='dices'>
                        <Dice dice={this.state.dice1} />
                        <Dice dice={this.state.dice2} />
                    </div>
                    <div className="bottomButtons">
                        <button onClick={this.roleDice}><FontAwesomeIcon icon={faSync} /> ROLE DICE</button>
                        <button onClick={this.hold}><FontAwesomeIcon icon={faAngleDoubleDown} /> HOLD</button>
                        <input name='val' type="number" placeholder="FINAL SCORE" min={2} onChange={this.playTill} />
                    </div>
                </div>
                <Player
                    id={this.state.player1Id}
                    score={this.state.player1Score}
                    current={this.state.player1CurScore}
                    isPlayerActive={this.isPlayer()}
                />
                <Player
                    id={this.state.player2Id}
                    score={this.state.player2Score}
                    current={this.state.player2CurScore}
                    isPlayerActive={this.isPlayer2()}

                />
            </div>
        )
    }
}

