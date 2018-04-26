var ParamUnit = function(name){
	this.name = name;
	this.shaderOutputed = false;
}

ParamUnit.prototype = {
	setInput : function(value){
		this.value = value;
	},
	getOutput : function(){
		return this.value;
	},

	getShader : function(){
		var shader = 'float '+ this.name + ' = ' + this.value;
		this.shaderOutputed = true;
		return { shader : shader };
	}
}