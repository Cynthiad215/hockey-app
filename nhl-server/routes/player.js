const express = require('express');
const router = express.Router();
var got = require('got');
var cors = require('cors');

router.get('/:id', cors(), function (req, res) {
    (async () => {
        try {
            let d = new Date();
            let thisYear = d.getFullYear();
            let lastYear = d.getFullYear() - 1;
            let yearRange = lastYear.toString() + thisYear.toString();

            //const response = await got('https://statsapi.web.nhl.com/api/v1/people/' + req.params.id + '?expand=person.stats&stats=yearByYear,yearByYearPlayoffs,careerRegularSeason&expand=stats.team');
            const response = await got('https://statsapi.web.nhl.com/api/v1/people/' + req.params.id + '?expand=person.stats&stats=statsSingleSeason&season=' + yearRange);
            const result = JSON.parse(response.body);
            res.status(200).send(result.people);
        } catch (error) {
            res.status(400).send({"Error": error, "Message": 'Error with grabbing Player info'})


        }

    })();
});
module.exports = router;