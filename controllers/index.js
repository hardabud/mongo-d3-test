var testdataModel = require('../models/graphBar');

exports.enterProject = function(req, res) {
	res.render('projectForm');
}

exports.addProject = function(req, res) {
  var testdata;
  testdata = new testdataModel({
    project: req.body.project
  });
  testdata.save(function (err, testdata) {
	if (err) { console.log(err); }
	var id = testdata._id;
	res.redirect('/' + id);
  });
}

exports.pageProject = function(req, res) {
	testdataModel.findById(req.params.id, function (err, testdata) {
    if (err) { console.log(err); }
    res.render('projectPage', {testdata:testdata});
   });
}

exports.addValue = function(req,res) {
	var id = req.params.id;
	testdataModel.findById(id, function (err, testdata) {
		testdata.data.name = req.body.name;
		testdata.data.value = req.body.value;
		testdata.update({$push:{ "data": {"name": testdata.data.name, "value": testdata.data.value}}}, function (err) {
			if (err) { console.log(err); }
			res.redirect('/' + id);
		});
	});
}
