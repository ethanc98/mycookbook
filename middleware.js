const { recipeSchema } = require("./schemas");
const ExpressError = require("./utils/ExpressError");


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // req.flash('error', 'you must be signed in');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateRecipe = (req, res, next) => {
    const { error } = recipeSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isEmpty = (req, res, next) => {
    const steps = req.body.recipe.steps;

    for (i = 0; i < steps.length; i++) {
        // console.log(steps[i].step);
        if (steps[i].step === '') {
            const msg = 'Please leave no fields blank';
            res.send("<p>Please enter a valid number</p>");
        }
        // throw new ExpressError(msg, 400)
    } next();
}