/* eslint-disable no-undef */
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('ingredients').find();
  console.log(result);
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId= new ObjectId(req.params.id);
  const result= await mongodb.getDb().db().collection('ingredients').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
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
    console.log(response.acknowledged);
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'There was an error while creating this ingredient.');
  }
};

const updateIngredient = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid ingredient id to update an ingredient.');
  }
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
    .replaceOne({ _id: userId }, { ingredient });
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).json({ message: `Ingredient with ID ${userId} updated successfully` });
  } else {
    res.status(500).json(response.error || 'There was an error while updating this ingredient.');
  }
};

const deleteIngredient = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid ingredient id to delete the ingredient.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection('ingredients')
    .deleteOne({ _id: userId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).json({ message: `Ingredient with ID ${userId} deleted successfully` });
  } else {
    res.status(500).json(response.error || 'There was an error while deleting this ingredient.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createIngredient,
  updateIngredient,
  deleteIngredient
};
