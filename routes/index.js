const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/recipes', require('./recipes'));

// eslint-disable-next-line no-undef
module.exports = router;
