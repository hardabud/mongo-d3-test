var testdataModel = require('../models/graphBar');

exports.show = function(req,res) {
	var id = req.params.id;
		res.render('barGraph', {id:id});
}

exports.getData = function(req,res) {
	var id = req.params.id;
	testdataModel.findById(id, function (err, testdata) {
		res.json(testdata);
	});	
}

