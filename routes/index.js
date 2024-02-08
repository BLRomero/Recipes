const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/recipes', require('./recipes'));
router.use('/nutritionalinfo', require('./nutritionalinfo.js'));
router.use('/ingredients', require('./ingredients.js'));

// eslint-disable-next-line no-undef
module.exports = router;
