const express = require('express');
const router = express.Router();

const ingredientsController = require('../controllers/ingredients');

router.get('/', ingredientsController.getAll);

router.get('/:id', ingredientsController.getSingle);

router.post('/', ingredientsController.createIngredient);

router.put('/:id', ingredientsController.updateInrgedient);

router.delete('/:id', ingredientsController.deleteIngredient);

// eslint-disable-next-line no-undef
module.exports = router;
