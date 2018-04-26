var FLOAT = 'float';
var VEC2 = 'vec2';
var VEC3 = 'vec3';
var VEC4 = 'vec4';
var MAT3 = 'mat3';
var MAT4 = 'mat4';


var GENTYPE = 'gentype';

var defaultStyle = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 14,
  fill: "white",
  strokeThickness: 0,
  dropShadow: false,
});

var currentConnection = null;

var Unit = function(){

}

Unit.prototype = {

	createDom : function(app){

		this.app = app;

		var node = new PIXI.Sprite();

		var roundBox = new PIXI.Graphics();

		roundBox.lineStyle(2, 0xA7A7A7, 1);
		roundBox.beginFill(0x333333);
		roundBox.drawRoundedRect(0, 0, this.width, this.height, 10);
		roundBox.endFill();
		roundBox.x = 0;
		roundBox.y = 0;

		node.addChild(roundBox);

		var header = new PIXI.Container();

		var headerLine = new PIXI.Graphics();

		headerLine.lineStyle(2, 0xA7A7A7, 1);
		headerLine.moveTo(0, 0);
		headerLine.lineTo(this.width, 0);
		headerLine.x = 0;
		headerLine.y = 24;

		header.addChild(headerLine);


		var headerText = new PIXI.Text(this.name, defaultStyle);
		headerText.x = 10;
		headerText.y = 3;

		header.addChild(headerText);
		node.addChild(header);



		for(var i = 0, l = this.input.length; i < l; i++){
			var inputNode = this.createInputNode(this.input[i]);
			inputNode.x = 5;
			inputNode.y = i * 32 + 32;
			node.addChild(inputNode);
		}

		node.x = 10;
		node.y = 20;

		node.interactive = true;
		node.buttonMode = true;
		node.anchor.set(0.5);

		node.on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove)
        .on('click', function(){
        	console.log(this);
        })

        function onDragStart(event) {
        	console.log(event);
		    // store a reference to the data
		    // the reason for this is because of multitouch
		    // we want to track the movement of this particular touch
		    this.data = event.data;
		    this.alpha = 0.5;
		    this.dragging = true;
		}

		function onDragEnd() {
		    this.alpha = 1;
		    this.dragging = false;
		    // set the interaction data to null
		    this.data = null;
		}

		function onDragMove() {
		    if (this.dragging) {
		        var newPosition = this.data.getLocalPosition(this.parent);
		        this.x = newPosition.x;
		        this.y = newPosition.y;
		    }
		}


		app.stage.addChild(node);
	},

	createInputNode : function(input){
		var inputNode = new PIXI.Container();

		var circle = new PIXI.Graphics();
		circle.lineStyle(2, 0xA7A7A7, 1);
		circle.drawCircle(0, 0, 7);
		circle.endFill();
		circle.x = 8;
		circle.y = 8;

		circle.on('click', function(){
			if(currentConnection){

			}else{

			}
		});

		inputNode.addChild(circle);

		var label = new PIXI.Text(input.name, defaultStyle);	
		label.x = 20;
		label.y = 0;

		inputNode.addChild(label);

		return inputNode;
	}
}
