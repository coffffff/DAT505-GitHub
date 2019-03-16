//Global variables
var scene, camera, renderer;
var geometry1, material1, mesh1;
var geometry3, material3, mesh3;
var size = 150;
var x = 0, y = 0;
var heartShape = new THREE.Shape();
heartShape.moveTo( x + 5, y + 5 );
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );


function init(){
  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.z = 800;

  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer clear color
  renderer.setClearColor("#000000");

  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );
}

function geometry(){
  // Create a Cube Mesh with basic material ---------
  geometry1 = new THREE.ShapeGeometry( heartShape );
  material1 = new THREE.MeshBasicMaterial( { color: "#E28899" } );
  mesh1 = new THREE.Mesh( geometry1, material1 );

  // Add mesh to scene
  scene.add( mesh1 );

  geometry3 = new THREE.BoxBufferGeometry( size, size, size );
	material3 = new THREE.MeshBasicMaterial( { wireframe: true } );
	mesh3 = new THREE.Mesh( geometry3, material3 );
	mesh3.position.z1 = - 1000;

	scene.add( mesh3 );
}
// Render Loop
var render = function () {
  requestAnimationFrame( render );

  mesh1.rotation.x += 0.02; //Continuously rotate the mesh
  mesh1.rotation.y += 0.03;
  mesh3.rotation.x += 0.02; //Continuously rotate the mesh
  mesh3.rotation.y += 0.03;

  renderer.setClearColor("#000000");

  // Render the scene
  renderer.render(scene, camera);
};

init();
geometry();
render();
