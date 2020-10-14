var express = require('express');
var router = express.Router();
var got = require('got');
var cors = require('cors');

router.get("/", cors(), function(req, res) {
    (async () => {
        try {
            const response = await got('https://statsapi.web.nhl.com/api/v1/teams');
            let result = JSON.parse(response.body);
            let easternConference = [];
            let westernConference = [];
            for (var i = 0; i < result.teams.length; i++) {
                if (result.teams[i].conference.name == "Eastern") {
                    easternConference.push({"id": result.teams[i].id, "team": result.teams[i].name, "division" : result.teams[i].division.name });
                } else {
                    westernConference.push({"id": result.teams[i].id, "team": result.teams[i].name, "division" : result.teams[i].division.name });
                }
            }
            res.send({'East': easternConference, 'West' : westernConference});
        } catch (error) {
            console.log(error);
            //=> 'Internal server error ...'
            res.send({"Error": error, "Message":"Error in API Response for Team"});
        }
    })();
});

router.get("/roster/:id", cors(), function(req, res) {
    (async () => {
        try {
            const response = await got('https://statsapi.web.nhl.com/api/v1/teams/' + req.params.id + '/roster');
            let roster = JSON.parse(response.body);
            
            res.status(200).send(roster.roster);
        } catch (error) {
            console.log(error);
            //=> 'Internal server error ...'
            // res.sendStatus(400);
            res.status(400).send({"Error": error, "Message":"Error in API Response for Roster"});
           
        }
    })();
})

module.exports = router;