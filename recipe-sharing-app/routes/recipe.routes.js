const express = require('express');
const router  = express.Router();

const Recipes = require('../models/Recipe.model');

router.get('/recipes', (req,res,next) => {
    Recipes.find()
    .then((data) => {
        console.log('All my recipes:' + data + "========> recipeData"); 
        res.render('recipes/recipe-overview', {recipes: data });

    })
}
)

module.exports = router;
