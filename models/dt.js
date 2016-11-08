var mongoose=require('mongoose');

var dtSchema=mongoose.Schema({
  add:String,
  businesses:[{
    name:String,
    url:String,
    snippet_text:String,
    image_url:String,
    c:Number
  }],
  likes:[]
});

module.exports = mongoose.model('Dt',dtSchema);
