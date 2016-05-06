var init = function() {
	var canvas = document.getElementById("renderCanvas");
	var engine = new BABYLON.Engine(canvas, true);
	var canRotate = true;

	var createScene = function() {

		function getDirection(p1, p2) {

			if (p1.x < p2.x) {
				console.log('desno');
				return Direction.RIGHT;
			}
			if (p1.x > p2.x) {
				console.log('levo');
				return Direction.LEFT;
			}
			if (p1.y < p2.y) {
				console.log('dolu');
				return Direction.DOWN;
			}
			if (p1.y > p2.y) {
				console.log('gore');
				return Direction.UP;
			}

		}

		var scene = new BABYLON.Scene(engine);
		scene.clearColor = BABYLON.Color3.FromInts(149, 165, 166);
		// This creates and positions a free camera (non-mesh)
		// var camPosition = new BABYLON.Vector3(0, 2, 10);

		var camera = new BABYLON.ArcRotateCamera("camera", -1.40, 1, 100,
				BABYLON.Vector3.Zero(), scene);

		var vector = new BABYLON.Vector3(0, 0, 0);
		camera.setTarget(vector);

		var light = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0,
				1, 0), scene);
		// reflect the light off the ground to light the mesh bottom
		light.groundColor = new BABYLON.Color3(.5, .5, .5);
		// TODO
		var cube = new Cube(scene, 6, 5, 1);
		var cubeMesh = cube.getControl();
		// cube.position.x = 44;
		// x = red
		// y = green
		// z = blue
		camera.attachControl(canvas, true);
		var showAxis = function(size) {
			var axisX = BABYLON.Mesh.CreateLines("axisX",
					[ new BABYLON.Vector3.Zero(),
							new BABYLON.Vector3(size, 0, 0) ], scene);
			axisX.color = new BABYLON.Color3(1, 0, 0);
			var axisY = BABYLON.Mesh.CreateLines("axisY",
					[ new BABYLON.Vector3.Zero(),
							new BABYLON.Vector3(0, size, 0) ], scene);
			axisY.color = new BABYLON.Color3(0, 1, 0);
			var axisZ = BABYLON.Mesh.CreateLines("axisZ",
					[ new BABYLON.Vector3.Zero(),
							new BABYLON.Vector3(0, 0, size) ], scene);
			axisZ.color = new BABYLON.Color3(0, 0, 1);
		};

		showAxis(150);
		// This creates a light, aiming 0,1,0 - to the sky (non-mesh)
		var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(
				0, 1, 0), scene);

		// Default intensity is 1. Let's dim the light a small amount
		light.intensity = 0.7;

		// Events

		var isCubePressed = false;
		var firstClick = null;
		var p1 = {};

		function onPointerDown(evt) {

			var pickInfo = scene.pick(scene.pointerX, scene.pointerY);
			if (pickInfo.hit) {
				isCubePressed = true;
				p1.x = evt.x;
				p1.y = evt.y;

				// firstClick=evt.click;

				setTimeout(function() {
					camera.detachControl(canvas);
				}, 0);
			}
		}

		function onPointerUp() {
			isCubePressed = false;
			camera.attachControl(canvas, true);
			var bp = 0;
		}
		// TODO
		function onPointerMove(evt) {

			if (isCubePressed) {
				if (canRotate) {
					canRotate = false;
					var p2 = {
						x : evt.x,
						y : evt.y
					}
					setTimeout(function() {
						var direction = getDirection(p1, p2);
						cube.rotateLayer(direction, 1, 1);
						canRotate = true;

					}, 500)

				}
			}

		}

		function onKeyDown(evt) {
			var currentEnding = -1;
			switch (evt.key) {
			case 'r': // 'A'
				cubeMesh.rotation.x = 0;
				cubeMesh.rotation.y = 0;
				cubeMesh.rotation.z = 0;
				break;
			case 'c': // 'Z'
				camera.setTarget(BABYLON.Vector3.Zero());
				camera.setPosition(new BABYLON.Vector3(14, 54, -82));
				break;
			case 'l': // 'E'
				cube.rotateLayer();
				break;
			}
		}

		canvas.addEventListener("pointerdown", onPointerDown, false);
		canvas.addEventListener("pointerup", onPointerUp, false);
		canvas.addEventListener("pointermove", onPointerMove, false);
		window.addEventListener("keydown", onKeyDown);

		window.addEventListener("mousemove", function(evt) {

			if (true) {

				var pick = scene.pick(evt.clientX, evt.clientY);

			}

		});

		scene.onDispose = function() {
			canvas.removeEventListener("pointerdown", onPointerDown);
			canvas.removeEventListener("pointerup", onPointerUp);
			canvas.removeEventListener("pointermove", onPointerMove);
		}

		return scene;

	};

	var scene = createScene();

	engine.runRenderLoop(function() {

		scene.render();
	});

	// Resize
	window.addEventListener("resize", function() {
		engine.resize();
	});

};