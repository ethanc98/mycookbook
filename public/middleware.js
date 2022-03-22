const Recipe = require('../models/recipe');



// console.log(req.params);


module.exports.stepCount = async (req, res, next) => {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    const stepNum = recipe.steps.length;
    const ingNum = recipe.ingredients.length;


    res.render('edit', { recipe, stepNum, ingNum })
    next();
}

