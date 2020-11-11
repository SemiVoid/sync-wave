const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Current Video playing is');
});

module.exports = router;
