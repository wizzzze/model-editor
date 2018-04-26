var units  = [
	LerpUnit, MultiplyUnit, ParamUnit, TextureUnit
]

var MaterialUnitToolBar = function(unitContainer){
	
	this.container = document.getElementById('units_container');
	this.unitContainer = unitContainer;
	for(var i = 0, l = units.length; i < l; i++){
		this.getUnitBtn(units[i]);
	}
}


MaterialUnitToolBar.prototype = {
	getUnitBtn : function(unitConstruct){
		var self = this;
		var btn = document.createElement('a');
		btn.innerText = unitConstruct.name;
		this.container.appendChild(btn);
		btn.onclick = function(){
			console.log(unitConstruct);
			var unit = new unitConstruct();
			console.log(unit);
			self.unitContainer.appendChild(unit.dom);
		}	
	}
}