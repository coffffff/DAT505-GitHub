//Global variables
var scene, camera, renderer;
var geometry, material, mesh;
var geometry1, material1, mesh1;
var geometry2, material2, mesh2;
var geometry3, material3, mesh3;
var geometry4, material4, mesh4;
var geometry5, material5, mesh5;
var geometry6, material6, mesh6;
var geometry7, material7, mesh7;
var texture = new THREE.TextureLoader().load ("texture.jpg");
var material1 = new THREE.MeshBasicMaterial ({map:texture});






function init(){
  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 10000 );
  //camera.position.z=800;
  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});


  // Configure renderer clear color
  renderer.setClearColor("#E28899");

  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );

}

function geometry(){
  // Create a Cube Mesh with basic material ---------
  geometry = new THREE.SphereGeometry( 10, 32, 32 );

  mesh = new THREE.Mesh( geometry, material1 );
  mesh.position.z = -1000;

  // Add mesh to scene
  scene.add( mesh );

  // Create a Cube Mesh with basic material ---------
  geometry7 = new THREE.SphereGeometry( 55, 32, 32 );
  material7 = new THREE.MeshBasicMaterial( { color: "#4D4DFF" } );
  mesh7 = new THREE.Mesh( geometry7, material7 );
  mesh7.position.z = -1000;

  // Add mesh to scene
  //scene.add( mesh7 );

  // Create a Cube Mesh with basic material ---------
  geometry1 = new THREE.TorusGeometry(100, 0.5, 16,100);
  material1 = new THREE.MeshNormalMaterial();
  mesh1 = new THREE.Mesh( geometry1, material1 );
  mesh1.position.z = -1000;

  scene.add( mesh1 );
  // Add mesh to scene

  geometry2 = new THREE.TorusGeometry(100, 0.5, 16,100);
  material2 =new THREE.MeshNormalMaterial();
  mesh2 = new THREE.Mesh( geometry2, material2 );
  mesh2.position.z = -1000;

  scene.add( mesh2);

  geometry3 = new THREE.TorusGeometry(100, 0.5, 16,100);
  material3 = new THREE.MeshNormalMaterial();
  mesh3 = new THREE.Mesh( geometry3, material3 );
  mesh3.position.z = -1000;

  scene.add( mesh3);

  geometry4 = new THREE.TorusGeometry(100, 0.5, 16,100);
  material4 = new THREE.MeshNormalMaterial();
  mesh4 = new THREE.Mesh( geometry4, material4 );
  mesh4.position.z = -1000;

 scene.add( mesh4);

 geometry5 = new THREE.TorusGeometry(100, 0.5, 16,100);
 material5 = new THREE.MeshNormalMaterial();
 mesh5 = new THREE.Mesh( geometry5, material5);
 mesh5.position.z = -1000;

scene.add( mesh5);

geometry6 = new THREE.TorusGeometry(100, 0.5, 16,100);
material6 = new THREE.MeshNormalMaterial();
mesh6 = new THREE.Mesh( geometry6, material6);
mesh6.position.z = -1000;

scene.add( mesh6);




}

// Render Loop

var render = function () {
  requestAnimationFrame( render );

  mesh.rotation.x += 0.03; //Continuously rotate the mesh
  //mesh.rotation.y += 0.01;


  mesh1.rotation.x += 0.013; //Continuously rotate the mesh
  //mesh1.rotation.y += 0.02;

  mesh2.rotation.x +=0.014;

  mesh3.rotation.x +=0.015;

  mesh4.rotation.y +=0.013;

  mesh5.rotation.y +=0.014;

  mesh6.rotation.y +=0.015;

  renderer.setClearColor("#000000");

  // Render the scene
  renderer.render(scene, camera);
};


init();
geometry();
render();
