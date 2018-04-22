var ModelEditor = function(container){
	container = container | document.getElementById('container');
	var camera, scene, renderer;


	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( container.clientWidth, container.clientHeight );

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
	var clearColor = new THREE.Color(0, 0, 0);
	renderer.setClearColor(clearColor);

	container.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.x = 10;
	camera.position.y = 10;
	camera.position.z = 10;
	camera.lookAt(0,0,0);	
}

ModelEditor.prototype = {
	upload : function(){
		
	}
}

var modelEditor = new ModelEditor();