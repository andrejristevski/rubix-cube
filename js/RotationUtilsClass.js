class RotationUtils {

    constructor() {
    }

    static getFace(point) {

        var np = point.normalize();

        var px = Math.abs(BABYLON.Vector3.Dot(BABYLON.Axis.X, np));
        var py = Math.abs(BABYLON.Vector3.Dot(BABYLON.Axis.Y, np));
        var pz = Math.abs(BABYLON.Vector3.Dot(BABYLON.Axis.Z, np));

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
    static getAxisDirection(point, face) {

        var np = point.normalize();

        var px = Math.abs(BABYLON.Vector3.Dot(BABYLON.Axis.X, np));
        var py = Math.abs(BABYLON.Vector3.Dot(BABYLON.Axis.Y, np));
        var pz = Math.abs(BABYLON.Vector3.Dot(BABYLON.Axis.Z, np));

        var min = Math.min(px, py, pz);
        if (min == px) {
            if (face === Faces.RIGHT) {

                if (Math.max(py, pz) == py) {
                    if (point.y < 0) {
                        return BABYLON.Axis.Z.negate();
                    } else {
                        return BABYLON.Axis.Z;
                    }
                    // return BABYLON.Axis.Z;
                } else {
                    if (point.z < 0) {
                        return BABYLON.Axis.Y;
                    } else {
                        return BABYLON.Axis.Y.negate();
                    }
                    // return BABYLON.Axis.Y;
                }
            } else {
                if (Math.max(py, pz) == py) {
                    if (point.y < 0) {
                        return BABYLON.Axis.Z;
                    } else {
                        return BABYLON.Axis.Z.negate();
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
            }
            // return BABYLON.Axis.X;
        }
        if (min == py) {
            if (face === Faces.TOP) {
                if (Math.max(px, pz) == px) {
                    if (point.x < 0) {
                        return BABYLON.Axis.Z;
                    } else {
                        return BABYLON.Axis.Z.negate();
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
            } else {
                if (Math.max(px, pz) == px) {
                    if (point.x < 0) {
                        return BABYLON.Axis.Z.negate();
                    } else {
                        return BABYLON.Axis.Z;
                    }
                    // return BABYLON.Axis.Z;
                } else {
                    if (point.z < 0) {
                        return BABYLON.Axis.X;
                    } else {
                        return BABYLON.Axis.X.negate();
                    }
                    // return BABYLON.Axis.X;
                }
            }

            // return BABYLON.Axis.Y;
        }
        if (min == pz) {
            if (face === Faces.FRONT) {
                if (Math.max(py, px) == py) {
                    if (point.y < 0) {
                        return BABYLON.Axis.X.negate();
                    } else {
                        return BABYLON.Axis.X;
                    }
                    // return BABYLON.Axis.X;
                } else {
                    if (point.x < 0) {
                        return BABYLON.Axis.Y;
                    } else {
                        return BABYLON.Axis.Y.negate();
                    }
                    // return BABYLON.Axis.Y;
                }
            } else {
                if (Math.max(py, px) == py) {
                    if (point.y < 0) {
                        return BABYLON.Axis.X;
                    } else {
                        return BABYLON.Axis.X.negate();
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


    }

    static getRotationMatrix(axis) {

        let rotX = [[1, 0, 0], [0, 0, -1], [0, 1, 0]];
        let rotY = [[0, 0, 1], [0, 1, 0], [-1, 0, 0]];
        let rotZ = [[0, -1, 0], [1, 0, 0], [0, 0, 1]];

        let negativeRotX = [[1, 0, 0], [0, 0, 1], [0, -1, 0]];
        let negativeRotY = [[0, 0, -1], [0, 1, 0], [1, 0, 0]];
        let negativeRotZ = [[0, 1, 0], [-1, 0, 0], [0, 0, 1]];

        let mat = null;

        if (axis.equals(BABYLON.Axis.Z.negate())) {
            mat = negativeRotZ;
        } else if (axis.equals(BABYLON.Axis.Z)) {
            mat = rotZ;
        } else if (axis.equals(BABYLON.Axis.X.negate())) {
            mat = negativeRotX;
        } else if (axis.equals(BABYLON.Axis.X)) {
            mat = rotX;
        } else if (axis.equals(BABYLON.Axis.Y.negate())) {
            mat = negativeRotY;
        } else if (axis.equals(BABYLON.Axis.Y)) {
            mat = rotY;
        }

        return mat;
    }

    staticgetCubixOrder(cubix, axis, map) {

        let mat = RotationUtils.getRotationMatrix(axis);

        var prevPos = cubix.prevPosition;

        xcal = prevPos.x * mat[0][0] + prevPos.y * mat[0][1] + prevPos.z * mat[0][2];
        ycal = prevPos.x * mat[1][0] + prevPos.y * mat[1][1] + prevPos.z * mat[1][2];
        zcal = prevPos.x * mat[2][0] + prevPos.y * mat[2][1] + prevPos.z * mat[2][2];

        var newPos = new BABYLON.Vector3(getRounded(xcal), getRounded(ycal), getRounded(zcal));
        cubix.prevPosition = newPos;

        // let {x, y, z} = getMapElement(newPos.x, newPos.y, newPos.z, map);

        return {
            x: newPos.x,
            y: newPos.y,
            z: newPos.z
        }
    }

}