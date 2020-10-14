import React, {useEffect, useState} from 'react';
import PlayerCard from './PlayerCard';

const TeamRoster = (props) => {
    console.log('in team roster', props)
    //const [playerNames, setPlayerNames] = useState([]);
    const [playerBios, setPlayerBios]     = useState([])
    useEffect(() => {
        async function getRoster(){
            await fetch(`http://localhost:8080/teams/roster/${props.match.params.teamId}`)
                .then(response=>response.json()
                    //console.log(response.json());
                ).then((roster)=>{
                    
                   /* let playerNames = []
                    roster.forEach((key, value) => {
                        playerNames.push(key.person.fullName)
                        
                    });
                    setPlayerNames(playerNames);
                    */
                    let playerBiosArr = [];
                    roster.forEach((key, value) => {
                        playerBiosArr.push(key);
                    });
                    playerBiosArr.sort();
                    setPlayerBios(playerBiosArr);
                    //console.log(playerBiosArr)
                });
        };

        getRoster();

    }, [])


    return (
        <div className="container pt-5 ">
            <h1 className="text-center">{props.location.state.team}</h1>
            <div className="player-card-list text-center">
            {playerBios ? playerBios.map((key,value) => {
                return <PlayerCard 
                            key={`${value}`} 
                            playerId={key.person.id} 
                            playerName={key.person.fullName} 
                            playerJersey={key.jerseyNumber} 
                            playerPosition={key.position}></PlayerCard>

            }) : "Loading" }
            </div>
        </div>
    )
}

export default TeamRoster;