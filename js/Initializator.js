var init = function () {

	var canvas = document.getElementById("renderCanvas");
	var engine = new BABYLON.Engine(canvas, true);

	var createScene = function () {


		var scene = new BABYLON.Scene(engine);
		scene.clearColor = BABYLON.Color3.FromInts(149, 165, 166);

		var camera = new BABYLON.ArcRotateCamera("camera", -1.40, 1, 100,
			BABYLON.Vector3.Zero(), scene);

		var vector = new BABYLON.Vector3(0, 0, 0);
		camera.setTarget(vector);

		var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0,
			1, 0), scene);
		// reflect the light off the ground to light the mesh bottom
		light.groundColor = new BABYLON.Color3(.5, .5, .5);
		// TODO
		var cube = new CubeClass(scene, 6, 6, 0.3);


		camera.attachControl(canvas, true);
		var showAxis = function (size) {
			var axisX = BABYLON.Mesh.CreateLines("axisX",
				[new BABYLON.Vector3.Zero(),
				new BABYLON.Vector3(size, 0, 0)], scene);
			axisX.color = new BABYLON.Color3(1, 0, 0);
			var axisY = BABYLON.Mesh.CreateLines("axisY",
				[new BABYLON.Vector3.Zero(),
				new BABYLON.Vector3(0, size, 0)], scene);
			axisY.color = new BABYLON.Color3(0, 1, 0);
			var axisZ = BABYLON.Mesh.CreateLines("axisZ",
				[new BABYLON.Vector3.Zero(),
				new BABYLON.Vector3(0, 0, size)], scene);
			axisZ.color = new BABYLON.Color3(0, 0, 1);
		};

		showAxis(150);
		// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
		var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(
			0, 1, 0), scene);

		// Default intensity is 1. Let's dim the light a small amount
		light.intensity = 0.7;

		var rotationUtils = new RotationUtils();
		var eventHandler = new EventHandler(canvas, window, cube, scene,
			camera, rotationUtils);

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

	window.addEventListener('asd', function () {
		alert('fuck you)');
	});

};