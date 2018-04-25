var TextureUnit = function(name){
	this.name = name;
	this.onload = false;
	this.outputType = VEC4;
	this.shaderOutputed = false;
}

TextureUnit.prototype = {
	setInput : function(image){
		var url;
		if(image instanceof Image){
			url = image.src;
		}else if(image instanceof String){
			url = image;
		}
		var self = this;
		this.texture = new THREE.TextureLoader().load( url , function(){
			self.onload = true;
		});
	},

	getOutput : function(){
		if(this.onload)
			return this.texture;
		else
			throw "TextureUnit " + this.name + ' still on progress';
	},

	getShader : function(){
		var uniform = 'uniform sampler2D ' + this.name + '_sampler;';
		var shader = 'vec4 texture2D('+ this.name + '_sampler, vUv)';
		this.shaderOutputed = false;
		return {
			unifrom : uniform,
			shader : shader,
		};
	}
}

