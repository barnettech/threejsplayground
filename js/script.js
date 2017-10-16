var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var clock = new THREE.Clock();
var collidableMeshList = [];

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x9932CC, wireframe:true } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );


// FLOOR
/*	var floorMaterial = new THREE.MeshBasicMaterial( {color:0x444444, side:THREE.DoubleSide} );
	var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);
*/

// LIGHT
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);

// SKYBOX/FOG
	var skyBoxGeometry = new THREE.CubeGeometry( 10000, 10000, 10000 );
	var skyBoxMaterial = new THREE.MeshBasicMaterial( { color: 0x9999ff, side: THREE.BackSide } );
	var skyBox = new THREE.Mesh( skyBoxGeometry, skyBoxMaterial );
	scene.add(skyBox);

// Wall Geometry
var geometry = new THREE.BoxGeometry( 2, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x9932CC } );
var wall = new THREE.Mesh( geometry, material );
wall.position.set(1, 1, 0)
scene.add( wall );
collidableMeshList.push(wall);

// Wall Geometry
var geometry = new THREE.BoxGeometry( 2, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x9932CC } );
var wall2 = new THREE.Mesh( geometry, material );
wall2.position.set(2, -2, 0)
scene.add( wall2 );
collidableMeshList.push(wall2);








camera.position.z = 5;
var moveDistance;
var animate = function () {
requestAnimationFrame( animate );
var delta = clock.getDelta(); // seconds.
cube.rotation.x += 0.01;
cube.rotation.y += 0.01;
var delta = clock.getDelta(); // seconds.
// moveDistance = 24000 * delta; // 200 pixels per second
moveDistance = .47;
renderer.render(scene, camera);
};

animate();


// movement - please calibrate these values
//var xMovement = .25;
//var yMovement = .25;

function clearText()
{   document.getElementById('message').innerHTML = '..........';   }

function appendText(txt)
{   document.getElementById('message').innerHTML += txt;   }

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    console.log(moveDistance);
    var keyCode = event.which;
    if (keyCode == 87) {
        cube.position.y += moveDistance;
    } else if (keyCode == 83) {
        cube.position.y -= moveDistance;
    } else if (keyCode == 65) {
        cube.position.x -= moveDistance;
    } else if (keyCode == 68) {
        cube.position.x += moveDistance;
    } else if (keyCode == 32) {
        cube.position.set(0, 0, 0);
    }
  
    var originPoint = cube.position.clone();

    for (var vertexIndex = 0; vertexIndex < cube.geometry.vertices.length; vertexIndex++)
	{		
		var localVertex = cube.geometry.vertices[vertexIndex].clone();
		var globalVertex = localVertex.applyMatrix4( cube.matrix );
		var directionVector = globalVertex.sub( cube.position );
		
		var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
		var collisionResults = ray.intersectObjects( collidableMeshList );
		if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) {
	    	  appendText(" Hit ");
                  setTimeout(function(){ clearText(); }, 3000);
                }
	}	



};

