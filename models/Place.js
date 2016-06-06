var mongoose = require('mongoose')

var PlaceSchema = new mongoose.Schema({
	name:{type: String, default: ''},
	key:{type: String, lowercase: true, default: ''},
	address:{type: String, lowercase: true, default: ''},
	city:{type: String, lowercase: true, default: ''},
	state:{type: String, lowercase: true, default: ''},
	zip:{type: String, lowercase: true, default: ''},
	timestamp:{type: String, default: ''},
	admins:{type: Array, default: []}
})

PlaceSchema.methods.summary = function(){
	var summary = {

		name: this.name,
		address: this.address,
		city: this.city,
		state: this.state,
		zip: this.zip,
		admins: this.admins,
		timestamp: this.timestamp, 
		id: this._id
	}

	return summary
}

module.exports = mongoose.model('PlaceSchema', PlaceSchema)