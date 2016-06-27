//INITIALIZE GLOBAL PREFERENCES ----------------------------------------
const Global = {
	
	Favorites: [
		{ name: 'Something Trail1', location: 'Something Park1', img: 'img/ionic.png', id: 1 }
	],
	
	AppPrefs: {
		uselocation: false,
		notifications: [
			{title: 'News', value: true},
			{title: 'Weather Updates', value: false}
		],
		history: ["location 1", "location 2"]
	},
	
	Private:{},
	
	sendMail: function(email){
		window.plugin.email.open(email);
	},
	
	//https://gist.github.com/brunoksato/5e7f9b2916289d1649a4
	getLocation: function($cordovaGeolocation){
		if(!Global.AppPrefs.uselocation)
			return {error: "location services not enabled."};
		var loc = $cordovaGeolocation.getCurrentPosition({timeout: 1000, enableHighAccuracy: false});
		var res = {};
		loc.then(
			function(position){
				var lat = position.coords.latitude;
				var lon = position.coords.longitude;
				res.lat = lat; res.lon = lon;
			},
			function(err){
				res.error = err;
			});
		return res;
	},
	
	isGpsEnabled: function(){
		var res = false;
		window.plugins.locationAndSettings.isGpsEnabled(function(result){
			res = result;
		}, function(err){res = false;});
		return res;
	},
	
	saveTo: function(name, data, fn){
		var db = window.sqlitePlugin.openDatabase({
			name:'GetLost.db',
			location: 2,
			createFromLocation: 1
		});
		db.executeSql("CREATE TABLE IF NOT EXISTS store (name text primary key, value text)");
		db.executeSql("INSERT INTO store (name,value) VALUES (?,?)", [name, JSON.stringify(data)], function(res){
			if(fn)
				fn(res);
		});
	},
	
	loadFrom: function(name, fn){
		var db = window.sqlitePlugin.openDatabase({
			name:'GetLost.db',
			location: 2,			
			createFromLocation: 1
		});
		db.executeSql("SELECT value FROM store WHERE store.name = ?",[name], function(result){
			if(fn)
				fn(result);
		});
	},
	
	serialize: function(fn){
		//Serialize Global to string
		var serialize = {};
		for(var field in this){
			if(field == "Private")
				continue;
			
			serialize[field] = this[field];
		}
		var str = JSON.stringify(serialize);
		
		this.saveTo("global", str, fn);
	},
	
	deserialize: function(){
		var me = this;
		this.loadFrom("global", function(global){
			console.log(global);
			var deserialize = JSON.parse(global);
				
			for(var field in deserialize){
				me[field] = deserialize[field];
			}
		});
	}
}
