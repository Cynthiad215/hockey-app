const express = require('express');
const router = express.Router();
var got = require('got');
var cors = require('cors');

router.get('/:id', cors(), function(req, res){
    (async () => {
        try {
            const response = await got('https://statsapi.web.nhl.com/api/v1/people/' + req.params.id + '?expand=person.stats&stats=yearByYear,yearByYearPlayoffs,careerRegularSeason&expand=stats.team');
            
            const result = JSON.parse(response.body);
            //pass relevant league season info
            res.status(200).send(result.people);
        } catch (error) {
            res.status(400).send({"Error": error, "Message":'Error with grabbing Player info'})


        } 
        
    })();
});
module.exports = router;