function EventHandler(canvas, window, cube, scene, camera, rotationUtils) {

	var cubeMesh = cube.getControl();

	var canRotate = true;
	var isCubePressed = false;
	var firstClick = null;
	var p1 = {};
	var face = Faces.FRONT;
	var v1 = new BABYLON.Vector2(0, 0);

	function getDirection(p1, p2) {

		if (p1.x < p2.x) {
			console.log('desno');
			return Direction.RIGHT;
		}
		if (p1.x > p2.x) {
			console.log('levo');
			return Direction.LEFT;
		}
		if (p1.y < p2.y) {
			console.log('dolu');
			return Direction.DOWN;
		}
		if (p1.y > p2.y) {
			console.log('gore');
			return Direction.UP;
		}

	}

	function onPointerDown(evt) {

		var pickInfo = scene.pick(scene.pointerX, scene.pointerY);
		if (pickInfo.hit) {
			isCubePressed = true;

			var pickedPoint = pickInfo.pickedPoint;
			face = rotationUtils.getFace(pickedPoint);
			v1 = new BABYLON.Vector2(evt.x, evt.y);
			v1 = pickedPoint;
			p1.x = evt.x;
			p1.y = evt.y;

			setTimeout(function() {
				camera.detachControl(canvas);
			}, 0);
		}
	}

	function onPointerUp() {
		isCubePressed = false;
		canRotate = false;
		camera.attachControl(canvas, true);
		var bp = 0;
	}
	// TODO
	function onPointerMove(evt) {

		if (isCubePressed) {
			if (canRotate) {
				canRotate = false;
				var p2 = {
					x : evt.x,
					y : evt.y
				}
				var pickInfo = scene.pick(scene.pointerX, scene.pointerY);
				v2 = new BABYLON.Vector2(evt.x, evt.y);
				v2=pickInfo.pickedPoint;
				var v3 = v2.subtract(v1);
				var bp = 0;
				setTimeout(function() {
					var direction = getDirection(p1, p2);

					cube.rotateLayer(direction, 1, 1);
					//

				}, 1000)

			}
		}

	}

	function onKeyDown(evt) {
		var currentEnding = -1;

		// chrome
		switch (evt.keyCode) {
		case 82: // 'r'
			cubeMesh.rotation.x = 0;
			cubeMesh.rotation.y = 0;
			cubeMesh.rotation.z = 0;
			break;
		case 67: // 'c'
			camera.setTarget(BABYLON.Vector3.Zero());
			camera.setPosition(new BABYLON.Vector3(14, 54, -82));
			break;
		case 'l': // 'E'
			cube.rotateLayer();
			break;
		}
	}

	canvas.addEventListener("pointerdown", onPointerDown, false);
	canvas.addEventListener("pointerup", onPointerUp, false);
	canvas.addEventListener("pointermove", onPointerMove, false);
	window.addEventListener("keydown", onKeyDown);

	scene.onDispose = function() {
		canvas.removeEventListener("pointerdown", onPointerDown);
		canvas.removeEventListener("pointerup", onPointerUp);
		canvas.removeEventListener("pointermove", onPointerMove);
	}

}