const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('recipes').find();
    const lists = await result.toArray();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('recipes').find({ _id: userId });
    const lists = await result.toArray();

    if (lists.length === 0) {
      res.status(400).json({ error: 'No recipe found with the provided ID' });
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createRecipe = async (req, res) => {
  try {
    const recipe = {
      recipeTitle: req.body.recipeTitle,
      description: req.body.description,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      preparationTime: req.body.preparationTime,
      cookingTime: req.body.cookingTime, // Corrected typo here
      totalTime: req.body.totalTime,
      servings: req.body.servings,
      nutritionalInformation: req.body.nutritionalInformation,
      cuisine: req.body.cuisine,
      dietaryInformation: req.body.dietaryInformation,
      source: req.body.source,
      author: req.body.author,
      comments: req.body.comments
    };

    const response = await mongodb.getDb().db().collection('recipes').insertOne(recipe);
    
    if (response.acknowledged) {
      res.status(201).json({ message: 'Recipe created successfully', recipe });
    } else {
      throw new Error('Recipe creation failed');
    }
  } catch (error) {
    console.error('Error creating recipe:', error);
    res.status(500).json({ error: 'There was an error while creating this recipe.' });
  }
};

const updateRecipe = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const recipe = {
    recipeTitle: req.body.recipeTitle,
    description: req.body.description,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    preparationTime: req.body.preparationTime,
    cookingTime: req.body.cookingTime, // Corrected typo here
    totalTime: req.body.totalTime,
    servings: req.body.servings,
    nutritionalInformation: req.body.nutritionalInformation,
    cuisine: req.body.cuisine,
    dietaryInformation: req.body.dietaryInformation,
    source: req.body.source,
    author: req.body.author,
    comments: req.body.comments
  };
  
  try {
    const response = await mongodb.getDb().db().collection('recipes').updateOne({ _id: userId }, { $set: recipe });
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).json({ message: `Recipe with ID ${userId} updated successfully` });
    } else {
      res.status(404).json({ error: `Recipe with ID ${userId} not found` });
    }
  } catch (error) {
    console.error('Error updating recipe:', error);
    res.status(500).json({ error: 'There was an error while updating this recipe.' });
  }
};

const deleteRecipe = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Must use a valid recipe ID to delete the recipe.' });
  }

  const userId = new ObjectId(req.params.id);
  
  try {
    const response = await mongodb.getDb().db().collection('recipes').deleteOne({ _id: userId });
    console.log(response);
    
    if (response.deletedCount > 0) {
      res.status(200).json({ message: `Recipe with ID ${userId} deleted successfully` });
    } else {
      res.status(404).json({ error: `Recipe with ID ${userId} not found` });
    }
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).json({ error: 'There was an error while deleting this recipe.' });
  }
};


// eslint-disable-next-line no-undef
module.exports = {
  getAll,
  getSingle,
  createRecipe,
  updateRecipe,
  deleteRecipe
};
