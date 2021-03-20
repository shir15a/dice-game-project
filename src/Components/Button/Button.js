import React, { Component } from 'react'
import './Button.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSync, faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons';


export default class Button extends Component {
    render() {
        return (
            <div>
                <button onClick={this.props.onClick}><FontAwesomeIcon icon={this.props.icon} /> {this.props.name}</button>
            </div>
        )
    }
}
