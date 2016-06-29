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
	
	saveTo: function(name, data, fn, err){
		window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(filesystem){
			filesystem.getFile(name, {create: true, exclusive: false, replace: true}, function(fileEntry){
				//Write file
				fileEntry.createWriter(function (fileWriter){
					fileWriter.onwriteend = function(){
						if(fn){
							fn();
						}
					};
					
					fileWriter.onerror = function(e){
						if(err)
							err();
					};
					
					fileWriter.write(JSON.stringify(data));
				});
			}, function(){
					//Error func
					if(err)
						err();
			});
		}, function(){
				//Error func
				if(err)
							err();
		});
	},
	
	loadFrom: function(name, fn, err){
		window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(filesystem){
			filesystem.getFile(name, {create: false, exclusive: false}, function(fileEntry){
				//Read file
				fileEntry.file(function(file){
					var reader = new FileReader();
					reader.onloadend = function(){
						if(fn){
							fn(this.result);
						}
					}
					
					reader.readAsText(file);
				});
			}, function(){
					//Error func
					if(err)
						err();
			});
		}, function(){
				//Error func
				if(err)
							err();
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
		
		this.saveTo("global.dat", serialize, fn, function(){console.log("File could not be written to");});
	},
	
	deserialize: function(){
		var me = this;
		this.loadFrom("global.dat", function(global){
			var deserialize = JSON.parse(global);
				
			for(var field in deserialize){
				me[field] = deserialize[field];
			}
		}, function(){console.log("File could not be read from");});
	}
}

function onDeviceReady(){
	console.log("Deserializing Global");
	Global.deserialize();
}
function onAppClose(){
	console.log("Serializing Global");
	Global.serialize();
}
document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener("unload",onAppClose, false);
document.addEventListener("pause",onAppClose, false);