function Cube(scene, n, partSize, offset) {

	this.cube = new BABYLON.Mesh.CreateBox("cube", 1, scene);
	this.cube.isVisible = false;

	this.cubicls = [];
	this.wmMap= [];
	this.scene = scene;
	this.n = n;
	this.partSize = partSize;

	this.createCubix(this.scene, this.n, this.partSize, this.cube, offset);
	this.centerTheCubiclsAroundCube(n, partSize, offset);
	this.rotationUtils = new RotationUtils();
	

	// this.colorTheFaces(null, this.cubicls, this.scene);
}
//
// Cube.prototype=(function{
//	
// return {}
// })();

Cube.prototype.getControl = function() {
	return this.cube;
}

Cube.prototype.centerTheCubiclsAroundCube = function(n, partSize, offset) {

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

	}
	var bp = 0;

};

Cube.prototype.createCubix = function(scene, n, partSize, parent, offset) {
	var t=true;
	for (var i = 0; i < n; i++) {
		for (var j = 0; j < n; j++) {
			for (var k = 0; k < n; k++) {
				
				if (t) {
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
					width : partSize,
					height : partSize,
					depth : partSize,
					faceColors : faceColors
				};
				var cubicl = BABYLON.MeshBuilder.CreateBox("cubcl" + i + j + k,
						options, scene);
				// var cubicl = new BABYLON.Mesh.CreateBox("cubcl" + i + j + k,
				// options, scene);

				cubicl.i = i;
				cubicl.j = j;
				cubicl.k = k;

				cubicl.position.x = i * (partSize + offset);
				cubicl.position.y = j * (partSize + offset);
				cubicl.position.z = k * (partSize + offset);

				cubicl.parent = parent;

				this.cubicls.push(cubicl);
				this.wmMap.push((cubicl.getWorldMatrix()).clone());
				}
			}
		}
	}
}

Cube.prototype.fja=function(){
	
for(var i=0; i<this.cubicls.length ; i++){
		
		var cub=this.cubicls[i];
		
		var wmMap=this.wmMap;
		
		
			
		cub.parent=this.cube;
				
// wmMap[i]=(cub.getWorldMatrix()).clone();
		
	}
	
}

Cube.prototype.parentazai=function(){
	
	var wmMap=this.wmMap;
	
	for(var i=0; i<this.cubicls.length ; i++){
		
		var cub=this.cubicls[i];
		
		cub.parent=this.cube;
		
// wmMap[i]=(cub.getWorldMatrix()).clone();
		
	}
	
	var bp=0;
	
}
//
// Cube.prototype.deparentazai=function(){
//	
// var wmMap=this.wmMap;
//	
// for(var i=0; i<this.cubicls.length ; i++){
//		
// var cub=this.cubicls[i];
//		
// cub.parent=null;
//		
// cub._worldMatrix=wmMap[i];
// }
//	
//	
// }

Cube.prototype.rotate=function(rotationAxis, angle){
	
	// add parent to rotate
	this.parentazai();
	
	this.cube.rotate(rotationAxis, angle, BABYLON.Space.WORLD);
	// take parent away and
	
// this.deparentazai();
	

}

function getMeshInfoFromMatrix(mat){
	
	var o={};
	
	
	o.x=mat.m[12];
	o.y=mat.m[13];
	o.z=mat.m[14];
	
	return o;
}


Cube.prototype.frot=function(axis){
	
	var wmMap=this.wmMap;
	
	for(var i=0; i<this.cubicls.length ; i++){
		
		var cub=this.cubicls[i];
		wmMap[i]=(cub.getWorldMatrix()).clone();
		
		wmMap[i]=getMeshInfoFromMatrix(cub.getWorldMatrix());
		var bp=0;
		
		cub.parent=null;
		
	}
	
	this.cube = new BABYLON.Mesh.CreateBox("cube", 1, this.scene);
	
	if (axis == BABYLON.Axis.Z) {
		
	} else if (BABYLON.Axis.Z.negate()) {
		
	} else if (BABYLON.Axis.X.negate()) {
		
	} else if (BABYLON.Axis.X) {
		
	} else if (BABYLON.Axis.Y.negate()) {
		
	} else if (BABYLON.Axis.Y) {
		
	}
	
	setTimeout(() => {
		for(var i=0; i<this.cubicls.length ; i++){
			
			var cub=this.cubicls[i];
			
			cub.position.x=wmMap[i].x;
			cub.position.y=wmMap[i].y;
			cub.position.z=wmMap[i].z;
			
			
			cub.rotate(axis, Math.PI /2 ,BABYLON.Space.WORLD);
			
			if (axis.equals( BABYLON.Axis.Z)) {
				
//				cub.rotation.z+=Math.PI /2;
				
			} else if (axis.equals(BABYLON.Axis.Z.negate())) {
				
//				cub.rotation.z-=Math.PI /2;
				
			} else if (axis.equals(BABYLON.Axis.X.negate())) {
				
//				cub.rotation.x-=Math.PI /2;
				
			} else if (axis.equals(BABYLON.Axis.X)) {
				
//				cub.rotation.x+=Math.PI /2;
				
			} else if (axis.equals(BABYLON.Axis.Y.negate())) {
				
//				cub.rotation.y-=Math.PI /2;
				
			} else if (axis.equals( BABYLON.Axis.Y)) {
				
//				cub.rotation.y+=Math.PI /2;
				
				
			}
			
			
		}
	}, 5);
	
	
	
// this.deparentazai();
	
}



Cube.prototype.printMatrixes=function(){
	
	
	
	var cub=this.cubicls[0];
	var par =this.cube;
	
	var mesh=cub;
	
	
	console.log('position ' + JSON.stringify(mesh.position));
	console.log('rot ' + JSON.stringify(mesh.rotation));
	console.log('world ' + JSON.stringify(mesh.getWorldMatrix()));

	
	
}


Cube.prototype.saveWM=function(){
	
	
	var cub=this.cubicls[0];
	var par =this.cube;
	
	var mesh=cub;
	
	this.wm=(mesh.getWorldMatrix()).clone();
	
	
}

Cube.prototype.rot=function(){
	
	
	
	var cub=this.cubicls[0];
	var par =this.cube;
	
	var mesh=cub;
	
	cub.parent=null;
	
}


Cube.prototype.setWM=function(){
	
	
	var cub=this.cubicls[0];
	var par =this.cube;
	
	var mesh=cub;
	
// mesh.setWorldMatrix(this.wm);
	mesh._worldMatrix=this.wm;
	
}

Cube.prototype.frotone=function(){
	
	var wmMap=this.wmMap;
	
	for(var i=0; i<this.cubicls.length ; i++){
		
		var cub=this.cubicls[i];
		wmMap[i]=(cub.getWorldMatrix()).clone();
		
// wmMap[i]=getMeshInfoFromMatrix(cub.getWorldMatrix());
		var bp=0;
		
		cub.parent=null;
		
	}
	
	this.cube = new BABYLON.Mesh.CreateBox("cube", 1, this.scene);
	
	setTimeout(() => {
		for(var i=0; i<this.cubicls.length ; i++){
			
			var cub=this.cubicls[i];
// wmMap[i]=(cub.getWorldMatrix()).clone();
			
// if (i!=this.cubicls.length-1) {
			cub._worldMatrix=wmMap[i];
// }
			
		}
	}, 5);
	
	
	
// this.deparentazai();
	
}