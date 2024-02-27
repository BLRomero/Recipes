const express = require('express');
const router = express.Router();

const nutritionController = require('../controllers/nutritionalinfo');
const validation =  require('../middleware/validate');
const { requiresAuth } = require('express-openid-connect');

router.get('/', requiresAuth(), nutritionController.getAll);

router.get('/:id', requiresAuth(), nutritionController.getSingle);

router.post('/', requiresAuth(), validation.validateNutrition, nutritionController.createNutrition);

router.put('/:id', requiresAuth(), validation.validateNutrition,nutritionController.updateNutrition);

router.delete('/:id', requiresAuth(), nutritionController.deleteNutrition);

// eslint-disable-next-line no-undef
module.exports = router;
