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


            // var posVec = new BABYLON.Vector3(cubix.position.x.toPrecision(8), cubix.position.y.toPrecision(8), cubix.position.z.toPrecision(8));
            // var posVec = new BABYLON.Vector3(cubix.position.x, cubix.position.y, cubix.position.z);

            var posVec = new BABYLON.Vector3(getRounded(cubix.position.x), getRounded(cubix.position.y), getRounded(cubix.position.z));

            cubix.prevPosition = posVec.clone();
            console.log('order ' + orderTriple);

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
    }

    rotate(rotationAxis, angle, curCub) {


        if (this.rFlag) {
            this.parentazai(rotationAxis, curCub);
            this.rFlag = false;
        }

        this.cube.rotate(rotationAxis, angle, BABYLON.Space.WORLD);
    }


    frot(rotationAxis, remAngle) {

        for (var i = 0; i < this.activeCubicls.length; i++) {

            var cub = this.activeCubicls[i];
            cub.parent = null;

            let {ci, cj, ck} = getCs(cub, rotationAxis, this.revCubPosMap);

            cub.ci = ci;
            cub.cj = cj;
            cub.ck = ck;


            let {xPosition, yPosition, zPosition} = getCorespondingPosition(ci, cj, ck, this.cubPosMap);

            cub.position.x = xPosition;
            cub.position.y = yPosition;
            cub.position.z = zPosition;

            cub.rotate(rotationAxis, Math.PI / 2, BABYLON.Space.WORLD);

        }

        this.activeCubicls = [];
        this.rFlag = true;
        this.cube = new BABYLON.Mesh.CreateBox("cube", 1, this.scene);


    }
}

function getCorespondingPosition(ci, cj, ck, posMap) {
    for (var [key, value] of posMap) {

        if (key.x == ci && key.y == cj && key.z == ck) {
            return {
                xPosition: value.x,
                yPosition: value.y,
                zPosition: value.z
            }
        }
    }
    var bp = 0;
    // return {
    //     xPosition: 0,
    //     yPosition: 0,
    //     zPosition: 0
    // }
}

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


function getImportantCoordinate(axis) {

    if (axis.equals(BABYLON.Axis.Z.negate()) || axis.equals(BABYLON.Axis.Z)) {
        return 'z';
    } else if (axis.equals(BABYLON.Axis.X.negate()) || axis.equals(BABYLON.Axis.X)) {
        return 'x';
    } else if (axis.equals(BABYLON.Axis.Y.negate()) || axis.equals(BABYLON.Axis.Y)) {
        return 'y';
    }


}

function getRounded(num, k) {

    return Math.round(num * 100000) / 100000;

}

function getCs(cubix, axis, map) {


    rotX = [[1, 0, 0], [0, 0, -1], [0, 1, 0]];
    rotY = [[0, 0, 1], [0, 1, 0], [-1, 0, 0]];
    rotZ = [[0, -1, 0], [1, 0, 0], [0, 0, 1]];

    mrotX = [[1, 0, 0], [0, 0, 1], [0, -1, 0]];
    mrotY = [[0, 0, -1], [0, 1, 0], [1, 0, 0]];
    mrotZ = [[0, 1, 0], [-1, 0, 0], [0, 0, 1]];

    let mat = null;

    if (axis.equals(BABYLON.Axis.Z.negate())) {
        mat = mrotZ;
    } else if (axis.equals(BABYLON.Axis.Z)) {
        mat = rotZ;
    } else if (axis.equals(BABYLON.Axis.X.negate())) {
        mat = mrotX;
    } else if (axis.equals(BABYLON.Axis.X)) {
        mat = rotX;
    } else if (axis.equals(BABYLON.Axis.Y.negate())) {
        mat = mrotY;
    } else if (axis.equals(BABYLON.Axis.Y)) {
        mat = rotY;
    }

    // ci = cubix.ci * mat[0][0] + cubix.cj * mat[0][1] + cubix.ck * mat[0][2];
    // cj = cubix.ci * mat[1][0] + cubix.cj * mat[1][1] + cubix.ck * mat[1][2];
    // ck = cubix.ci * mat[2][0] + cubix.cj * mat[2][1] + cubix.ck * mat[2][2];

    var prevPos = cubix.prevPosition;

    xcal = prevPos.x * mat[0][0] + prevPos.y * mat[0][1] + prevPos.z * mat[0][2];
    ycal = prevPos.x * mat[1][0] + prevPos.y * mat[1][1] + prevPos.z * mat[1][2];
    zcal = prevPos.x * mat[2][0] + prevPos.y * mat[2][1] + prevPos.z * mat[2][2];

    var newPos = new BABYLON.Vector3(getRounded(xcal), getRounded(ycal), getRounded(zcal));
    cubix.prevPosition = newPos;

    let {x, y, z} = getMapElement(newPos.x, newPos.y, newPos.z, map);
    
    return {
        ci: x,
        cj: y,
        ck: z
    }
}