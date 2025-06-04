const express = require('express');
const router = express.Router();

// TODO: Implement /commentsOfUser/:id here
router.get('/:id', async (req, res) => {
  res.send(`Will implement comments of user with id = ${req.params.id}`);
});

module.exports = router;
