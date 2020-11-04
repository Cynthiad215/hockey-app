import React from 'react';
import { Link } from 'react-router-dom';

const PlayerCard = (props) => { 
    console.log(props)
    return (
        <tr className="">

            <td><img className="player-headshot" src={`https://cms.nhl.bamgrid.com/images/headshots/current/168x168/${props.playerId}.jpg`} alt="nhl-player" /></td>
            <td><Link to={{ pathname: '/' }}>{props.playerName}</Link></td>
            <td>{props.playerJersey}</td>
            <td> {props.playerPosition.name} </td>

        </tr>
    )
}

export default PlayerCard;