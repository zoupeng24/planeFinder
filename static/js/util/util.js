define(function(require, exports, module){

	var util = {
		randomInt : function(maximum, minimum) {
			return parseInt(Math.random() * (maximum - minimum - 1)) + minimum;
		}
	}
		
	module.exports = util;
});

