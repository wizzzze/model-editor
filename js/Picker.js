var Picker = function(container, scene, camera){
	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();


	container.addEventListener('click', function(event){
		mouse.x = ( event.offsetX / container.clientWidth ) * 2 - 1;
		mouse.y = - ( event.offsetY / container.clientHeight ) * 2 + 1;

		raycaster.setFromCamera( mouse, camera );
		var intersects = raycaster.intersectObjects( scene.children );

		console.log(intersects);
	})

}