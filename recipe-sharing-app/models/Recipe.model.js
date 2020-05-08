const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({

title: {
    type: String,
    required: true,
    unique: true
},

level: {
    type: String,
    enum: ['Easy Peasy','Amateur Chef','UltraPro Chef'],
  },

 ingredients: [String],

 directions: [String],

ratings: [{
type: Number,
min: 0,
max:5
}
], // [{user1ID: number}, {user2ID: number}, ...]

ratingAverage: Number,

cuisine: {
    type: String,
  },

dishType: {
    type: String,
    enum: ['breakfast','lunch','dinner','soup', 'snack', 'drink', 'dessert','other']
},

portions : Number,

image: {
        url: String,
// default: "https://images.media-allrecipes.com/images/75131.jpg"
    },


// duration: {
//     type: Number,
//     min:0
//  },

// author: [{ type: Schema.Types.ObjectId, ref: 'User' }], // username - based on the UserID .populate()

// timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },


// comments: [String]

});


const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;