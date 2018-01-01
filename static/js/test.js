define(function(require) {

	var $ = require("jquery");

	$(document).ready(function(){
		
		var MKmodal = require("./util/MKmodal");

		console.log()

		var mkModal = new MKmodal();
		mkModal.show();
	});
})
