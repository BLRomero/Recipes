const express = require('express');
const router = express.Router();

const ingredientsController = require('../controllers/ingredients');
const validation =  require('../middleware/validate');

router.get('/', ingredientsController.getAll);

router.get('/:id', ingredientsController.getSingle);

router.post('/', validation.validateIngredient, ingredientsController.createIngredient);

router.put('/:id', validation.validateIngredient, ingredientsController.updateIngredient);

router.delete('/:id', ingredientsController.deleteIngredient);

// eslint-disable-next-line no-undef
module.exports = router;
