const express = require('express');
const router = express.Router();

const Recipes = require('../models/Recipe.model');

const uploadCloud = require('../config/cloudinary.js');

router.get('/', (req, res, next) => {
  // const cuisine = req.query.cuisine
  // const level = req.query.level
  Recipes.find().then((data) => {
    console.log('All my recipes:' + data + '========> recipeData');
    let uniqueCuisine = [];
    data.forEach((x) => {
      if (!uniqueCuisine.includes(x.cuisine)) {
        uniqueCuisine.push(x.cuisine);
      }
    });
    res.render('recipes/recipe-overview', {
      recipes: data,
      cuisine: uniqueCuisine,
    });
  });
});



router.get('/neu', (req, res, next) => {
  res.render('recipes/add-recipe');
});

router.post('/', uploadCloud.single('photo'), (req, res, next) => {
  console.log('req.body', req.body);
  console.log('req.file',req.file)

  let recipe = new Recipes({
    title: req.body.title,
    image: req.file.url,
    ingredients: req.body.ingredients,
    directions: req.body.directions,
    duration: req.body.duration,
  });

  recipe
    .save()
    .then(() => {
      res.redirect('/rezepte');
    })

    .catch((error) => {
      console.log('Error while getting the recipes from the DB: ', error);
    });
});

router.get('/:id', (req, res, next) => {
  Recipes.findById(req.params.id)
    .then((data) => {
      res.render('recipes/recipe-details', data);
    })
    .catch((error) => {
      console.log('Error while getting the recipes from the DB: ', error);
    });
});

router.get('/:id/bearbeiten', (req, res, next) => {
  Recipes.findById(req.params.id)
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

router.post('/:id/edit', (req, res, next) => {
  console.log('req.body', req.body);

  Recipes.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    ingredients: req.body.ingredients,
    directions: req.body.directions,
    duration: req.body.duration,
  }).then(() => {
    res.redirect('/recipes');
  });
});

module.exports = router;
