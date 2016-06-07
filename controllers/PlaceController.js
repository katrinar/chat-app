var Place = require('../models/Place')
var Request = require('../utils/Request')

module.exports = {
	get: function(params, isRaw, callback){

// this is a geospatial query
		if (params.lat!=null && params.lng!=null){
			var distance = 1000 / 6371
			params['geo'] = {
				$near: [params.lat, params.lng],
				$maxDistance: distance
			}

			delete params['lat'] 
			delete params['lng']
		}

		Place.find(params, function(err, places){
			if (err){
				if (callback != null)
					callback(err, null)
				return
			}

			if (callback != null){
				if (isRaw == true) {
					callback(null, places)
				return
				}
				
				var summaries = []
				for (var i=0; i<places.length; i++){
				var place = places[i]
				summaries.push(place.summary())
			}
				callback(null, places)
			}
		})
	},

	getById: function(id, isRaw, callback){
		Place.findById(id, function(err, place){
			if (err){
				if (callback != null)
					callback({message: 'Place Not Found'}, null)
				return
			}

			if (callback != null)
				callback(null, place.summary())
		})
	},

	post: function(params, callback){
		var url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+params.address+','+params.city+','+params.state
	    
	    Request.get(url, {key:'AIzaSyA7ubOEswjvE09Hdpii4ZRi__SndjdE7ds'})
	    .then(function(response){
	    	console.log(JSON.stringify(response))

	    	var results = response.results
	    	var locationInfo = results[0]
	    	var geometry = locationInfo.geometry
	    	var location = geometry.location
	    	var geo = [location.lat, location.lng]
	    	params['geo'] = geo

	    Place.create(params, function(err, place){
			if(err){
	 			if (callback != null)
	    			callback(err, null)
	    		return
	   			 }

	   			 if (callback != null)
	   			 	callback(null, place.summary())
	   			})	
	    }) 
	    	.catch(function(err){
	    		console.log('ERROR: '+err)
	    		})
	},

	put: function(id, params, callback){
		Place.findByIdAndUpdate(id, params, {new:true}, function(err, result){
			if(err){
				if (callback != null)
					callback(err, null)
				return
			}

			if(callback != null)
				callback(null, place.summary())
		})
	}
}