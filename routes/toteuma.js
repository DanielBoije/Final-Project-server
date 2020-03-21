var express = require('express');
var router = express.Router();
var toteumaPG = require('../postgreSQL/toteumaPG');

router.get('/', function (req, res, next) {
   toteumaPG.haetoteumat((rows) => {
        res.json(rows);
    })
});
router.get('/:id', function (req, res, next) {
   toteumaPG.haetoteuma(req.params.id, (rows) => {
        res.json(rows);
    })
})


router.post('/', function (req, res, next) {
   toteumaPG.luototeuma(req.body, (rowCount) => {
        if (rowCount > 0)
            res.status(201).json({ message: 'success' });
        else {
            res.status(400).json({ message: 'error' });
        }
    })
})


router.put('/:id', function (req, res, next) {
   toteumaPG.paivitatoteuma(req.body, req.params.id, (rowCount) => {
        if (rowCount > 0)
            res.status(200).json({ message: 'success' });
        else {
            res.status(400).json({ message: 'error' });
        }
    })
})

router.delete('/:id', function (req, res, next) {
   toteumaPG.poistatoteuma(req.params.id, (rowCount) => {
        if (rowCount > 0)
            res.status(200).json({ message: 'success' });
        else {
            res.status(400).json({ message: 'error' });
        }
    })
})

module.exports = router;