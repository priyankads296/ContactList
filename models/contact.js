//for creating schema of contact database

const mongoose = require('mongoose');

const contactSchema=new mongoose.Schema({
  name:
  {
    type:String,
    required:true
  },
  phone:{
    type:String,
    required:true
  }
});

//collection to be called as
const Contact= mongoose.model('Contact',contactSchema);

module.exports=Contact;

