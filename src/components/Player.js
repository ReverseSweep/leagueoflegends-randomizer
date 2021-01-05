import React, { Component } from 'react';

export default function Player(props) {

    if (props.team != null) {
        return (
            <div className="player-display">
                <p>{props.name} - {props.role}</p>
                &nbsp;
                &nbsp;
                <button onClick={() => props.switchTeams(props.name)}>Switch Teams</button>
                &nbsp;
                <button onClick={() => props.removePlayer(props.name)}>remove</button>
            </div>
        );
    } else {
        return (
            <div className="player-display">
                <p>{props.name}</p>
                &nbsp;
                &nbsp;
                <button onClick={() => props.assignTeam(props.name, "Left")}>Assign Left Team</button>
                &nbsp;
                <button onClick={() => props.assignTeam(props.name, "Right")}>Assign Right Team</button>
                &nbsp;
                <button onClick={() => props.removePlayer(props.name)}>remove</button>
            </div>
        );
    }

    
}
