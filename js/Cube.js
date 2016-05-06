function Cube(scene, n, partSize, offset) {

	this.cube = new BABYLON.Mesh.CreateBox("cube", 1, scene);
	this.cube.isVisible = false;

	this.cubicls = [];
	this.scene = scene;
	this.n = n;
	this.partSize = partSize;

	this.createCubix(this.scene, this.n, this.partSize, this.cube, offset);
	this.centerTheCubiclsAroundCube(n, partSize, offset);

	// this.colorTheFaces(null, this.cubicls, this.scene);
}
//
// Cube.prototype=(function{
//	
// return {}
// })();

Cube.prototype.getControl = function() {
	return this.cube;
}

Cube.prototype.centerTheCubiclsAroundCube = function(n, partSize, offset) {

	// returns the center of the cube
	function getCenter() {
		var totalSideLength = n * partSize + (n - 1) * offset;
		var halfSide = totalSideLength / 2;

		var center = new BABYLON.Vector3(halfSide - partSize / 2, halfSide
				- partSize / 2, halfSide - partSize / 2);

		return center;
	}

	var center = getCenter();
	var cubicls = this.cubicls;

	for (var i = 0; i < cubicls.length; i++) {
		var cubix = cubicls[i];
		cubix.position = cubix.position.subtract(center);

	}
	var bp = 0;

};

Cube.prototype.createCubix = function(scene, n, partSize, parent, offset) {

	for (var i = 0; i < n; i++) {
		for (var j = 0; j < n; j++) {
			for (var k = 0; k < n; k++) {

				var faceColors = [];

				faceColors[0] = new BABYLON.Color3(1, 0, 0); // red
				faceColors[1] = new BABYLON.Color3(0, 1, 0); // green
				faceColors[2] = new BABYLON.Color3(0, 0, 1); // blue
				faceColors[3] = new BABYLON.Color3(0, 1, 1); // //svetlo sino
				// zeleno
				faceColors[4] = new BABYLON.Color3(1, 1, 0); // yellow
				faceColors[5] = new BABYLON.Color3(1, 0, 1); // rozeva

				var options = {
					width : partSize,
					height : partSize,
					depth : partSize,
					faceColors : faceColors
				};
				var cubicl = BABYLON.MeshBuilder.CreateBox("cubcl" + i + j + k,
						options, scene);
				// var cubicl = new BABYLON.Mesh.CreateBox("cubcl" + i + j + k,
				// options, scene);

				cubicl.i = i;
				cubicl.j = j;
				cubicl.k = k;

				cubicl.position.x = i * (partSize + offset);
				cubicl.position.y = j * (partSize + offset);
				cubicl.position.z = k * (partSize + offset);

				cubicl.parent = parent;

				this.cubicls.push(cubicl);

			}
		}
	}
}

Cube.prototype.rotateLayer = function(direction, u, v) {
	this.cube.animations = [];
	var animation = new BABYLON.Animation("cubeAnimation", "rotation.x", 300,
			BABYLON.Animation.ANIMATIONTYPE_FLOAT,
			BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);

	if (direction == Direction.UP) {

		// Animation keys
		var keys = [];
		// At the animation key 0, the value of
		// scaling is "1"
		keys.push({
			frame : 0,
			value : this.cube.rotation.x
		});
		// At the animation key 20, the value of scaling is "0.2"
		keys.push({
			frame : 200,
			value : this.cube.rotation.x + Math.PI / 4
		});
		// At the animation key 100, the value of scaling is "1"
		keys.push({
			frame : 500,
			value : this.cube.rotation.x + Math.PI / 2
		});
		animation.setKeys(keys);
		this.cube.animations.push(animation);
		this.scene.beginAnimation(this.cube, 0, 500, false);
	}

	if (direction == Direction.DOWN) {
		// Animation keys
		var keys = [];
		// At the animation key 0, the value of
		// scaling is "1"
		keys.push({
			frame : 0,
			value : -this.cube.rotation.x
		});
		// At the animation key 20, the value of scaling is "0.2"
		keys.push({
			frame : 200,
			value : (this.cube.rotation.x - Math.PI / 4)
		});
		// At the animation key 100, the value of scaling is "1"
		keys.push({
			frame : 500,
			value : (this.cube.rotation.x - Math.PI / 2)
		});
		animation.setKeys(keys);
		this.cube.animations.push(animation);
		this.scene.beginAnimation(this.cube, 0, 500, false);
	}

	if (direction == Direction.LEFT) {
		var animation = new BABYLON.Animation("cubeAnimation", "rotation.y",
				300, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
				BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
		// Animation keys
		var keys = [];
		// At the animation key 0, the value of
		// scaling is "1"
		keys.push({
			frame : 0,
			value : this.cube.rotation.y
		});
		// At the animation key 20, the value of scaling is "0.2"
		keys.push({
			frame : 200,
			value : (this.cube.rotation.y + Math.PI / 4)
		});
		// At the animation key 100, the value of scaling is "1"
		keys.push({
			frame : 500,
			value : (this.cube.rotation.y + Math.PI / 2)
		});
		animation.setKeys(keys);
		this.cube.animations.push(animation);
		this.scene.beginAnimation(this.cube, 0, 500, false);
	}

	if (direction == Direction.RIGHT) {
		var animation = new BABYLON.Animation("cubeAnimation", "rotation.y",
				300, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
				BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE);
		// Animation keys
		var keys = [];
		// At the animation key 0, the value of
		// scaling is "1"
		keys.push({
			frame : 0,
			value : this.cube.rotation.y
		});
		// At the animation key 20, the value of scaling is "0.2"
		keys.push({
			frame : 200,
			value : this.cube.rotation.y - Math.PI / 4
		});
		// At the animation key 100, the value of scaling is "1"
		keys.push({
			frame : 500,
			value : this.cube.rotation.y - Math.PI / 2
		});
		animation.setKeys(keys);
		this.cube.animations.push(animation);
		this.scene.beginAnimation(this.cube, 0, 500, false);
	}

}