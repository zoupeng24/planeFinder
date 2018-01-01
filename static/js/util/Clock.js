define(function(require, exports, module){

	var Clock = function(cb){
		this.seconds = 0;
		this.time = null;
		that = this;
		this.callback = cb;
	}

	Clock.prototype = {
		
		count : function() {
			that.seconds ++;
			typeof that.callback === 'function' && that.callback();
		},

		start : function() {
			this.seconds = 0;
			this.time = setInterval(this.count, 1000);
		},

		stop : function() {
			clearInterval(this.time);
		}
	}
		
	module.exports = Clock;
});

