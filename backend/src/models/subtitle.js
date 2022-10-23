const mongoose=require('mongoose');
const connection = require('../config/database');

const subtitleSchema=new mongoose.Schema({
    subtitle: {
        type: String,
        required: true,
    },
    introductionVideo: {
        type: String,
    },
    description: {
        type: String,
    },
    sources: {
        type: [ {
            link:{
            type: String,
          },
            description:{
              type: String,
          }}],
        // insert type if needed
    }});

const Subtitle=connection.model('Subtitle', subtitleSchema);

module.exports=Subtitle;