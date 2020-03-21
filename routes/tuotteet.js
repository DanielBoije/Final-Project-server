var express = require('express');
var router = express.Router();
var tuotteetPG = require('../postgreSQL/tuotteetPG');

router.get('/', function (req, res, next) {
  tuotteetPG.haetuotteet((rows) => {
    res.json(rows);
  })
});
router.get('/:id', function (req, res, next) {
  tuotteetPG.haetuote(req.params.id, (rows) => {
    res.json(rows);
  })
})


router.post('/', function (req, res, next) {
  tuotteetPG.luotuote(req.body, (rowCount) => {
    if (rowCount > 0)
      res.status(201).json({ message: 'success' });
    else {
      res.status(400).json({ message: 'error' });
    }
  })
})


router.put('/:id', function (req, res, next) {
  tuotteetPG.paivitatuote(req.body, req.params.id, (rowCount) => {
    if (rowCount > 0)
      res.status(200).json({ message: 'success' });
    else {
      res.status(400).json({ message: 'error' });
    }
  })
})

router.delete('/:id', function (req, res, next) {
  tuotteetPG.poistatuote(req.params.id, (rowCount) => {
    if (rowCount > 0)
      res.status(200).json({ message: 'success' });
    else {
      res.status(400).json({ message: 'error' });
    }
  })
})

module.exports = router;
