/* eslint-disable no-undef */
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
  mongodb
    .getDb()
    .db()
    .collection('nutritionalinfo')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
};

const getSingle = (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid nutritional id to find the nutritional information.');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db()
    .collection('nutritionalinfo')
    .find({ _id: userId })
    .toArray((err, result) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(result[0]);
    });
};

const createNutrition = async (req, res) => {
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
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'There was an error while creating this information.');
  }
};

const updateNutrition = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid nutritional info id to update a nutritional information.');
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
    .replaceOne({ _id: userId }, { $set: nutrition });
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).json({ message: `Nutritional Information with ID ${userId} updated successfully` });
  } else {
    res.status(500).json(response.error || 'There was an error while updating the information.');
  }
};

const deleteNutrition = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid nutritional info id to delete the nutritional information.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection('nutritionalinfo')
    .deleteOne({ _id: userId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).json({ message: `Nutritional information with ID ${userId} deleted successfully` });
  } else {
    res.status(500).json(response.error || 'There was an error while deleting the information.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createNutrition,
  updateNutrition,
  deleteNutrition
};
