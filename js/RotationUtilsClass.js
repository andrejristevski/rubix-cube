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

}