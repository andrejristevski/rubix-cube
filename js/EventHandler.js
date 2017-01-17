/*example of quaternions
 * 	var rotationQuaternion = BABYLON.Quaternion.RotationAxis(
 new BABYLON.Vector3(1, 0, 0), Math.PI /2);
 var end = cubeMesh.rotationQuaternion.multiply(rotationQuaternion);
 cubeMesh.rotationQuaternion = end;
 */
function EventHandler(canvas, window, cube, scene, camera, rotationUtils) {

	var cubeMesh = cube.getControl();

	var canRotate = true;
	var isCubePressed = false;
	var firstClick = null;
	var p1 = {};
	var face = Faces.FRONT;
	var v1 = new BABYLON.Vector2(0, 0);
	var zq = null;
	var rotationAxis = null;
	var angleSoFar = 0;

	var rotg = {};
	rotg.x = 0;
	rotg.y = 0;
	rotg.z = 0;

	var mouseMoveControl = true;

	var startQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(0, 0, 0);
	cubeMesh.rotationQuaternion = startQuaternion;
	console.log("start " + startQuaternion.toEulerAngles());

	var sp = null;
	var ep = null;

	function getDirection(p1, p2) {

		if (p1.x < p2.x) {
			// console.log('desno');
			return Direction.RIGHT;
		}
		if (p1.x > p2.x) {
			// console.log('levo');
			return Direction.LEFT;
		}
		if (p1.y < p2.y) {
			// console.log('dolu');
			return Direction.DOWN;
		}
		if (p1.y > p2.y) {
			// console.log('gore');
			return Direction.UP;
		}

	}

	function onPointerDown(evt) {

		var pickInfo = scene.pick(scene.pointerX, scene.pointerY);
		if (pickInfo.hit) {
			isCubePressed = true;
			var bp = 0;
			var pickedPoint = pickInfo.pickedPoint;
			sp = new BABYLON.Vector3(pickedPoint.x, pickedPoint.y,
					pickedPoint.z);
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

		finishRotation();
		rotationAxis = null;
		angleSoFar = 0;
	}
	// TODO
	function onPointerMove(evt) {
		var bp = 0;

		if (rotationAxis != null) {
			cubeMesh.rotate(rotationAxis, Math.PI / 100, BABYLON.Space.WORLD);
			console.log('mouse move ' + rotationAxis);
			angleSoFar += Math.PI / 100;
		}

		if (isCubePressed) {
			isCubePressed = false;
			var p2 = {
				x : evt.x,
				y : evt.y
			}

			if (rotationAxis == null) {

				var pickInfo = scene.pick(scene.pointerX, scene.pointerY);

				var ep = pickInfo.pickedPoint;

				// console.log(" x sp " + sp.x + " " + sp.y + " " + sp.z);
				var bp = 0;

				var razlika = ep.subtract(sp);

				var minDir = rotationUtils.getAxisDirection(razlika);

				var face = rotationUtils.getFace(razlika);
				// console.log(minDir);
				// console.log("v*s " + minDir.scale(Math.PI / 2));

				var rot = minDir.scale(Math.PI / 2);
				if (rotationAxis == null) {
					rotationAxis = minDir;
				}
				angleSoFar += Math.PI / 100;
				console.log('angle so far ' + angleSoFar);

				cubeMesh.rotate(minDir, Math.PI / 100, BABYLON.Space.WORLD);

			}

		}
	}

	function finishRotation() {
		var remAngle = (Math.PI / 2) - angleSoFar;
		cubeMesh.rotate(rotationAxis, remAngle, BABYLON.Space.WORLD);
		console.log('mouse up ' + rotationAxis);
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
		case 90:
			cubeMesh.rotationQuaternion = zq;
			break;
		case 66: // b
			// cubeMesh.rotation.x += Math.PI / 2;
			cubeMesh.rotate(BABYLON.Axis.X, Math.PI / 2, BABYLON.Space.WORLD);
			break;
		case 77: // m
			// cubeMesh.rotation.z += Math.PI / 2;
			cubeMesh.rotate(BABYLON.Axis.Z, Math.PI / 2, BABYLON.Space.WORLD);
			break;
		case 78: // n
			// cubeMesh.rotation.y += Math.PI / 2;
			cubeMesh.rotate(BABYLON.Axis.Y, Math.PI / 2, BABYLON.Space.WORLD);
			break;

		77, 78, 66
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