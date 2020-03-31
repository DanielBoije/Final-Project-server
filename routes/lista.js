var express = require('express');
var router = express.Router();
var listaPG = require('../postgreSQL/listaPG');

router.get('/', function (req, res, next) {
    listaPG.haelista((rows) => {
        res.json(rows);
    })
});


module.exports = router;
