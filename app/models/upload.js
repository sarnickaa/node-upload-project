const mongoose = require('mongoose')

// schema/model = the connection between the database and the application.
// mongoose = ORM (object relational mapping)
// schema defines what structure the db objects will need to have
// now new instances of upload can be created and saved in the DB

const uploadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Upload', uploadSchema) // name of model = 1st arg, name of schema to be used = 2nd arg
// schema is used to compile a model through a mongoose method
