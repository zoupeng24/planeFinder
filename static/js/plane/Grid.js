define(function(require, exports, module){

	var Grid = function(ordinate, abscissa, setable){
		this.ordinate = ordinate;
		this.abscissa = abscissa;
		this.setable = setable ? setable : false;
		this.hurted = false;
	}

	Grid.prototype = {

		setOrdinate : function(ordinate){
			this.ordinate = ordinate;
		},

		setAbscissa : function(abscissa){
			this.abscissa = abscissa;
		},

		setHurted : function(hurted){
			this.hurted = hurted ? true : false;
		}
	}

	module.exports = Grid;

});
