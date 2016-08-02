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
			var bp = 0;
			var pickedPoint = pickInfo.pickedPoint;
			face = rotationUtils.getFace(pickedPoint);

			var bp = 0;
			p1.x = evt.x;
			p1.y = evt.y;

			setTimeout(function() {
				camera.detachControl(canvas);
			}, 0);
		}
	}

	function onPointerUp() {
		isCubePressed = false;

		camera.attachControl(canvas, true);
		var bp = 0;
	}
	// TODO
	function onPointerMove(evt) {
		var bp = 0;
		if (isCubePressed) {
			isCubePressed = false;
			var p2 = {
				x : evt.x,
				y : evt.y
			}
			setTimeout(function() {

				var direction = getDirection(p1, p2);

				cube.rotateLayer(direction, face, 1);
			}, 10);
			//

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