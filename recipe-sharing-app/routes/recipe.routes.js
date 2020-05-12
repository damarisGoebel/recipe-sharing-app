const express = require('express');
const router = express.Router();

const Recipe = require('../models/Recipe.model');

const uploadCloud = require('../config/cloudinary.js');

//Show all recipes on recipe-overview
router.get('/', (req, res, next) => {
  console.log('req.query',req.query)

  // const level = req.query.level
  Recipe.find().then((data) => {
    const filteredData = data.filter(recipe =>{

      if (req.query.level && req.query.dishType && req.query.cuisine) {
        return recipe.level === req.query.level && recipe.dishType === req.query.dishType && recipe.cuisine === req.query.cuisine;
      } else if(req.query.dishType && req.query.cuisine){
        return recipe.dishType === req.query.dishType && recipe.cuisine === req.query.cuisine;
      } else if (req.query.cuisine && req.query.level) {
          return recipe.cuisine === req.query.cuisine && recipe.level === req.query.level;
      } else if (req.query.level && req.query.dishType) {
        return recipe.level === req.query.level && recipe.dishType === req.query.dishType;
      } else if(req.query.level){
        return recipe.level === req.query.level
      } else if(req.query.cuisine){
        return recipe.cuisine === req.query.cuisine
      } else if(req.query.dishType){
        return recipe.dishType === req.query.dishType
      } else {
        return recipe;
      }

    //The following code does the same. It is called ternary operation.
      // return req.query.level? recipe.level === req.query.level: recipe;
    });

    let recipeCounter = filteredData.length;

//TODO - apply all the filters before sending the data to the view

    // const result = words.filter(word => word.length > 6);


    // console.log('All my recipes:' + data + '========> recipeData');
    let uniqueCuisine = [];
    data.forEach((recipe) => {
      if (!uniqueCuisine.includes(recipe.cuisine)) {
        uniqueCuisine.push(recipe.cuisine);
      }
    });

    let uniqueDishtype = [];
    data.forEach((recipe) => {
      if (uniqueDishtype.includes(recipe.dishType) == false ) {
        uniqueDishtype.push(recipe.dishType)
      }
    })
    res.render('recipes/recipe-overview', {
      //The value you give to "recipes:" is the one that the view is going to receive
      recipes: filteredData,
      count: recipeCounter,
      cuisine: uniqueCuisine,
      dishType: uniqueDishtype
    });
  });
});

router.get('/neu', (req, res, next) => {
  res.render('recipes/add-recipe');
});

router.post('/', uploadCloud.single('photo'), (req, res, next) => {
  console.log('req.body', req.body); // access form infos
  console.log('req.file', req.file); //access picture infos, you can see all the infos from the picture

  let image = '';

  if (req.file) {
    image = req.file.url;
  }

  let ingredients = req.body.ingredients.split('\r'); // new line split

  let directions = req.body.directions.split('\r'); // split new line

  let recipe = new Recipe({
    title: req.body.title,
    image: image,
    ingredients: ingredients,
    directions: directions,
    level: req.body.level,
    cuisine: req.body.cuisine,
    portions: req.body.portions,
    dishType: req.body.dishType,
    duration: req.body.duration,
  });

  recipe
    .save()
    .then((recipe) => {
      // console.log("recipe",recipe)
      //res.redirect('/rezepte')
      res.redirect(`/rezepte/${recipe._id}`);
    })

    .catch((error) => {
      console.log('Error while getting the recipes from the DB: ', error);
    });
});

router.get('/:id', (req, res, next) => {
  Recipe.findById(req.params.id)
    .then((data) => {
      res.render('recipes/recipe-details', data);
    })
    .catch((error) => {
      console.log('Error while getting the recipes from the DB: ', error);
    });
});

// EDIT GET
router.get('/:id/bearbeiten', (req, res, next) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      res.render('recipes/edit-recipe', { recipe });
    })
    .catch((error) => {
      console.log('Error while editing the recipe from the DB: ', error);
    });
});

// DELETE
router.post('/:id/entfernen', (req, res) => {
  console.log(req.params.id);

  Recipes.findByIdAndDelete(req.params.id).then(() => {
    res.redirect('/rezepte');
  });
});

// EDIT POST

router.post('/:id/bearbeiten', (req, res, next) => {
  console.log('req.body', req.body);

  let image = '';

  if (req.file) {
    image = req.file.url;
  }

  let ingredients = req.body.ingredients.split('\r'); // new line split

  let directions = req.body.directions.split('\r'); // split new line


  Recipe.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    image: image,
    ingredients: ingredients,
    directions: directions,
    level: req.body.level,
    cuisine: req.body.cuisine,
    portions: req.body.portions,
    dishType: req.body.dishType,
    duration: req.body.duration,

  }).then(() => {
    res.redirect('/rezepte');
  });
});

module.exports = router;
