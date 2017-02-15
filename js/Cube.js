class CubeClass {

    constructor(scene, n, partSize, offset) {

        this.cube = new BABYLON.Mesh.CreateBox("cube", 1, scene);
        this.cube.isVisible = false;

        this.cubicls = [];
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

        for (var i = 0; i < n; i++) {
            for (var j = 0; j < n; j++) {
                for (var k = 0; k < n; k++) {

                    if (i == 0 || i == n - 1 || j == 0 || j == n - 1 || k == 0 || k == n - 1) {

                        let cubix = new Cubix(scene, n, partSize, parent, offset, i, j, k);
                        this.cubicls.push(cubix);
                    }
                }
            }
        }
    }

    addParentToAllCubesThetWillRotate(axis, curCub) {


        for (var i = 0; i < this.cubicls.length; i++) {

            var cub = this.cubicls[i];


            if ((axis.equals(BABYLON.Axis.X.negate()) || axis.equals(BABYLON.Axis.X)) && cub.ci == curCub.i) {
                cub.parent = this.cube;
                this.activeCubicls.push(cub);

            } else if ((axis.equals(BABYLON.Axis.Y.negate()) || axis.equals(BABYLON.Axis.Y)) && cub.cj == curCub.j) {

                cub.parent = this.cube;
                this.activeCubicls.push(cub);


            } else if ((axis.equals(BABYLON.Axis.Z.negate()) || axis.equals(BABYLON.Axis.Z)) && cub.ck == curCub.k) {

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

            cub.rotate(rotationAxis);

            let rot = cub.mesh.rotationQuaternion.toEulerAngles();
            cub.mesh.rotationQuaternion = undefined;

            cub.mesh.rotation.x = rot.x;
            cub.mesh.rotation.y = rot.y;
            cub.mesh.rotation.z = rot.z;


            let {x, y, z} = getMapElement(cub.prevPosition.x, cub.prevPosition.y, cub.prevPosition.z, this.revCubPosMap);

            cub.ci = x;
            cub.cj = y;
            cub.ck = z;

        }

        this.activeCubicls = [];
        this.shouldAssignCubixToParent = true;
        this.cube = new BABYLON.Mesh.CreateBox("cube", 1, this.scene);

    }

    saveState() {
        console.log('state saved');
        return new Memento(this.cubicls);
    }

    setState(memento) {
        console.log('state set');

        let cubixInfos = memento.getState();
        let counter = 0;

        for (var i = 0; i < this.cubicls.length; i++) {
            let cubix = this.cubicls[i];

            cubixInfos.forEach((info) => {
                if (cubix.si === info.si && cubix.sj === info.sj && cubix.sk === info.sk) {

                    counter++;
                    cubix.ci = info.ci;
                    cubix.cj = info.cj;
                    cubix.ck = info.ck;

                    cubix.position = info.position.clone();
                    cubix.rotation = info.rotation.clone();
                    cubix.prevPosition = info.prevPosition.clone();
                }
            });

            let breakpoint = 0;
        }

        this.cube = new BABYLON.Mesh.CreateBox("cube", 1, this.scene);
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

function fdeName(arguments) {

}