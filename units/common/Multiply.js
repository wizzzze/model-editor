var multiplyCount = 0;

var MultiplyUnit = function(){
	Unit.call(this);

	this.name = 'multiplyUnit_'+ multiplyCount;
	multiplyCount++;
	this.shaderOutputed = false;
	this.width = 140;
	this.height = 90;

	this.input = [
		{ name : 'A', type : GENTYPE },
		{ name : 'B', type : GENTYPE },
	];

	this.output = [  ];
}

MultiplyUnit.prototype = Object.create( Unit.prototype );
MultiplyUnit.prototype.constructor = MultiplyUnit;

MultiplyUnit.prototype.setInput = function(a, b){
	this.a = units[a];
	this.b = units[b];

	if(this.a.outputType != FLOAT && this.b.outputType != FLOAT){
		throw "MultiplyUnit : A and B must have one float type";
	}
	if(this.a.outputType == FLOAT){
		this.outputType = this.b.outputType;
	}else{
		this.outputType = this.a.outputType;
	}
};

MultiplyUnit.prototype.getShader = function(){
	var shader = [];
	var uniform = [];
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
	valueb = this.b.unit.name;

	if(this.a.inputChannel){
		valueA += '.'+this.a.inputChannel;
	}
	if(this.b.inputChannel){
		valueB += '.'+this.b.inputChannel;
	}

	shader.push(this.outputType + ' ' + this.name + ' = ' + valueA + ' * ' + valueB);
	return {
		uniform : uniform.join("\n"),
		shader : shader.join("\n"),
	};
}
