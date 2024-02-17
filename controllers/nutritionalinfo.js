/* eslint-disable no-undef */
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('nutritionalinfo').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching nutritional information:', error);
    res.status(500).json({ error: 'There was an error while fetching nutritional information.' });
  }
};


const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('nutritionalinfo').findOne({ _id: userId });
    
    if (!result) {
      // If nutritional information with the specified ID is not found
      return res.status(404).json({ error: `Nutritional information with ID ${userId} not found.` });
    }
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching nutritional information:', error);
    res.status(500).json({ error: 'There was an error while fetching nutritional information.' });
  }
};


const createNutrition = async (req, res) => {
  try {
    const nutrition = {
      recipeId: req.body.recipeId,
      calories: req.body.calories,
      protein: req.body.protein,
      carbohydrates: req.body.carbohydrates,
      cholesterol: req.body.cholesterol,
      fat: req.body.fat,
      sodium: req.body.sodium,
      addedSugar: req.body.addedSugar
    };
    
    const response = await mongodb.getDb().db().collection('nutritionalinfo').insertOne(nutrition);
    
    if (response.acknowledged) {
      res.status(201).json({ message: 'Nutritional information created successfully', data: response.ops });
    } else {
      res.status(500).json({ error: 'There was an error while creating this information.' });
    }
  } catch (error) {
    console.error('Error creating nutritional information:', error);
    res.status(500).json({ error: 'There was an error while creating this information.' });
  }
};



const updateNutrition = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json('Must use a valid nutritional info id to update nutritional information.');
  }

  const userId = new ObjectId(req.params.id);
  const nutrition = {
    recipeId: req.body.recipeId,
    calories: req.body.calories,
    protein: req.body.protein,
    carbohydrates: req.body.carbohydrates,
    cholesterol: req.body.cholesterol,
    fat: req.body.fat,
    sodium: req.body.sodium,
    addedSugar: req.body.addedSugar
  };

  const response = await mongodb
    .getDb()
    .db()
    .collection('nutritionalinfo')
    .replaceOne({ _id: userId }, nutrition); 

  if (response.modifiedCount > 0) {
    res.status(204).json({ message: `Nutritional Information with ID ${userId} updated successfully` });
  } else {
    res.status(500).json({ error: 'There was an error while updating the information.' });
  }
};


const deleteNutrition = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: 'Must use a valid nutritional info ID to delete the nutritional information.' });
  }
  
  const userId = new ObjectId(req.params.id);
  
  try {
    const response = await mongodb.getDb().db().collection('nutritionalinfo').deleteOne({ _id: userId });
    console.log(response);
    
    if (response.deletedCount > 0) {
      res.status(204).json({ message: `Nutritional information with ID ${userId} deleted successfully` });
    } else {
      res.status(404).json({ error: `Nutritional information with ID ${userId} not found` });
    }
  } catch (error) {
    console.error('Error deleting nutritional information:', error);
    res.status(500).json({ error: 'There was an error while deleting the nutritional information.' });
  }
};


module.exports = {
  getAll,
  getSingle,
  createNutrition,
  updateNutrition,
  deleteNutrition
};
