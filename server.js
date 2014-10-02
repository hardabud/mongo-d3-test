var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var index = require('./controllers/index');
var graph = require('./controllers/graph');

mongoose.connect('mongodb://localhost/test');
var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/public', express.static(__dirname + '/public'));

app.get('/', index.enterProject);
app.post('/', index.addProject);
app.get('/:id', index.pageProject);
app.post('/:id/add', index.addValue);
app.get('/:id/graph', graph.show);
app.get('/:id/json', graph.getData);


app.listen(3000, function() { console.log('Listening on 3000'); });

