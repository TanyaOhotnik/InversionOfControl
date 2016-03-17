// Example showing us how the framework creates an environment (sandbox) for
// appication runtime, load an application code and passes a sandbox into app
// as a global context and receives exported application interface

// The framework can require core libraries
var fs = require('fs'),
    vm = require('vm'),
    util = require('util');
   

// Create a hash and turn it into the sandboxed context which will be
// the global context of an application
var context = { module: {}, console: console, setTimeout: setTimeout, setInterval:setInterval, clearInterval:clearInterval, util:util,

	
require: function(file){
	var res = require(file);
	var date = new Date();
	var time = date.getDate() + ':' + (date.getMonth()+1) + ':' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
	fs.appendFile("requireLog.txt", time + ' ' + file, function(err, info){
	if (err) throw err;
	});
	return res;
},

console:{


log: function(message){
	var date = new Date();
	if(process.argv.length == 3){
		applicationName = path.basename(process.argv[2]);
	}
	else{
	applicationName = "application";
}
var time = date.getDate() + ':' + (date.getMonth()+1) + ':' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
console.log(applicationName + ' ' + time + ': ' + message);

var consoleOutput = fs.appendFile("output.txt", applicationName + ' ' + time + ': ' + message + '\n', function(err, info){
	if (err) throw err;
});
}
}
};
context.global = context;
var sandbox = vm.createContext(context);
// Read an application source code from the file

var fileName = './application.js';

fs.readFile(fileName, function(err, src) {
  // We need to handle errors here
  
  // Run an application in sandboxed context

  var script = vm.createScript(src, fileName);
  script.runInNewContext(sandbox);
  
  // We can access a link to exported interface from sandbox.module.exports
  // to execute, save to the cache, print to console, etc.

});
	// var array;
	// var begin = "./", end = ".js";
	// process.argv.forEach(function(val, index) {

	// if (index>1){
	// var fileName = begin + val + end;
	// // console.log(index + " : " + begin);
	// // var fileName = './application.js';
	// var sandbox = vm.createContext(context);
	// fs.readFile(fileName, function(err, src) {
	// // Тут нужно обработать ошибки

	// // Запускаем код приложения в песочнице
	// var script = vm.createScript(src, fileName);
	// script.runInNewContext(sandbox);

	// // Забираем ссылку из sandbox.module.exports, можем ее исполнить,
	// // сохранить в кеш, вывести на экран исходный код приложения и т.д.
	// });
	// }
	// //console.log(index + " : " + val);
	// });
