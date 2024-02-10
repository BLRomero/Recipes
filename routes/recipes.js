const express = require('express');
const router = express.Router();

const recipesController = require('../controllers/recipes');
const validation =  require('../middleware/validate');

router.get('/', recipesController.getAll);

router.get('/:id', recipesController.getSingle);

router.post('/', validation.validateRecipe, recipesController.createRecipe);

router.put('/:id', validation.validateRecipe, recipesController.updateRecipe);

router.delete('/:id', recipesController.deleteRecipe);

// eslint-disable-next-line no-undef
module.exports = router;
