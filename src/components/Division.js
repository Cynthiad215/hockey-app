import React, { useState, useEffect } from "react";
import TeamName from './TeamName';

const Division = (props) => {
    const [division, setDivision] = useState(null);

    useEffect(() => {
        async function getAllTeams(){
            await fetch('http://localhost:8080/teams')
            .then(response => response.json())
            .then(response => {
                let divisionArray = [];
                Object.values(response[props.conference]).forEach((value,key) => {
                    if (value['division'] === props.division) {
                        divisionArray.push(value);
                    }
                });
                setDivision(divisionArray);
            });
            
        }
        getAllTeams();

    },[]);

    return (
        <div className="teams-container">
            <h4 className="ml-2 mt-3 mb-3">{props.division}</h4>
            {
             division ? division.map((value, key) => { 
                return <TeamName key={`${key}`} name={value['team']} teamId={value['id']} ></TeamName> }) : "Loading . . . "
            }
        </div>
    )
}

export default Division;