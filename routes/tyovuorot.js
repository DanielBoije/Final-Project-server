var express = require('express');
var router = express.Router();
var tyovuorotPG = require('../postgreSQL/tyovuorotPG');

router.get('/', function (req, res, next) {
    tyovuorotPG.haetyovuorot((rows) => {
        res.json(rows);
    })
});
router.get('/:id', function (req, res, next) {
    tyovuorotPG.haetyovuoro(req.params.id, (rows) => {
        res.json(rows);
    })
})


router.post('/', function (req, res, next) {
    tyovuorotPG.luotyovuoro(req.body, (rowCount) => {
        if (rowCount > 0)
            res.status(201).json({ message: 'success' });
        else {
            res.status(400).json({ message: 'error' });
        }
    })
})


router.put('/:id', function (req, res, next) {
    tyovuorotPG.paivitatyovuoro(req.body, req.params.id, (rowCount) => {
        if (rowCount > 0)
            res.status(200).json({ message: 'success' });
        else {
            res.status(400).json({ message: 'error' });
        }
    })
})

router.delete('/:id', function (req, res, next) {
    tyovuorotPG.poistatyovuoro(req.params.id, (rowCount) => {
        if (rowCount > 0)
            res.status(200).json({ message: 'success' });
        else {
            res.status(400).json({ message: 'error' });
        }
    })
})

module.exports = router;