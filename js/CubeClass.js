class CubeClass {

    constructor(scene, n, partSize, offset) {

        function isThisGlobal() {
            conso.log("func called");
        }

        this.cube = new BABYLON.Mesh.CreateBox("cube", 1, scene);
        this.cube.isVisible = false;

        this.cubicls = [];
        this.wmMap = [];
        this.scene = scene;
        this.n = n;
        this.partSize = partSize;

        this.activeCubicls = [];
        this.shouldAssignCubixToParent = true;

        this.cubPosMap = new Map();
        this.revCubPosMap = new Map();


        this.createCubix(this.scene, this.n, this.partSize, this.cube, offset);
        this.centerTheCubiclsAroundCube(n, partSize, offset);

    }


    getControl() {
        return this.cube;
    }

    centerTheCubiclsAroundCube(n, partSize, offset) {

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

            var posVec = new BABYLON.Vector3(getRounded(cubix.position.x), getRounded(cubix.position.y), getRounded(cubix.position.z));

            cubix.prevPosition = posVec.clone();

            var orderTriple = new BABYLON.Vector3(cubix.si, cubix.sj, cubix.sk);

            this.cubPosMap.set(orderTriple, posVec);
            this.revCubPosMap.set(posVec, orderTriple);

        }

    }

    createCubix(scene, n, partSize, parent, offset) {
        var t = true;
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                for (var k = 0; k < n; k++) {

                    if (i == 0 || i == n - 1 || j == 0 || j == n - 1 || k == 0 || k == n - 1) {
                        // t=false;
                        var faceColors = [];

                        faceColors[0] = new BABYLON.Color3(1, 0, 0); // red
                        faceColors[1] = new BABYLON.Color3(0, 1, 0); // green
                        faceColors[2] = new BABYLON.Color3(0, 0, 1); // blue
                        faceColors[3] = new BABYLON.Color3(0, 1, 1); // //svetlo sino
                        // zeleno
                        faceColors[4] = new BABYLON.Color3(1, 1, 0); // yellow
                        faceColors[5] = new BABYLON.Color3(1, 0, 1); // rozeva

                        var options = {
                            width: partSize,
                            height: partSize,
                            depth: partSize,
                            faceColors: faceColors
                        };
                        var cubicl = BABYLON.MeshBuilder.CreateBox("cubcl" + i + j + k,
                            options, scene);
                        // var cubicl = new BABYLON.Mesh.CreateBox("cubcl" + i + j + k,
                        // options, scene);

                        cubicl.si = i;
                        cubicl.sj = j;
                        cubicl.sk = k;

                        cubicl.ci = i;
                        cubicl.cj = j;
                        cubicl.ck = k;

                        cubicl.position.x = i * (partSize + offset);
                        cubicl.position.y = j * (partSize + offset);
                        cubicl.position.z = k * (partSize + offset);

                        this.cubicls.push(cubicl);
                    }
                }
            }
        }
    }

    addParentToAllCubesThetWillRotate(axis, curCub) {

        var wmMap = this.wmMap;

        for (var i = 0; i < this.cubicls.length; i++) {

            var cub = this.cubicls[i];


            if ((axis.equals(BABYLON.Axis.X.negate()) || axis.equals(BABYLON.Axis.X)) && cub.ci == curCub.i) {

                cub.parent = this.cube;
                this.activeCubicls.push(cub);
                cub.isActive = true;

            } else if ((axis.equals(BABYLON.Axis.Y.negate()) || axis.equals(BABYLON.Axis.Y)) && cub.cj == curCub.j) {

                cub.isActive = true;
                cub.parent = this.cube;
                this.activeCubicls.push(cub);


            } else if ((axis.equals(BABYLON.Axis.Z.negate()) || axis.equals(BABYLON.Axis.Z)) && cub.ck == curCub.k) {

                cub.isActive = true;
                cub.parent = this.cube;
                this.activeCubicls.push(cub);
            }

        }
    }

    rotate(rotationAxis, angle, curCub) {


        if (this.shouldAssignCubixToParent) {
            this.addParentToAllCubesThetWillRotate(rotationAxis, curCub);
            this.shouldAssignCubixToParent = false;
        }

        this.cube.rotate(rotationAxis, angle, BABYLON.Space.WORLD);
    }


    finishRotation(rotationAxis, remAngle) {


        for (var i = 0; i < this.activeCubicls.length; i++) {

            var cub = this.activeCubicls[i];
            cub.parent = null;

            this.positionCubix(cub, rotationAxis);

            let {x, y, z} = getMapElement(cub.prevPosition.x, cub.prevPosition.y, cub.prevPosition.z, this.revCubPosMap);

            cub.ci = x;
            cub.cj = y;
            cub.ck = z;

            cub.rotate(rotationAxis, Math.PI / 2, BABYLON.Space.WORLD);

        }

        this.activeCubicls = [];
        this.shouldAssignCubixToParent = true;
        this.cube = new BABYLON.Mesh.CreateBox("cube", 1, this.scene);

    }

    positionCubix(cubix, axis) {

        let mat = RotationUtils.getRotationMatrix(axis);

        var prevPos = cubix.prevPosition;

        let xcal = prevPos.x * mat[0][0] + prevPos.y * mat[0][1] + prevPos.z * mat[0][2];
        let ycal = prevPos.x * mat[1][0] + prevPos.y * mat[1][1] + prevPos.z * mat[1][2];
        let zcal = prevPos.x * mat[2][0] + prevPos.y * mat[2][1] + prevPos.z * mat[2][2];

        var newPos = new BABYLON.Vector3(getRounded(xcal), getRounded(ycal), getRounded(zcal));
        cubix.prevPosition = newPos;

        cubix.position.x = newPos.x;
        cubix.position.y = newPos.y;
        cubix.position.z = newPos.z;

    }
}

//Utils functions TODO: find better place for them
function getMapElement(x, y, z, map) {
    for (var [key, value] of map) {

        if (key.x == x && key.y == y && key.z == z) {
            return {
                x: value.x,
                y: value.y,
                z: value.z
            }
        }
    }
}

function getRounded(num, k) {

    return Math.round(num * 100000) / 100000;

}

