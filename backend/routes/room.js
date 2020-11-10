const express = require('express');
const router = express.Router();
const config = require('../config/config.json');

let name = config.room.name;

router.get('/', (req, res) => {
  res.send(`Current room is ${name}`)
});

router.post('/', (req, res) => {
  name = req.body.name;
  res.send(`Name was changed to ${name}`);
});

module.exports = router;
