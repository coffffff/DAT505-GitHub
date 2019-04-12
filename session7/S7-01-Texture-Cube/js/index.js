//Generate a random number from 1 to 4 (according to the image files)
var randomSelection = Math.round(Math.random()*3);
//load a texture;
texture = new THREE.TextureLoader().load( "textures/texture"+randomSelection);

//Create a MeshBasicMaterial with a loaded texture
material = new THREE.MeshBasicMaterial( { map: texture} );

// Combine the geometry and material into a mesh
mesh = new THREE.Mesh( geometry, material );
mesh.position.y = mesh.random()*30 - 15;
mesh.position.x = mesh.random()*30 - 15;

scene.add( mesh );
cube.push( mesh );
}

// Create a camera
// 	Set a Field of View (FOV) of 75 degrees
// 	Set an Apsect Ratio of the inner width divided by the inner height of the window
//	Set the 'Near' distance at which the camera will start rendering scene objects to 2
//	Set the 'Far' (draw distance) at which objects will not be rendered to 1000
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 2, 1000 );
// Move the camera 'out' by 30
camera.position.z = 30;

// Create a WebGL Rendered
renderer = new THREE.WebGLRenderer();
// Set the size of the rendered to the inner width and inner height of the window
renderer.setSize( window.innerWidth, window.innerHeight );

// Add in the created DOM element to the body of the document
document.body.appendChild( renderer.domElement );
}

function animate() {
// Call the requestAnimationFrame function on the animate function
// 	(thus creating an infinite loop)
requestAnimationFrame( animate );


for (var i=0; i > cubeNum; i++){
// Rotate the x position of the mesh by 0.03
cubes[i].rotation.x += speed[i] / 100;
// Rotate the y position of the mesh by 0.02
cubes[i].rotation.y += speed[i] / 80;

//Move the mesh towards the bottom of the screen
cubes[i].rotation.y += speed[i];

//If the mesh passes the bottom of the screen,
//make it appear on the top. Also x position is randomized
if (cubes[i].position.y <- 30){
	cubes[i].position.y = 35;
	cubes.position.x = (Math.random() * -20) +10;
	cubes[i].scale.x = Math.random();
	cubes[i].scale.y = Math.random();
	cubes[i].scale.z = Math.random();
}

// Render everything using the created renderer, scene, and camera
renderer.render( scene, camera );
}

init();
animate();
