var express = require('express');
var router = express.Router();
var piirakkaPG = require('../postgreSQL/piirakkaPG');

const vastaus = {
    tyoaikayht: 0,
    hairioaikayht: 0,
    hairiot: []
} 

router.route('/')
.post(async (req, res, next) => {
    try {
        vastaus.tyoaikayht = 0;
        vastaus.hairioaikayht = 0;
        vastaus.hairiot = [];
        vastaus.tyoaikayht = await piirakkaPG.haetehdyttunnit(req.body);
        vastaus.hairioaikayht = await piirakkaPG.haehairioaikaYhteensa(req.body);
        vastaus.hairiot = await piirakkaPG.haeEriHairiot(req.body);
        console.log('arvot saatu piirakka.js');
        console.dir(vastaus);
        if (vastaus.tyoaikayht === 0) {
            console.log('ei tehtyjä tunteja');
        }
        res.json(vastaus);
    } catch(error) {
        throw error;
    }
});


module.exports = router;