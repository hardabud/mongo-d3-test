var mongoose = require('mongoose');

module.exports = mongoose.model('testdataModel', {
	project: { type: String }, 
		data: [{ name: String, value: Number }],
		modified: { type: Date, default: Date.now }
});
