var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x9932CC } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

var animate = function () {
requestAnimationFrame( animate );

cube.rotation.x += 0.05;
cube.rotation.y += 0.05;

renderer.render(scene, camera);
};

animate();


// movement - please calibrate these values
var xSpeed = 1;
var ySpeed = 1;
var xMovement = .75;
var yMovement = .75;

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        cube.position.y += yMovement;
    } else if (keyCode == 83) {
        cube.position.y -= yMovement;
    } else if (keyCode == 65) {
        cube.position.x -= xMovement;
    } else if (keyCode == 68) {
        cube.position.x += xMovement;
    } else if (keyCode == 32) {
        cube.position.set(0, 0, 0);
    }
};

