import React from 'react';
import { Link } from 'react-router-dom';

const PlayerCard = (props) => {
    return ( 
        <div className="player-card m-3">
            <Link to={{pathname: '/'}}>
                <div className="card-body mb-4 p-0" >
                    <img src={`https://cms.nhl.bamgrid.com/images/actionshots/${props.playerId}_low_resolution.jpg`} 
                    className="card-img-top" 
                    alt = "nhl-player"/>
                    <h5 className="card-title pt-3"> {props.playerName}</h5> 
                    <p className="m-1">Jersey #{props.playerJersey}</p>
                    <p className="m-1">Position: {props.playerPosition.code} </p>
                </div> 
            </Link>
        </div>
    )
}

export default PlayerCard;