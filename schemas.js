const Joi = require('joi');
const { number } = require('joi');

module.exports.recipeSchema = Joi.object({
    recipe: Joi.object({
        title: Joi.string().required(),
        ingredients: Joi.array().required(),
        steps: Joi.array().required(),
    }).required()
});
