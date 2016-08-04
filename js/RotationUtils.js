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
	// this returns the axis that we need to rotate for 90 degrees
	function getAxisDirection(point) {

		console.log("razlika  " + point);
		var xAxes = new BABYLON.Vector3(1, 0, 0);
		var yAxes = new BABYLON.Vector3(0, 1, 0);
		var zAxes = new BABYLON.Vector3(0, 0, 1);

		var np = point.normalize();

		var px = Math.abs(BABYLON.Vector3.Dot(xAxes, np));
		var py = Math.abs(BABYLON.Vector3.Dot(yAxes, np));
		var pz = Math.abs(BABYLON.Vector3.Dot(zAxes, np));

		var max = Math.min(px, py, pz);
		if (max == px) {
			if (Math.max(py, pz) == py) {
				if (point.y < 0) {
					return BABYLON.Axis.Z.negate();
				} else {
					return BABYLON.Axis.Z;
				}
				// return BABYLON.Axis.Z;
			} else {
				if (point.z < 0) {
					return BABYLON.Axis.Y.negate();
				} else {
					return BABYLON.Axis.Y;
				}
				// return BABYLON.Axis.Y;
			}
			// return BABYLON.Axis.X;
		}
		if (max == py) {
			if (Math.max(px, pz) == px) {
				if (point.x < 0) {
					return BABYLON.Axis.Z.negate();
				} else {
					return BABYLON.Axis.Z;
				}
				// return BABYLON.Axis.Z;
			} else {
				if (point.z < 0) {
					return BABYLON.Axis.X.negate();
				} else {
					return BABYLON.Axis.X;
				}
				// return BABYLON.Axis.X;
			}

			// return BABYLON.Axis.Y;
		}
		if (max == pz) {
			if (Math.max(py, px) == py) {
				if (point.y < 0) {
					return BABYLON.Axis.X.negate();
				} else {
					return BABYLON.Axis.X;
				}
				// return BABYLON.Axis.X;
			} else {
				if (point.x < 0) {
					return BABYLON.Axis.Y.negate();
				} else {
					return BABYLON.Axis.Y;
				}
				// return BABYLON.Axis.Y;
			}
		}
	}

	return {
		getFace : getFace,
		getAxisDirection : getAxisDirection
	}

}
