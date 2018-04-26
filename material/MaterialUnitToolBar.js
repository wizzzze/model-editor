var units  = [
	LerpUnit, MultiplyUnit, ParamUnit, TextureUnit
]

var MaterialUnitToolBar = function(container, app){
	this.container = container;
	this.app = app;
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
			var unit = new unitConstruct();
			unit.createDom(self.app);
		}
	}
}