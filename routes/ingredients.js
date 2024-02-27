const express = require('express');
const router = express.Router();

const ingredientsController = require('../controllers/ingredients');
const validation =  require('../middleware/validate');
const { requiresAuth } = require('express-openid-connect');

router.get('/', requiresAuth(), ingredientsController.getAll);

router.get('/:id', requiresAuth(), ingredientsController.getSingle);

router.post('/', requiresAuth(), validation.validateIngredient, ingredientsController.createIngredient);

router.put('/:id', requiresAuth(), validation.validateIngredient, ingredientsController.updateIngredient);

router.delete('/:id', requiresAuth(), ingredientsController.deleteIngredient);

// eslint-disable-next-line no-undef
module.exports = router;
