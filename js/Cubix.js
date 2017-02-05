var faceColors = [];

faceColors[0] = new BABYLON.Color3(1, 0, 0); // red
faceColors[1] = new BABYLON.Color3(0, 1, 0); // green
faceColors[2] = new BABYLON.Color3(0, 0, 1); // blue
faceColors[3] = new BABYLON.Color3(0, 1, 1); // //svetlo sino
faceColors[4] = new BABYLON.Color3(1, 1, 0); // yellow
faceColors[5] = new BABYLON.Color3(1, 0, 1); // rozeva



function Cubix(scene, n, partSize, parent, offset, i, j, k) {

    var options = {
        width: partSize,
        height: partSize,
        depth: partSize,
        faceColors: faceColors
    };
    var cubicl = BABYLON.MeshBuilder.CreateBox("cubcl" + i + j + k,
        options, scene);

    cubicl.si = i;
    cubicl.sj = j;
    cubicl.sk = k;

    cubicl.ci = i;
    cubicl.cj = j;
    cubicl.ck = k;

    cubicl.position.x = i * (partSize + offset);
    cubicl.position.y = j * (partSize + offset);
    cubicl.position.z = k * (partSize + offset);

    this.cubicl = cubicl;


    Object.defineProperty(this, 'parent', {
        get: function () { return this.cubicl.parent; },
        set: function (newValue) { this.cubicl.parent = newValue; },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(this, 'position', {
        get: function () { return cubicl.position; },
        set: function (newValue) { this.cubicl.position = newValue; },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(this, 'ci', {
        get: function () { return this.cubicl.ci; },
        set: function (newValue) { this.cubicl.ci = newValue; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(this, 'cj', {
        get: function () { return this.cubicl.cj; },
        set: function (newValue) { this.cubicl.cj = newValue; },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(this, 'ck', {
        get: function () { return this.cubicl.ck; },
        set: function (newValue) { this.cubicl.ck = newValue; },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(this, 'si', {
        get: function () { return this.cubicl.si; },
        set: function (newValue) { this.cubicl.si = newValue; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(this, 'sj', {
        get: function () { return this.cubicl.sj; },
        set: function (newValue) { this.cubicl.sj = newValue; },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(this, 'sk', {
        get: function () { return this.cubicl.sk; },
        set: function (newValue) { this.cubicl.sk = newValue; },
        enumerable: true,
        configurable: true
    });


    ///////////////////// private functions

    ///////////////////// public functions

    this.rotate = function (axis) {

        let mat = RotationUtils.getRotationMatrix(axis);

        var prevPos = this.prevPosition;

        let xcal = prevPos.x * mat[0][0] + prevPos.y * mat[0][1] + prevPos.z * mat[0][2];
        let ycal = prevPos.x * mat[1][0] + prevPos.y * mat[1][1] + prevPos.z * mat[1][2];
        let zcal = prevPos.x * mat[2][0] + prevPos.y * mat[2][1] + prevPos.z * mat[2][2];

        var newPos = new BABYLON.Vector3(getRounded(xcal), getRounded(ycal), getRounded(zcal));
        this.prevPosition = newPos;

        this.cubicl.position.x = newPos.x;
        this.cubicl.position.y = newPos.y;
        this.cubicl.position.z = newPos.z;
        this.cubicl.rotate(axis, Math.PI / 2, BABYLON.Space.WORLD);

    }

    this.getMesh = function () {
        return this.cubicl;
    }

}