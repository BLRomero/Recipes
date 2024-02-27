const express = require('express');
const router = express.Router();

const recipesController = require('../controllers/recipes');
const validation =  require('../middleware/validate');
const { requiresAuth } = require('express-openid-connect');

router.get('/', requiresAuth(), recipesController.getAll);

router.get('/:id', requiresAuth(), recipesController.getSingle);

router.post('/', requiresAuth(), validation.validateRecipe, recipesController.createRecipe);

router.put('/:id', requiresAuth(), validation.validateRecipe, recipesController.updateRecipe);

router.delete('/:id', requiresAuth(), recipesController.deleteRecipe);

// eslint-disable-next-line no-undef
module.exports = router;
