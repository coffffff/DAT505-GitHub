var renderer, scene, camera;
var controls;
var cubes = [];
var randomRotationX = [];
var randomRotationY = [];

var size = 1;

function init() {

  console.log("Init Function Starts");

  scene = new THREE.Scene();

  var W = window.innerWidth,
      H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, W / H, .1, 1000);
  camera.position.set(10, 20, 85);//could change the camera's rotations
  camera.lookAt(scene.position);

  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 500, 0);
  scene.add(spotLight);
  //spotLight.castShadow = true;

  var ambLight = new THREE.AmbientLight(0xFFFFFF);
  ambLight.position.set(0, 500, 0);
  ambLight.add(spotLight);
  scene.add(ambLight);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);
  //renderer.shadowMapEnabled = true;

  controls = new THREE.OrbitControls(camera, renderer.domElement);


for (var x = -10; x <= 10; x += 5 ) {// Start from -45 and sequentially add one every 5 pixels
  for (var y = -10; y <= 10; y += 5) {
    var boxGeometry = new THREE.TorusGeometry(10, 0.01, 16,100);
//Concatenation of the x and y values (open Console to see)
    console.log("X:" +x+ ", Y: " +y);
    //The color of the material is assigned a random color
    var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});

if (x==-5 && y==-5){
  boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
} else if (x==5 && y==5){
  boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
} else {
  boxMaterial = new THREE.MeshLambertMaterial({color:  0xFFFFFF});
}


    					var mesh = new THREE.Mesh(boxGeometry, boxMaterial);

    						mesh.position.x = x;
    						mesh.position.y = y;
                //mesh.position.z = z;
                mesh.scale.x = 1;

    						mesh.rotation.x = Math.random() * 2 * Math.PI;
                mesh.rotation.y = Math.random() * 2 * Math.PI;
                mesh.rotation.z = Math.random() * 2 * Math.PI;

             var randomValueX = (Math.random() * 0.1) - 0.05;
             //var randomValueY = (Math.random() * 0.01) - 0.05;
             randomRotationX.push(randomValueX);
             //randomRotationY.push(randomValueY);


    						scene.add( mesh );
                cubes.push(mesh);


}
}

console.log(cubes);
console.log(randomRotationX);
console.log("Init end");
console.log("****** DrawFrame Starts ******");
document.body.appendChild(renderer.domElement);


}


var scaleCube=-5;

function drawFrame(){
  requestAnimationFrame(drawFrame);

  scaleCube+=0.003;
  if(scaleCube>8)scaleCube=-1;

  //forEach takes all the arrary entries and passes the c as the ...
  cubes.forEach(function(c, i){
//for ( var i = 0; i < 1; i ++ ) {

    //c.rotation.x += randomRotationX[i]; //Roate the object that is reference...
    //c.rotation.y += randomRotationY[i];
    //c.rotation.z =  rot;
    //c.scale = rot;

//cubes[6].rotation.x += randomRotationX[6];
c.rotation.x += randomRotationX[18];
c.scale.x=scaleCube;
c.scale.y=scaleCube;
c.scale.z=scaleCube;

cubes[1].geometry = new THREE.SphereGeometry(0.2,10,5);
cubes[20].geometry = new THREE.SphereGeometry(0.2,10,5);
cubes[8].geometry = new THREE.SphereGeometry(0.2,10,5);
//cubes[6].	material = new THREE.MeshBasicMaterial( { wireframe: true } );

c.material= new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});

//}
});

  renderer.render(scene, camera);
}

init();
drawFrame();
