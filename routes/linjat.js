var express = require('express');
var router = express.Router();
var linjatPG = require('../postgreSQL/linjatPG');

router.get('/', function (req, res, next) {
    linjatPG.haelinjat((rows) => {
        res.json(rows);
    })
});
router.get('/:id', function (req, res, next) {
    linjatPG.haelinja(req.params.id, (rows) => {
        res.json(rows);
    })
})
router.post('/', function (req, res, next) {
    linjatPG.luolinja(req.body, (rowCount) => {
        if (rowCount > 0)
            res.status(201).json({ message: 'success' });
        else {
            res.status(400).json({ message: 'error' });
        }
    })
})


router.put('/:id', function (req, res, next) {
    linjatPG.paivitalinja(req.body, req.params.id, (rowCount) => {
        if (rowCount > 0)
            res.status(200).json({ message: 'success' });
        else {
            res.status(400).json({ message: 'error' });
        }
    })
})

router.delete('/:id', function (req, res, next) {
    linjatPG.poistalinja(req.params.id, (rowCount) => {
        if (rowCount > 0)
            res.status(200).json({ message: 'success' });
        else {
            res.status(400).json({ message: 'error' });
        }
    })
})

module.exports = router;