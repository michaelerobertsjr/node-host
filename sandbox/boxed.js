var global = this;
var exports={};
(function () {
    // this code runs with the client code
    
    // copied here to pervent code from overwriting
    var get_code = __get_code;
    var exit = __process_exit;
    var compile = __process_compile;
    var loop_check = __loop_check_;

    var modules = {};
    global.require = function (name) {
	if(modules[name]) return modules[name];
	var code = get_code(name);
	if(typeof code == "string") {
	    var fn = eval("(function (exports, __context) { with(__context) { " + code + " }})");
	    modules[name]={};
	    fn(modules[name], {__server: __server, __loop_check_: loop_check, /*require: global.require,*/ __get_code: __get_code, __process_compile: __process_compile, __process_exit: __process_exit, debug: debug});
	    if(modules[name].fail) throw name + " is not to be required in";
	    return modules[name];
	}else {
	    return modules[name] = code;
	}
    };
    global.Buffer = require('buffer').Buffer;
})();
