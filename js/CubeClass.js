class CubeClass {

    constructor(scene, n, partSize, offset) {

        this.cube = new BABYLON.Mesh.CreateBox("cube", 1, scene);
        this.cube.isVisible = false;

        this.cubicls = [];
        this.wmMap = [];
        this.scene = scene;
        this.n = n;
        this.partSize = partSize;

        this.activeCubicls = [];
        this.rFlag = true;

        // what pos coresponds to what x ,y ,z position
        this.cubPosMap = new Map();


        this.createCubix(this.scene, this.n, this.partSize, this.cube, offset);
        this.centerTheCubiclsAroundCube(n, partSize, offset);
        this.rotationUtils = new RotationUtils();

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

            var posVec = new BABYLON.Vector3(cubix.position.x, cubix.position.y, cubix.position.z);
            var orderTriple = new BABYLON.Vector3(cubix.si, cubix.sj, cubix.sk);

            this.cubPosMap.set(posVec, orderTriple);

        }

    }

    createCubix(scene, n, partSize, parent, offset) {
        var t = true;
        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                for (var k = 0; k < n; k++) {

                    // if (i == 0 || i == n - 1 || j == 0 || j == n - 1 || k == 0 || k == n - 1) {
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
                            // this.wmMap.push((cubicl.getWorldMatrix()).clone());
                        // }
                    }
                }
            }
        }



        parentazai(rotationAxis, curCub) {

            var imAxis = getImportantCoordinate(rotationAxis);


            var wmMap = this.wmMap;

            for (var i = 0; i < this.cubicls.length; i++) {

                var cub = this.cubicls[i];


                if (imAxis == 'x' && cub.ci == curCub.i) {

                    cub.parent = this.cube;
                    this.activeCubicls.push(cub);
                    cub.isActive = true;

                } else if (imAxis == 'y' && cub.cj == curCub.j) {

                    cub.isActive = true;
                    cub.parent = this.cube;
                    this.activeCubicls.push(cub);


                } else if (imAxis == 'z' && cub.ck == curCub.k) {

                    cub.isActive = true;
                    cub.parent = this.cube;
                    this.activeCubicls.push(cub);
                }

            }

            var bp = 0;

        }

        rotate(rotationAxis, angle, curCub) {


            if (this.rFlag) {
                this.parentazai(rotationAxis, curCub);
                this.rFlag = false;
            }

            this.cube.rotate(rotationAxis, angle, BABYLON.Space.WORLD);
        }


        frot(axis, curCub) {

            var wmMap = this.wmMap;

            for (var i = 0; i < this.cubicls.length; i++) {

                var cub = this.cubicls[i];

                wmMap[i] = getMeshInfoFromMatrix(cub);

                cub.parent = null;

            }


            setTimeout(() => {
                for (var i = 0; i < this.activeCubicls.length; i++) {


                    var cub = this.activeCubicls[i];

                    var cubInfo = getCubeInfo(cub, wmMap);

                    cub.position.x = cubInfo.x;
                    cub.position.y = cubInfo.y;
                    cub.position.z = cubInfo.z;

                    cub.rotate(axis, Math.PI / 2, BABYLON.Space.WORLD);

                }
                this.cube = new BABYLON.Mesh.CreateBox("cube", 1, this.scene);

                this.activeCubicls = [];
                this.rFlag = true;

                reorderCubicls(this.cubicls, this.cubPosMap);

            }, 0);


        }

    }

function reorderCubicls(cubicls, cubPosMap) {

    for (var i = 0; i < cubicls.length; i++) {

        var cubix = cubicls[i];

        var pos = new BABYLON.Vector3(cubix.position.x, cubix.position.y, cubix.position.z)

        var order = getCubOrder(pos, cubPosMap);

        cubix.ci = order.x;
        cubix.cj = order.y;
        cubix.ck = order.z;


    }

    var bp = 0;
}

function getCubOrder(pos, posMap) {

    // var order=posMap.get(pos);

    for (var [key, value] of posMap) {

        if (key.x == pos.x && key.y == pos.y && key.z == pos.z) {
            return value;
        }

    }

    return null;

}

function getImportantCoordinate(axis) {

    if (axis.equals(BABYLON.Axis.Z.negate()) || axis.equals(BABYLON.Axis.Z)) {
        return 'z';
    } else if (axis.equals(BABYLON.Axis.X.negate()) || axis.equals(BABYLON.Axis.X)) {
        return 'x';
    } else if (axis.equals(BABYLON.Axis.Y.negate()) || axis.equals(BABYLON.Axis.Y)) {
        return 'y';
    }


}


function getCubeInfo(cub, wmMap) {

    for (var i = 0; i < wmMap.length; i++) {

        var curInfo = wmMap[i];

        if (curInfo.ci == cub.ci && curInfo.cj == cub.cj && curInfo.ck == cub.ck) {
            return curInfo;
        }
    }


}
function getMeshInfoFromMatrix(cub) {

    var mat = cub.getWorldMatrix();

    var res = {};

    res.x = mat.m[12];
    res.y = mat.m[13];
    res.z = mat.m[14];

    res.ci = cub.ci;
    res.cj = cub.cj;
    res.ck = cub.ck;

    return res;
}
