// File contains a small piece of the source to demonstrate main module
// of a sample application to be executed in the sandboxed context by
// another pice of code from `framework.js`. Read README.md for tasks.

// Print from the global context of application module
console.log('From application global context');

var timer = setInterval(function () { console.log('hello')}, 1000);

setTimeout(function () { console.log('hello')
clearInterval(timer)
}, 5000);

util.log();
util.print('abc');
util.isArray(timer);

module.exports = function() {
	// Print from the exported function context
	

  console.log('From application exported function');
};

