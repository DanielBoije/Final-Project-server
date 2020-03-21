var express = require('express');
var router = express.Router();
var hairiotPG = require('../postgreSQL/hairiotPG');

router.get('/', function (req, res, next) {
    hairiotPG.haehairiot((rows) => {
        res.json(rows);
    })
});
router.get('/:id', function (req, res, next) {
    hairiotPG.haehairio(req.params.id, (rows) => {
        res.json(rows);
    })
})


router.post('/', function (req, res, next) {
    hairiotPG.luohairio(req.body, (rowCount) => {
        if (rowCount > 0)
            res.status(201).json({ message: 'success' });
        else {
            res.status(400).json({ message: 'error' });
        }
    })
})


router.put('/:id', function (req, res, next) {
    hairiotPG.paivitahairio(req.body, req.params.id, (rowCount) => {
        if (rowCount > 0)
            res.status(200).json({ message: 'success' });
        else {
            res.status(400).json({ message: 'error' });
        }
    })
})

router.delete('/:id', function (req, res, next) {
    hairiotPG.poistahairio(req.params.id, (rowCount) => {
        if (rowCount > 0)
            res.status(200).json({ message: 'success' });
        else {
            res.status(400).json({ message: 'error' });
        }
    })
})

module.exports = router;