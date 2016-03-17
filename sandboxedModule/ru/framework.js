// Example showing us how the framework creates an environment (sandbox) for
// appication runtime, load an application code and passes a sandbox into app
// as a global context and receives exported application interface

// The framework can require core libraries
var fs = require('fs'),
    vm = require('vm'),
    util = require('util');

// Create a hash and turn it into the sandboxed context which will be
// the global context of an application
var context = { module: {}, console: console, setTimeout: setTimeout, setInterval:setInterval, clearInterval:clearInterval, util:util };
context.global = context;
var sandbox = vm.createContext(context);
// Read an application source code from the file


var array;
var begin = "./", end = ".js";
process.argv.forEach(function(val, index) {

if (index>1){
var fileName = begin + val + end;
// console.log(index + " : " + begin);
// var fileName = './application.js';
var sandbox = vm.createContext(context);
fs.readFile(fileName, function(err, src) {
// Тут нужно обработать ошибки

// Запускаем код приложения в песочнице
var script = vm.createScript(src, fileName);
script.runInNewContext(sandbox);

// Забираем ссылку из sandbox.module.exports, можем ее исполнить,
// сохранить в кеш, вывести на экран исходный код приложения и т.д.
});
}



});
