import React, {useEffect, useState} from 'react';
import PlayerCard from './PlayerCard';

const TeamRoster = (props) => {
   
    const [playerNames, setPlayerNames] = useState([]);
    const [searchPlayer, setSearchPlayer] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [playerBios, setPlayerBios] = useState([]);
    const [playerBiosTemp, setPlayerBiosTemp] = useState([]);

    const handleInput = (e) => {
        setSearchPlayer(e.target.value);
        let tempArr = [];
        tempArr = playerNames.filter((key, value) => {
            return key.startsWith(e.target.value);
        });
        if (e.target.value == "") {
            setSearchResult("");
        } else {
            setSearchResult(tempArr);
        }

        console.log('pbt', playerBiosTemp)
    }
    useEffect(() => {
        async function getRoster(){
            await fetch(`http://localhost:8080/teams/roster/${props.match.params.teamId}`)
                .then(response=>response.json()
                ).then((roster)=>{
                    let playerNamesArr =[];
                    let playerBiosArr = [];
                    let playerBiosTempArr =[];
                    roster.forEach((key, value) => {

                        let tempID = key.person.id;

                        let name = key.person.fullName;
                        //console.log(name)
                        playerBiosTempArr.push({tempID, name});

                        playerNamesArr.push(key.person.fullName);
                        playerBiosArr.push(key);
                    });
                    setPlayerBios(playerBiosArr);
                    setPlayerNames(playerNamesArr);
                    setPlayerBiosTemp(playerBiosTempArr);
                });
        };
        getRoster();

    }, [])


    return (
        <div className="container pt-5 ">
            <h1 className="text-center">{props.location.state.team}</h1>
            <input 
                value={searchPlayer}
                onChange={handleInput}
                type="text"
                />
                <span>{searchResult}</span>
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