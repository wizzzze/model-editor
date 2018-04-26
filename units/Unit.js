var FLOAT = 'float';
var VEC2 = 'vec2';
var VEC3 = 'vec3';
var VEC4 = 'vec4';
var MAT3 = 'mat3';
var MAT4 = 'mat4';



var Unit = function(name){
	this.name = name;

}

Unit.prototype = {

	createDom : function(){
		this.dom = document.createElement('div');
		this.dom.draggable = true;
		this.dom.id = this.name + '_dom';

		var header = document.createElement('div');
		header.classList.add('unit_header');
		header.innerText = this.name;
		
		this.dom.appendChild(header);

		this.dom.unit = this;

		this.dom.ondragstart = function(e){
			e.dataTransfer.setData('Text', this.id);
		}



	}
}

Unit.extend = function(object){
	console.log(this.prototype);
	for(var i in Unit.prototype){
		object.prototype[i] = function(){};
	}
}
