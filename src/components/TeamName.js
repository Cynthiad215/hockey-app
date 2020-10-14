import React from 'react';
import { Link } from 'react-router-dom';

const TeamName = (props) => {
    return (
        <div className="team-link mt-2">
            <Link to={{
                    pathname: `/teams/${props.teamId}`,
                    state: {'team':props.name}
                }}>
                <img alt={props.name} className="team-logo" src={'https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/' + props.teamId +'.svg'}/>
                {props.name}
            </Link>
        </div>
    )
}

export default TeamName;