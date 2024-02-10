/* eslint-disable no-undef */
// validator.js

const validator = require('../helpers/validate').default;

const handleValidation = (req, res, next, validationRule) => {
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const validateRecipe = (req, res, next) => {
  const validationRule = {
    recipeTitle: 'required|string',
    description: 'required|string',
    ingredients: 'required|string',
    preparationTime: 'integer|min:1',
    cookingTime: 'integer|min:1',
    totalTime: 'integer|min:1',
    servings: 'integer|min:1',
    nutritionalInformation: 'string',
    cuisine: 'required|string',
    source: 'required|string',
    author: 'required|string',
    comments: 'string'
  };

  handleValidation(req, res, next, validationRule);
};

const validateIngredient = (req, res, next) => {
  const validationRule = {
    recipeId: 'required|integer|min:1',
    name: 'required|string',
    quantity: 'required|integer|min:1',
    unit: 'required|string'
  };

  handleValidation(req, res, next, validationRule);
};

const validateNutrition = (req, res, next) => {
  
  const validationRule = {
    calories: 'required|numeric|min:0',
    protein: 'numeric|min:0',
    carbohydrates: 'numeric|min:0',
    cholesterol: 'numeric|min:0', // Fixed typo here
    fat: 'numeric|min:0',
    sodium: 'numeric|min:0',
    addedSugar: 'numeric|min:0'
  };

  handleValidation(req, res, next, validationRule);
};

module.exports = {
  validateRecipe,
  validateIngredient,
  validateNutrition
};
