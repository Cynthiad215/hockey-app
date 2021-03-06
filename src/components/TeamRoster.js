import React, { useEffect, useState, useCallback } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@primer/octicons-react'
import PlayerCard from './PlayerCard';
/*
// For re-usable Hook
// [isToggled, setIsToggled] = useToggle
const useToggle = (initialState) => {
    const [isToggled, setIsToggled] = useState(initialState);

    const toggle = useCallback(() => 
            setIsToggled(state => !state),
            [setIsToggled],
    );

    return [isToggled, toggle];

}*/
const TeamRoster = (props) => {
    const [isToggled, setIsToggled] = useState(false);
    const [isJerseyNumberToggled, setJerseyNumberToggle] = useState(false)
    const [playerBios, setPlayerBios] = useState([]);

    const [playerNames, setPlayerNames] = useState([]);
    const [searchPlayer, setSearchPlayer] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [playerBiosTemp, setPlayerBiosTemp] = useState([]);

    const handleInput = (e) => {
        setSearchPlayer(e.target.value);
        let tempArr = [];
        tempArr = playerNames.filter((key, value) => {
            return key.startsWith(e.target.value);
        });
        if (e.target.value === "") {
            setSearchResult("");
        } else {
            setSearchResult(tempArr);
        }

    }
    const toggle = useCallback(() => {
        setIsToggled(state => !state);
    }, [setIsToggled]);

    const sortNames = (value) => {
        toggle();
        const sortedPlayerNames = [...playerBios].sort((a, b) => {
            var nameA = a.person.fullName.toUpperCase();
            var nameB = b.person.fullName.toUpperCase();
            if (isToggled) {
                if (nameA > nameB) {
                    return -1;
                }
                if (nameA < nameB) {
                    return 1;
                }
            } else {
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
            }
            // names must be equal
            return 0;
        });
        setPlayerBios(sortedPlayerNames);
    }
    function sortJerseyNumbers() {
        
        toggle()
        const sortedJerseyNumbers = [...playerBios].sort((a,b) => {
            return isToggled ? a.jerseyNumber - b.jerseyNumber : b.jerseyNumber - a.jerseyNumber;
        });
        setPlayerBios(sortedJerseyNumbers);
    }
    useEffect(() => {
        async function getRoster() {
            await fetch(`http://localhost:8080/teams/roster/${props.match.params.teamId}`)
                .then(response => response.json()
                ).then((roster) => {
                    let playerNamesArr = [];
                    let playerBiosArr = [];
                    let playerBiosTempArr = [];
                    roster.forEach((key, value) => {

                        let tempID = key.person.id;

                        let name = key.person.fullName;
                        playerBiosTempArr.push({ tempID, name });

                        playerNamesArr.push(key.person.fullName);
                        playerBiosArr.push(key);
                    });
                    setPlayerBios(playerBiosArr);
                    setPlayerNames(playerNamesArr);
                    setPlayerBiosTemp(playerBiosTempArr);
                });
        };
        getRoster();
        // pass array of values that useEffect depends on
    }, [props.match.params.teamId])


    return (
        <div className="container pt-5 ">
            <h1 className="text-center">{props.location.state ? props.location.state.team : ""}</h1>
            <input
                value={searchPlayer}
                onChange={handleInput}
                type="text"
            />
            <span>{searchResult}</span>
            <table className="table mr-8 ml-8">
                <thead><tr>
                    <th scope="col"></th>
                    <th scope="col" className="team-sort" onClick={() => sortNames("fullName")}>Name {isToggled ? <ArrowDownIcon /> :<ArrowUpIcon /> }</th>
                    <th scope="col" className="team-sort" onClick={sortJerseyNumbers}>Number{isToggled ? <ArrowDownIcon /> :<ArrowUpIcon /> }</th>
                    <th scope="col">Position</th>
                </tr></thead>
                <tbody>
                    {playerBios ? playerBios.map((key, value) => {
                        return <PlayerCard
                            key={`${value}`}
                            playerId={key.person.id}
                            playerName={key.person.fullName}
                            playerJersey={key.jerseyNumber}
                            playerPosition={key.position}></PlayerCard>

                    }) : "Loading"}
                </tbody>
            </table>
        </div>
    )
}

export default TeamRoster;