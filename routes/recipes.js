const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');


const { stepCount } = require('../public/middleware');
const { isEmpty, isLoggedIn, validateRecipe } = require('../middleware');
const { rawListeners } = require('../models/user');
const ExpressError = require('../utils/ExpressError');


router.get('/', isLoggedIn, catchAsync(async (req, res) => {
    const user = await User.findById(req.user._id);
    const recipes = await Recipe.find({ _id: user.recipes })
    res.render('recipes', { recipes, user });
}));

router.get('/new', isLoggedIn, catchAsync(async (req, res) => {
    const user = await User.findById(req.user._id);
    res.render('new', { user });

}));

router.post('/new', isLoggedIn, validateRecipe, catchAsync(async (req, res) => {
    // if (!req.user) throw new ExpressError('Invalid User ID', 400)
    // if (!req.body.recipe) throw new ExpressError('Invalid Recipe Data', 400)

    const user = await User.findById(req.user._id);
    const recipe = new Recipe(req.body.recipe);
    user.recipes.push(recipe);
    await recipe.save();
    await user.save();
    res.redirect('/recipes');
    // res.send(recipe)

}));

router.get('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id)
    res.render('show', { recipe });
}));

router.put('/:id', isEmpty, isLoggedIn, validateRecipe, catchAsync(async (req, res) => {
    const { id } = req.params;
    const recipe = await Recipe.findByIdAndUpdate(id, { ...req.body.recipe });
    res.redirect(`/recipes/${recipe._id}`)
}));

router.get('/:id/edit', isLoggedIn, stepCount, catchAsync(async (req, res) => {
    // const recipe = await Recipe.findById(req.params.id)
    // res.render('edit', { recipe });
}));

router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndUpdate(req.user._id, { $pull: { recipes: id } });
    await Recipe.findByIdAndDelete(id);
    res.redirect('/recipes');
}));

module.exports = router;