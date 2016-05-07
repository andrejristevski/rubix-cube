function RotationUtils() {

	function getFace(point) {

		var xAxes = new BABYLON.Vector3(1, 0, 0);
		var yAxes = new BABYLON.Vector3(0, 1, 0);
		var zAxes = new BABYLON.Vector3(0, 0, 1);

		var np = point.normalize();

		var px = Math.abs(BABYLON.Vector3.Dot(xAxes, np));
		var py = Math.abs(BABYLON.Vector3.Dot(yAxes, np));
		var pz = Math.abs(BABYLON.Vector3.Dot(zAxes, np));

		var max = Math.max(px, py, pz);

		if (max == px) {
			if (point.x > 0) {
				return Faces.RIGHT;
			} else {
				return Faces.LEFT;
			}
		}
		if (max == py) {
			if (point.y > 0) {
				return Faces.TOP;
			} else {
				return Faces.BOTTOM;
			}
		}
		if (max == pz) {
			if (point.z > 0) {
				return Faces.BACK;
			} else {
				return Faces.FRONT;
			}
		}

	}

	return {

		getFace : getFace
	}

}
