var CONFIGURATION_OBJECT = {

    // SCENE 
    CameraTarget: BABYLON.Vector3.Zero(),
    SceneColor: BABYLON.Color3.FromInts(149, 165, 166),


    //AXIS
    ShowAxis: true,
    AxisXColor: new BABYLON.Color3(1, 0, 0),
    AxisYColor: new BABYLON.Color3(0, 1, 0),
    AxisZColor: new BABYLON.Color3(0, 0, 1),

    //CUBE CREATION
    NumberOfCubix: 5,
    CubixSize: 6,
    CubixSpacing: 0.3,

    //CUBIX 
    FaceColors:
    [
        new BABYLON.Color3(1, 0, 0), // red
        new BABYLON.Color3(0, 1, 0), // green
        new BABYLON.Color3(0, 0, 1), // blue
        new BABYLON.Color3(0, 1, 1), // //svetlo sino
        new BABYLON.Color3(1, 1, 0), // yellow
        new BABYLON.Color3(1, 0, 1), // rozeva

    ],

    AutomaticSavingState : false
}