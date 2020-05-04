const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    // email:  {type: mongoose.SchemaTypes.Email,
    //     required: true},

    password: String,
    googleID: String, 
    facebookId: String

  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }

  // favourites: [] // recipes-detail-pages
);

const User = mongoose.model('User', userSchema);

module.exports = User;
