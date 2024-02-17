/* eslint-disable no-undef */
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('ingredients').find();
    console.log(result);
    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    console.error('Error retrieving ingredients:', error);
    res.status(500).json({ error: 'There was an error while retrieving the ingredients.' });
  }
};


const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('ingredients').find({ _id: userId });
    const lists = await result.toArray();
    if (lists.length === 0) {
      return res.status(404).json({ error: `Ingredient with ID ${userId} not found` });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  } catch (error) {
    console.error('Error retrieving single ingredient:', error);
    res.status(500).json({ error: 'There was an error while retrieving the ingredient.' });
  }
};


const createIngredient = async (req, res) => {
  try {
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
  } catch (error) {
    console.error('Error creating ingredient:', error);
    res.status(500).json({ error: 'There was an error while creating this ingredient.' });
  }
};


const updateIngredient = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid ingredient id to update an ingredient.');
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
      .replaceOne({ _id: userId }, ingredient);

    if (response.modifiedCount > 0) {
      res.status(204).json({ message: `Ingredient with ID ${userId} updated successfully` });
    } else {
      res.status(404).json({ error: `Ingredient with ID ${userId} not found` });
    }
  } catch (error) {
    console.error('Error updating ingredient:', error);
    res.status(500).json({ error: 'There was an error while updating this ingredient.' });
  }
};

const deleteIngredient = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Must use a valid ingredient id to delete the ingredient.' });
    }
    
    const userId = new ObjectId(req.params.id);
    
    const response = await mongodb
      .getDb()
      .db()
      .collection('ingredients')
      .deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: `Ingredient with ID ${userId} deleted successfully` });
    } else {
      res.status(404).json({ error: `Ingredient with ID ${userId} not found` });
    }
  } catch (error) {
    console.error('Error deleting ingredient:', error);
    res.status(500).json({ error: 'There was an error while deleting this ingredient.' });
  }
};


module.exports = {
  getAll,
  getSingle,
  createIngredient,
  updateIngredient,
  deleteIngredient
};
