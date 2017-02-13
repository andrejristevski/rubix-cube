function EventHandler(canvas, window, cube, scene, camera, rotationUtils) {

	var cubeMesh = cube.getControl();

	var canRotate = true;
	var isCubePressed = false;
	var face = Faces.FRONT;
	var rotationAxis = null;
	var angleSoFar = 0;
	var presedCubix = {};

	function onPointerDown(evt) {

		var pickInfo = scene.pick(scene.pointerX, scene.pointerY);
		if (pickInfo.hit) {

			var mesh = pickInfo.pickedMesh;

			isCubePressed = true;
			var bp = 0;
			var pickedPoint = pickInfo.pickedPoint;
			sp = new BABYLON.Vector3(pickedPoint.x, pickedPoint.y,
				pickedPoint.z);
			// face = rotationUtils.getFace(pickedPoint);
			face = RotationUtils.getFace(pickedPoint);

			presedCubix.i = mesh.ci;
			presedCubix.j = mesh.cj;
			presedCubix.k = mesh.ck;



			setTimeout(function () {
				camera.detachControl(canvas);
			}, 0);
		}
	}

	function onPointerUp() {
		isCubePressed = false;
		camera.attachControl(canvas, true);
		var bp = 0;
		if (rotationAxis) {

			var vec = new BABYLON.Vector3(rotationAxis.x, rotationAxis.y, rotationAxis.z);
		}

		finishRotation(vec);
		rotationAxis = null;
		angleSoFar = 0;
	}
	function onPointerMove(evt) {

		if (rotationAxis != null) {
			cube.rotate(rotationAxis, Math.PI / 100, presedCubix);
			angleSoFar += Math.PI / 100;
		}

		if (isCubePressed) {
			isCubePressed = false;

			if (rotationAxis == null) {

				var pickInfo = scene.pick(scene.pointerX, scene.pointerY);

				var ep = pickInfo.pickedPoint;

				var bp = 0;

				var razlika = ep.subtract(sp);

				var face = RotationUtils.getFace(ep);

				var minDir = RotationUtils.getAxisDirection(razlika, face);


				var rot = minDir.scale(Math.PI / 2);
				if (rotationAxis == null) {
					rotationAxis = minDir;
				}
				angleSoFar += Math.PI / 100;
				cube.rotate(minDir, Math.PI / 100, presedCubix);

			}

		}
	}

	function finishRotation(vec) {
		var remAngle = (Math.PI / 2) - angleSoFar;
		cube.finishRotation(rotationAxis, remAngle, presedCubix);
	}

	function onKeyDown(evt) {
		var currentEnding = -1;

		var evtobj = window.event ? event : evt
		if (evtobj.keyCode == 90 && evtobj.ctrlKey) {
			alert("Ctrl+z");
		}

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
			// z
			case 90:
				// cubeMesh.rotationQuaternion = zq;
				cube.printMatrixes();
				break;
			// x
			case 88:
				cube.rot();
				break;
			// v
			case 86:
				cube.setWM();
				break;
			// s
			case 83: // 'r'
				// cube.saveWM();
				cubeMesh.rotation.x += 0.1;
				break;
			case 66: // b
				// cubeMesh.rotation.x += Math.PI / 2;
				cubeMesh.rotation.y += Math.PI / 2;
				// cubeMesh.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.WORLD);
				cube.fja();
				break;
			case 77: // m
				// cubeMesh.rotation.z += Math.PI / 2;
				cubeMesh.rotate(BABYLON.Axis.Z, Math.PI / 2, BABYLON.Space.WORLD);
				break;
			case 78: // n
				// cubeMesh.rotation.y += Math.PI / 2;
				cubeMesh.rotate(BABYLON.Axis.Y, Math.PI / 2, BABYLON.Space.WORLD);
				break;

		}
	}

	canvas.addEventListener("pointerdown", onPointerDown, false);
	canvas.addEventListener("pointerup", onPointerUp, false);
	canvas.addEventListener("pointermove", onPointerMove, false);
	window.addEventListener("keydown", onKeyDown);

	scene.onDispose = function () {
		canvas.removeEventListener("pointerdown", onPointerDown);
		canvas.removeEventListener("pointerup", onPointerUp);
		canvas.removeEventListener("pointermove", onPointerMove);
		window.removeEventListener("keydown", onKeyDown);
	}

}