var express = require('express');
var router = express.Router();
var diagrammiPG = require('../postgreSQL/diagrammiPG');


router.route('/')
.post( (req, res, next) => {
    try {
        diagrammiPG.haeDiagrammi(req.body,(rows) => {
            res.json(rows);
        })
    } catch(error) {
        throw error;
    }
});


module.exports = router;