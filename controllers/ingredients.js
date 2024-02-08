const mongodb = require('../db/connect');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('ingredients').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};
const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('ingredients').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createIngredient = async (req, res) => {
  const ingredient = {
      recipeId: req.body.recipeId,
      name: req.body.name,
      quantity: req.body.quantity,
      unit: req.body.unit
  };
  const response = await mongodb.getDb().db().collection('ingredients').insertOne(ingredient);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'There was an error while creating this ingredient.');
  }
};

const updateIngredient = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const ingredient = {
    recipeId: req.body.recipeId,
    name: req.body.name,
    quantity: req.body.quantity,
    unit: req.body.unit
};
  const response = await mongodb
    .getDb()
    .db()
    .collection('ingredients')
    .updateOne({ _id: userId }, {$set:ingredient});
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).json({ message: `Ingredient with ID ${userId} updated successfully` });
  } else {
    res.status(500).json(response.error || 'There was an error while updating this ingredient.');
  }
};

const deleteIngredient = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection('ingredients')
    .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).json({ message: `Ingredient with ID ${userId} deleted successfully` });
  } else {
    res.status(500).json(response.error || 'There was an error while deleting this ingredient.');
  }
};

// eslint-disable-next-line no-undef
module.exports = {
  getAll,
  getSingle,
  createIngredient,
  updateIngredient,
  deleteIngredient
};