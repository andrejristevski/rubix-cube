class Cubix {


    constructor() {

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