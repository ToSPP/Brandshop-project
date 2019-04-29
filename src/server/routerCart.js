const express = require('express');
const handlerCart = require('./handlerCart');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
  fs.readFile('dist/server/db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({result: 0, text: err}));
    } else {
      res.send(data);
    }
  })
});

router.post('/', (req, res) => {
  handlerCart(req, res, 'add', 'dist/server/db/userCart.json');
});

router.put('/:id', (req, res) => {
  handlerCart(req, res, 'change', 'dist/server/db/userCart.json');
});

router.delete('/:id', (req, res) => {
  handlerCart(req, res, 'remove', 'dist/server/db/userCart.json');
});

router.delete('/', (req, res) => {
  handlerCart(req, res, 'clear', 'dist/server/db/userCart.json');
});

module.exports = router;