var Deferred = require("./deferred");
var fs = require("fs");
var readFile = function(file){
	var deferred = new Deferred();
	fs.readFile(file,"utf-8",deferred.callback());
	return deferred.promise;
}

readFile("./1.txt")
.then(function(data){
	console.log(data);
	return readFile(data);
},function(err){
	console.log(err);
})
.then(function(data){
	console.log(data);
	return readFile(data);
},function(err){
	console.log(err);
})
.then(function(data){
	console.log(data);
	return readFile(data);
},function(err){
	console.log(err);
})
.then(function(data){
	console.log(data);
},function(err){
	console.log(err);
})