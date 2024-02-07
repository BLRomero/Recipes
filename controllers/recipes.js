const mongodb = require('../db/connect');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('recipes').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};
const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('recipes').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createRecipe = async (req, res) => {
  const recipe = {
    recipeTitle: req.body.recipeTitle,
    description: req.body.description,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    preparationTime: req.body.preparationTime,
    coookingTime:req.body.coookingTime,
    totalTime:req.body.totalTime,
    servings:req.body.servings,
    nutritionalInformation:req.body.nutritionalInformation,
    cuisine:req.body.cuisine,
    dietaryInformation:req.body.dietaryInformation,
    source:req.body.source,
    author:req.body.author,
    comments:req.body.comments
  };
  const response = await mongodb.getDb().db().collection('recipes').insertOne(recipe);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'There was an error while creating this recipe.');
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
    coookingTime:req.body.coookingTime,
    totalTime:req.body.totalTime,
    servings:req.body.servings,
    nutritionalInformation:req.body.nutritionalInformation,
    cuisine:req.body.cuisine,
    dietaryInformation:req.body.dietaryInformation,
    source:req.body.source,
    author:req.body.author,
    comments:req.body.comments
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('recipes')
    .replaceOne({ _id: userId }, recipe);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).json({ message: `Recipe with ID ${userId} updated successfully` });
  } else {
    res.status(500).json(response.error || 'There was an error while updating this recipe.');
  }
};

const deleteRecipe = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection('recipes')
    .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).json({ message: `Recipe with ID ${userId} deleted successfully` });
  } else {
    res.status(500).json(response.error || 'There was an error while deleting this recipe.');
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