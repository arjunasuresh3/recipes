var express = require('express'),
    fs = require('fs'),
    http = require('http');
    
var app = express();
var store = new express.session.MemoryStore();
app.use(express.cookieParser());
app.use(express.session({secret : 'the recipe website session', store: store}));

var load_json = function() {
  var recipes_json = JSON.parse(fs.readFileSync('server/data/recipes.json'));
  var lastIndex = 0;

  Object.keys(recipes_json).forEach(function(val) {
    if (lastIndex < val * 1) { 
      lastIndex = val * 1;
    }
  });

  return {json : recipes_json, index: lastIndex};
}
  
app.use(express.bodyParser());

var users = {
  'abhiroop': { 'password': 'abhi123', favourites: ['2','3'] }, 
  'chefcook': { 'password': 'chef123', favourites: ['1', '2', '3'] }
};

require('./recipeRoutes')(app, load_json, users);
/* Required Route Files */ 

module.exports = app;
