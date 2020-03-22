var express = require('express');
var router = express.Router();
var tot_haiPG = require('../postgreSQL/tot_haiPG');

router.get('/', function (req, res, next) {
   tot_haiPG.haetot_hait((rows) => {
        res.json(rows);
    })
});
router.get('/:id', function (req, res, next) {
   tot_haiPG.haetot_hai(req.params.id, (rows) => {
        res.json(rows);
    })
})


router.post('/', function (req, res, next) {
   tot_haiPG.luotot_hai(req.body, (rowCount) => {
        if (rowCount > 0)
            res.status(201).json({ message: 'success' });
        else {
            res.status(400).json({ message: 'error' });
        }
    })
})


router.put('/:id', function (req, res, next) {
   tot_haiPG.paivitatot_hai(req.body, req.params.id, (rowCount) => {
        if (rowCount > 0)
            res.status(200).json({ message: 'success' });
        else {
            res.status(400).json({ message: 'error' });
        }
    })
})

router.delete('/:id', function (req, res, next) {
   tot_haiPG.poistatot_hai(req.params.id, (rowCount) => {
        if (rowCount > 0)
            res.status(200).json({ message: 'success' });
        else {
            res.status(400).json({ message: 'error' });
        }
    })
})

module.exports = router;