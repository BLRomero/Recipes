const express = require('express');
const router = express.Router();

const nutritionController = require('../controllers/nutrition');

router.get('/', nutritionController.getAll);

router.get('/:id', nutritionController.getSingle);

router.post('/', nutritionController.createNutrition);

router.put('/:id', nutritionController.updateNutrition);

router.delete('/:id', nutritionController.deleteNutrition);

// eslint-disable-next-line no-undef
module.exports = router;
