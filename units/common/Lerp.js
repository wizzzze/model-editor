var lerpCount = 0;
var LerpUnit = function(){
	this.name = 'MultiplyUnit_'+ lerpCount;
	lerpCount++;

	this.shaderOutputed = false;
}


LerpUnit.prototype = {
	setInput : function(a, b, alpha){
		this.a = units[a];
		this.b = units[b];
		this.alpha = units[alpha];
		if(this.a.inputType != this.b.inputType){
			throw 'LerpUnit : A and B shoud input the same type';
		}
		this.outputType = this.a.inputType;
	},

	getShader : function(){
		var shader = [];
		var uniform = []
		var valueA, valueB;

		if(!this.a.unit.shaderOutputed){
			var unitShaderA = this.a.unit.getShader();
			shader.push(unitShaderA.shader);
			if(unitShaderA.uniform) uniform.push(unitShaderA.uniform);
		}
		if(!this.b.unit.shaderOutputed){

			var unitShaderB = this.b.unit.getShader();
			shader.push(unitShaderB.shader);
			if(unitShaderB.uniform) uniform.push(unitShaderB.uniform);
		}
		
		valueA = this.a.unit.name;
		valueB = this.b.unit.name;

		if(this.a.inputChannel){
			valueA += '.'+this.a.inputChannel;
		}
		if(this.b.inputChannel){
			valueB += '.'+this.b.inputChannel;
		}

		shader.push(this.outputType + ' ' + this.name + ' = mix( ' + valueA + ', ' + valueB + ', ' + this.alpha.unit.name + ' )');
		this.shaderOutputed = true;

		return {
			uniform : uniform.join("\n");
			shader : shader.join("\n");
		};
}