/* eslint-disable no-undef */
const Validator = require('validatorjs');
const customValidator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

module.exports = customValidator;
