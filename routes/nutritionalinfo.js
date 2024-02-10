const express = require('express');
const router = express.Router();

const nutritionController = require('../controllers/nutritionalinfo');
const validation =  require('../middleware/validate');

router.get('/', nutritionController.getAll);

router.get('/:id', nutritionController.getSingle);

router.post('/', validation.validateNutrition, nutritionController.createNutrition);

router.put('/:id', validation.validateNutrition,nutritionController.updateNutrition);

router.delete('/:id', nutritionController.deleteNutrition);

// eslint-disable-next-line no-undef
module.exports = router;
