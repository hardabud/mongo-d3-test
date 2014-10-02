var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var index = require('./controllers/indexCtrl');
var barIndex = require('./controllers/barIndexCtrl');
var barGraph = require('./controllers/barGraphCtrl');

mongoose.connect('mongodb://localhost/test');
var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/public', express.static(__dirname + '/public'));

app.get('/', index.start);
app.get('/bar', barIndex.enterProject);
app.post('/bar', barIndex.addProject);
app.get('/bar/:id', barIndex.pageProject);
app.post('/bar/:id/add', barIndex.addValue);
app.get('/bar/:id/graph', barGraph.show);
app.get('/bar/:id/json', barGraph.getData);

app.listen(3000, function() { console.log('Listening on 3000'); });

