var ShaderBuilder = function(data, units){
	this.data = data;
}


ShaderBuilder.prototype = {
	getDiffuse : function(){
		var diffuseMap = this.data.diffuse;
		var unit = this.data.diffuse.unit;

		var data = unit.getShader();
		var shader = data.shader + "\ngl_FragColor = " + unit.name;
		var uniform = data.uniform;

		return this.build(uniform, shader);
	},


	build : function(uniform, shader){
		var fragementShader ;

		fragementShader = [ ShaderLib.head ];
		fragementShader.push(uniform);

		fragementShader.push('void main(){');

		fragementShader.push(shader);

		fragementShader.push('}');

		fragementShader = fragementShader.join("\n");

		return fragementShader;
	}
}