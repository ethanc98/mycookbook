const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    title: String,
    ingredients: [
        {
            number: String,
            ingredient: String
        }
    ],
    steps: [
        {
            number: String,
            step: String
        }
    ]
});

module.exports = mongoose.model('Recipe', RecipeSchema);