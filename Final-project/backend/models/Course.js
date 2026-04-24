const mongoose = require('mongoose');

const courseschema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    images:[
      {
        type:String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseschema);