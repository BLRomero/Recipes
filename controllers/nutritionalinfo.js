const mongodb = require('../db/connect');

const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('nutritionalinfo').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};
const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('nutritionalinfo').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
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
    res.status(500).json(response.error || 'There was an error while creating this recipe.');
  }
};

const updateNutrition = async (req, res) => {
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
    .updateOne({ _id: userId }, { $set: nutrition });
  console.log(response);
  if (response.modifiedCount > 0) {
    res
      .status(204)
      .json({ message: `Nutritional Information with ID ${userId} updated successfully` });
  } else {
    res.status(500).json(response.error || 'There was an error while updating the information.');
  }
};

const deleteNutrition = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection('nutritionalinfo')
    .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res
      .status(200)
      .json({ message: `Nutritional information with ID ${userId} deleted successfully` });
  } else {
    res.status(500).json(response.error || 'There was an error while deleting the information.');
  }
};

// eslint-disable-next-line no-undef
module.exports = {
  getAll,
  getSingle,
  createNutrition,
  updateNutrition,
  deleteNutrition
};
