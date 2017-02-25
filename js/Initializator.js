var init = function () {

	var canvas = document.getElementById("renderCanvas");
	var engine = new BABYLON.Engine(canvas, true);

	configProvider = new CongfigurationProvider(CONFIGURATION_OBJECT);

	var createScene = function () {

		var scene = new BABYLON.Scene(engine);
		scene.clearColor = configProvider.get('SceneColor');

		var camera = new BABYLON.ArcRotateCamera("camera", -1.40, 1, 100,
			BABYLON.Vector3.Zero(), scene);

		var vector = configProvider.get("CameraTarget");
		camera.setTarget(vector);

		var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0,
			1, 0), scene);
		// reflect the light off the ground to light the mesh bottom
		light.groundColor = new BABYLON.Color3(.5, .5, .5);

		camera.attachControl(canvas, true);

		var showAxis = function (size) {
			var axisX = BABYLON.Mesh.CreateLines("axisX",
				[new BABYLON.Vector3.Zero(),
				new BABYLON.Vector3(size, 0, 0)], scene);
			axisX.color = configProvider.get("AxisXColor");

			var axisY = BABYLON.Mesh.CreateLines("axisY",
				[new BABYLON.Vector3.Zero(),
				new BABYLON.Vector3(0, size, 0)], scene);
			axisY.color = configProvider.get("AxisYColor");

			var axisZ = BABYLON.Mesh.CreateLines("axisZ",
				[new BABYLON.Vector3.Zero(),
				new BABYLON.Vector3(0, 0, size)], scene);
			axisZ.color = configProvider.get("AxisZColor");
		};

		if (configProvider.get("ShowAxis")) {
			showAxis(150);
		}

		// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
		var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(
			0, 1, 0), scene);
		// Default intensity is 1. Let's dim the light a small amount
		light.intensity = 0.7;


		let numberOfCubix = configProvider.get("NumberOfCubix");
		let cubixSize = configProvider.get("CubixSize");
		let cubixSpacing = configProvider.get("CubixSpacing");

		var cube = new CubeClass(scene, numberOfCubix, cubixSize, cubixSpacing);
		var caretaker = new CubeCaretaker(cube);
		var rotationUtils = new RotationUtils();
		var eventHandler = new EventHandler(canvas, window, cube, scene,
			camera, rotationUtils, caretaker, configProvider);

		return scene;

	};

	var scene = createScene();

	engine.runRenderLoop(function () {

		scene.render();
	});

	// Resize
	window.addEventListener("resize", function () {
		engine.resize();
	});

};