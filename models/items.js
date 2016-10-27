var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var itemSchema = new Schema({
	name            : {type: String},
	type            : {type: String},
	length          : {type: String},
	width           : {type: String},
	height          : {type: String},
	price           : {type: String},
	location        : {type: String},
	description     : {type: String},
	image           : {type: String}
});

var Item = mongoose.model('item', itemSchema);
module.exports = Item;