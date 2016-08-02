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
				// console.log("right");
				return Faces.RIGHT;
			} else {
				// console.log("left");
				return Faces.LEFT;
			}
		}
		if (max == py) {
			if (point.y > 0) {
				// console.log("Top");
				return Faces.TOP;
			} else {
				// console.log("bottom");
				return Faces.BOTTOM;
			}
		}
		if (max == pz) {
			if (point.z > 0) {
				// console.log("Back");
				return Faces.BACK;
			} else {
				// console.log("Front");
				return Faces.FRONT;
			}
		}

	}

	function getAxisDirection(point) {

		var xAxes = new BABYLON.Vector3(1, 0, 0);
		var yAxes = new BABYLON.Vector3(0, 1, 0);
		var zAxes = new BABYLON.Vector3(0, 0, 1);

		var np = point.normalize();

		var px = Math.abs(BABYLON.Vector3.Dot(xAxes, np));
		var py = Math.abs(BABYLON.Vector3.Dot(yAxes, np));
		var pz = Math.abs(BABYLON.Vector3.Dot(zAxes, np));

		var max = Math.min(px, py, pz);
		if (max == px) {
			return BABYLON.Axis.X;
		}
		if (max == py) {
			return BABYLON.Axis.Y;
		}
		if (max == pz) {
			return BABYLON.Axis.Z;
		}

	}

	return {
		getFace : getFace,
		getAxisDirection : getAxisDirection
	}

}
