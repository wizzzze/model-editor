var ModelEditor = function(){

	var self = this;

	var container = document.getElementById('container');
	console.log(container);
	var camera, scene, renderer;


	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( container.clientWidth, container.clientHeight );

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
	var clearColor = new THREE.Color(0, 0, 0);
	renderer.setClearColor(clearColor);

	this.renderer = renderer;

	container.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
	camera.position.x = 30;
	camera.position.y = 10;
	camera.position.z = 30;
	camera.lookAt(0,0,0);


	var controls = new THREE.EditorControls(camera, renderer.domElement);

	scene = new THREE.Scene();


	var light = new THREE.HemisphereLight( 0xffffff, 0xaaaaaa, 1 );
	scene.add( light );

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
		});

		textureCube.format = THREE.RGBFormat;
		textureCube.mapping = THREE.CubeReflectionMapping;
		//textureCube.generateMipmaps = false;
		return textureCube;
	}

	var cubeTextureLoader = new THREE.CubeTextureLoader();

	this.textureCube = createTextureCube(cubeTextureLoader, './cube/pisa/', 'png');

	scene.background = this.textureCube;

	this.scene = scene;

	function animate() {
		requestAnimationFrame( animate );
		renderer.render( scene, camera );
	}
	animate();

	window.addEventListener( 'resize', function(){

		renderer.setSize( container.clientWidth, container.clientHeight );

		camera.aspect = container.clientWidth / container.clientHeight;
		camera.updateProjectionMatrix();
	}, false );


	this.modelInput = document.createElement('input');
	this.modelInput.type = 'file';

	this.modelInput.onchange = function(){
		var file = this.files[0];
		var fileName = file.name;
		var ext = (fileName.split('.')).pop();
		if(ext.toLowerCase() == 'fbx'){
			var model = self.readFile(file, function(data){
				self.readFbxFile(data);
			});
		}else if(ext.toLowerCase() == 'obj'){
			var model = self.readFile(file, function(data){
				self.readObjFile(data);
			});
		}
	}

	this.reader = new FileReader();
}

ModelEditor.prototype = {
	clear : function(){
		var scene = this.scene;
		var child;
		for(var i = 0 , l = scene.children.length; i < l; i++){
			child = scene.children[i];
			scene.remove(child);
		}	
	},
	addToScene : function(model){
		if(model instanceof THREE.Group && model.children.length == 1){
			model = model.children[0];
		}else if( ! model instanceof THREE.Mesh){
			throw 'It\'s not a mesh or group';
		}
		console.log(model);
		model.material.envMap = this.cubeRenderTarget.texture;
		model.material.needsUpdate = true;

		model.geometry.computeBoundingSphere();

		var center = model.geometry.boundingSphere.center;

		var radius = model.geometry.boundingSphere.radius;
		model.scale.multiplyScalar( 20 /(20 + radius ));

		model.geometry.computeBoundingSphere();
		model.geometry.computeBoundingBox();

		this.initSettingPanel();

		this.scene.add(model);
	},

	initSettingPanel : function(){
		
	},
	bindEvent : function(){

	},
	upload : function(){
		
	},
	readFile : function(file, callback){
		this.reader.readAsArrayBuffer(file);
		this.reader.onprogress = function(progress){
			console.log(progress);
		};
		this.reader.onload = function(data){
			var arrayBuffer = data.target.result;
			callback(arrayBuffer);
		};
		this.reader.onerror = function(e){
			console.log(e);
		}
	},
	readFbxFile : function(data){
		console.log(data);
		var loader = new THREE.FBXLoader();
		var object = loader.parse( data );
		this.addToScene(object);
	},
}

var modelEditor = new ModelEditor();