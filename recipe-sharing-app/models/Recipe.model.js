const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
    
{title: {
    type: String,
    required: true,
    unique: true
},

level: {
    type: String,
    enum: ['Easy Peasy','Amateur Chef','UltraPro Chef'],
  },

 ingredients: {
     type: Array,
     required: true
 }
,
 directions: {
     type: Array,
     required: true
 }
 ,

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
    enum: ['Hauptspeise','Vorspeise','Suppe','Frühstück', 'Dessert', 'Salat', 'Beilage','Spezielles'],
    required: true
},

portions: Number,

image: {
    type: String,
    default: "https://res.cloudinary.com/dfx4shmcy/image/upload/v1589106164/folder-name/ausfallbild-img3_m5xdle.svg"
},


duration: String
}
,
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }

// author: [{ type: Schema.Types.ObjectId, ref: 'User' }], // username - based on the UserID .populate()


// comments: [String]

);


const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;