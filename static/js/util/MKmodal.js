define(function(require, exports, module){

	var $ = require('jquery');

	var MKmodal = function(){
		this.underlayBackground = 'rgba(0,0,0,0.3)';
		this.underlayId = 'MKmodalUnderlay';
		this.underlayClassName = 'MKmodalUnderlay';
		this.contentClassName = 'MKmodalContent';
		this.contentDefaultHtml = '<img id="waitImg" src="static/images/loader.gif">';
	};

	MKmodal.prototype = {
		show : function(html){
			var contentHTML = html ? html : this.contentDefaultHtml;
			
			$("body").append('<div id="' + this.underlayId 
						+ '" class="' + this.underlayClassName 
						+ '" style="background:' + this.underlayBackground 
						+ ';" ></div>');

			
			$("#" + this.underlayId).append(contentHTML);

		}	
	};
		
	module.exports = MKmodal;
});

