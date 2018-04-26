var MaterialEditor = function(){
	var self = this;

	var container = document.getElementById('material_preview');

	var unitContainer = document.getElementById('units_container');
	
	var app = new PIXI.Application({width: document.getElementById('container').clientWidth, height: document.getElementById('container').clientHeight});
	app.renderer.backgroundColor = 0x555555;
	//Add the canvas that Pixi automatically created for you to the HTML document
	document.getElementById('container').appendChild(app.view);

	var camera, scene, renderer;


	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( container.clientWidth, container.clientHeight );

	var clearColor = new THREE.Color(0, 0, 0);
	renderer.setClearColor(clearColor);

	this.renderer = renderer;

	container.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 45, container.clientWidth / container.clientHeight, 1, 2000 );
	
	camera.position.z = 10;
	camera.lookAt(0,0,0);

	var controls = new THREE.TrackballControls( camera , container);

	controls.rotateSpeed = 3.0;

	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;

	scene = new THREE.Scene();

	var geometry = new THREE.SphereBufferGeometry( 3, 32, 32 );
	var material = new THREE.MeshStandardMaterial( {color: 0xffffff} );
	var sphere = new THREE.Mesh( geometry, material );
	scene.add( sphere );

	this.cubeRenderTarget;

	function createTextureCube( cubeTextureLoader, rootPath, ext ) {
		var urls = [
			rootPath + "px." + ext, rootPath + "nx." + ext,
			rootPath + "py." + ext, rootPath + "ny." + ext,
			rootPath + "pz." + ext, rootPath + "nz." + ext,
		];
		var textureCube = cubeTextureLoader.load( urls , function(cubeMap){

			var pmremGenerator = new THREE.PMREMGenerator( cubeMap );
			pmremGenerator.update( renderer );

			var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker( pmremGenerator.cubeLods );
			pmremCubeUVPacker.update( renderer );

			self.cubeRenderTarget = pmremCubeUVPacker.CubeUVRenderTarget;
			self.cubeRenderTarget.encoding = THREE.RGBM16Encoding;

			cubeMap.dispose();
			pmremGenerator.dispose();
			pmremCubeUVPacker.dispose();

			material.envMap = self.cubeRenderTarget.texture;
			material.needsUpdate = true;
		});

		textureCube.format = THREE.RGBFormat;
		textureCube.mapping = THREE.CubeReflectionMapping;
		//textureCube.generateMipmaps = false;
		return textureCube;
	}

	var cubeTextureLoader = new THREE.CubeTextureLoader();

	this.textureCube = createTextureCube(cubeTextureLoader, './cube/pisa/', 'png');

	scene.background = this.textureCube;

	function animate() {
		requestAnimationFrame( animate );
		controls.update();
		renderer.render( scene, camera );
	}
	animate();

	var units = new MaterialUnitToolBar(unitContainer, app);
}

var materialEditor;
window.onload = function(){
	materialEditor = new MaterialEditor();

}