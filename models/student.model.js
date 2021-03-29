const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Student= new Schema({
  roll_no: { type: String, required: true, unique: true  },
  classs: {  type: String, required: true },
  name: { type: String, required: true},
  subject: { type:[String], required: true },
}, {
  timestamps: true
})

module.exports = mongoose.model('Student',Student);