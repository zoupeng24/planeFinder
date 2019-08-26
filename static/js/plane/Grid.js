// 格子

define(function(require, exports, module){

	var Grid = function(ordinate, abscissa, setable){
		// 纵坐标
		this.ordinate = ordinate;
		// 横坐标
		this.abscissa = abscissa;
		// 是否可以放置
		this.setable = setable ? setable : false;
		// 是否受伤
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
