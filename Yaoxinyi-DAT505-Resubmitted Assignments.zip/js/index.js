
var width = window.innerWidth;
var height = window.innerHeight;

let group = new THREE.Group();

var possibleEmoji = ["❄️"]
var cursor = {
  x: width / 2,
  y: width / 2
};
var particles = [];

function init() {
  bindEvents();
}

// Bind events that are needed
function bindEvents() {
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('touchmove', onTouchMove);
  document.addEventListener('touchstart', onTouchMove);
}
// on mouse Move
function onTouchMove(e) {
  if (e.touches.length > 0) {
    for (var i = 0; i < e.touches.length; i++) {
      addParticle(e.touches[i].clientX, e.touches[i].clientY, possibleEmoji[Math.floor(Math.random() * possibleEmoji.length)]);
    }
  }
}
// on mouse Move
function onMouseMove(e) {
  cursor.x = e.clientX;
  cursor.y = e.clientY;

  addParticle(cursor.x, cursor.y, possibleEmoji[Math.floor(Math.random() * possibleEmoji.length)]);
}
//  add Particle
function addParticle(x, y, character) {
  var particle = new Particle();
  particle.init(x, y, character);
  particles.push(particle);
}
//  update Particles
function updateParticles() {

  // Updated
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
  }

  // Remove dead particles
  for (var i = particles.length - 1; i >= 0; i--) {
    if (particles[i].lifeSpan < 0) {
      particles[i].die();
      particles.splice(i, 1);
    }
  }

}


/**
 * Particles
 */

function Particle() {

  this.initialStyles = {
    "position": "fixed",
    "display": "block",
    "pointerEvents": "none",
    "z-index": "10",
    "fontSize": "16px",
    "will-change": "transform",
    "color": "#e234cb"
  };

  // Init, and set properties
  this.init = function (x, y, character) {

    this.velocity = {
      x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
      y: (1 + Math.random())
    };

    this.lifeSpan = 120 + Math.floor(Math.random() * 60); //ms

    this.position = {
      x: x - 20,
      y: y - 20
    };

    this.element = document.createElement('span');
    this.element.innerHTML = character;
    applyProperties(this.element, this.initialStyles);
    this.update();

    document.body.appendChild(this.element);
  };
// update particle position
  this.update = function () {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.velocity.x += (Math.random() < 0.5 ? -1 : 1) * 2 / 75;
    this.velocity.y -= Math.random() / 400;

    this.lifeSpan--;

    this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + (this.lifeSpan / 180) + ") rotate(" + (2 * this.lifeSpan) + "deg)";

  }

  // delete particle
  this.die = function () {
    this.element.parentNode.removeChild(this.element);
  }

}

/**
 * Utils
 */

// Applies css `properties` to an element.
function applyProperties(target, properties) {
  for (var key in properties) {
    target.style[key] = properties[key];
  }
}

init();
var raycaster = new THREE.Raycaster();
var mouseVector = new THREE.Vector3();
var selectedObject = null;

var renderer, camera, scene, gui, stats, ambientLight, directionalLight, control;
let obj;
let timer,isOpnen = true;

let myWorker = new Worker('js/worker.js');

let arr = []; //生成一个速度的数组

var mixer, clock = new THREE.Clock();
// 初始化渲染器
function initRender() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  //告诉渲染器需要阴影效果
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);
  renderer.domElement.style.position = "fixed";
  renderer.domElement.style.zIndex = 99999;
}
// 初始化相机
function initCamera() {
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 30, 60);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(camera);
}
// 初始化场景
function initScene() {
  scene = new THREE.Scene();
}

function initGui() {
  //声明一个保存需求修改的相关数据的对象
  gui = {};

  var datGui = new dat.GUI();
  //将设置属性添加到gui当中，gui.add(对象，属性，最小值，最大值）
}

function initLight() {
  ambientLight = new THREE.AmbientLight("#bbbbbb");
  scene.add(ambientLight);

  directionalLight = new THREE.DirectionalLight("#ffffff");
  directionalLight.position.set(40, 60, 10);

  directionalLight.shadow.camera.near = 1; //产生阴影的最近距离
  directionalLight.shadow.camera.far = 400; //产生阴影的最远距离
  directionalLight.shadow.camera.left = -50; //产生阴影距离位置的最左边位置
  directionalLight.shadow.camera.right = 50; //最右边
  directionalLight.shadow.camera.top = 50; //最上边
  directionalLight.shadow.camera.bottom = -50; //最下面

  //这两个值决定生成阴影密度 默认512
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.mapSize.width = 1024;

  //告诉平行光需要开启阴影投射
  directionalLight.castShadow = true;

  camera.add(directionalLight);
}

// 初始化模型
function initModel() {
  let Stainless = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    emissive: 0x00,
    metalness: 1,
    roughness: 0.3,
    envMap: null,
    transparent: true,
    opacity: 1,
    wireframeLinewidth: 2.3
  })

  //底部平面
  var planeGeometry = new THREE.PlaneGeometry(1000, 1000);
  var planeMaterial = new THREE.MeshLambertMaterial({ color: 0x333333, side: THREE.DoubleSide });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = -.1;
  plane.receiveShadow = true; //可以接收阴影
  scene.add(plane);

  //生成一千个立方体
  for (let i = 0; i < 1000; i++) {
    group.add(randomCube());
    arr.push({
      speed: Math.random(),
      y: -3
    });
  }
  scene.add(group);

  //创建webWorkers
  if (!window.Worker) {
    alert("你的电脑不支持web Workers");
  }

  //创建fbx加载器
  var loader = new THREE.FBXLoader();
  loader.load('model/dafengche.FBX', function (fbx) {
    console.log(fbx);
    fbx.scale.set(1, 1, 1);
    fbx.traverse(function (child) {
      if (child.isMesh) {
        if (child.name == "FEATHER") {
          timer = setInterval(() => {
            // 旋转扇叶
            child.rotation.y += 0.01;
          })
        }
        child.frustumCulled = false;
        child.castShadow = true;
        child.material = Stainless;
      }
    });
    group.add(fbx);
    obj = fbx; //获取到模型对象
    meshHelper = new THREE.SkeletonHelper(obj);
    scene.add(meshHelper);
    mixer = new THREE.AnimationMixer(obj);
    // action = mixer.clipAction(gltf.animations[0]);
    // action.play();

    //在模型加载完成后，链接worker线程
    myWorker.postMessage({
      array:arr,
      msg:"arr"
    });

    myWorker.onmessage = function (evt) {
      // console.log(evt.data);
      for (let i = 0; i < evt.data.length; i++) {
        group.children[i].position.y = evt.data[i].y;
        // console.log(group.children[i],e.data[i]);
      }
    }
  });



  //随机一个立方体
  function randomCube() {
    let material = new THREE.MeshBasicMaterial({ color: 0xffffff * Math.random() });
    let boxSize = Math.random() * 0.5;
    let geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
    let mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(Math.random() * 100 - 50, -3, Math.random() * 100 - 50);
    mesh.speed = Math.random();
    return mesh;
  }
  
  
  window.addEventListener('mousedown', onDocumentMouseDown, false);

}

function initControl() {
  // 初始化控制器
  control = new THREE.OrbitControls(camera, renderer.domElement);
  control.target.set(0, 15, 0);
  // 惯性
  control.enableDamping = true;
  //鼠标灵敏度
  control.dampingFactor = 1;
  //缩放
  control.enableZoom = true;
  //是旋转
  control.autoRotate = true;
  control.autoRotateSpeed = 3;
  //拖拽
  control.enablePan = true;
}

function render() {
  // 渲染帧

  control.update();

  var time = clock.getDelta();

  if (mixer) {

    mixer.update(time);

  }

  renderer.render(scene, camera);
}

function onWindowResize() {
  // 当窗口改变尺寸

  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

}
function onDocumentMouseDown(event) {
  // 当鼠标点击
  event.preventDefault();
  if (selectedObject) {
    selectedObject = null;
  }

  var intersects = getIntersects(event.layerX, event.layerY);
  if (intersects.length > 0) {
    var res = intersects.filter(function (res) {
      return res && res.object;
    })[0];
    if (res && res.object) {
      selectedObject = res.object;
      console.log(selectedObject);
      if(selectedObject.name == "FEATHER"){
        if (isOpnen) {
          clearInterval(timer)
          isOpnen = false;
          //改变线程
          myWorker.postMessage({
            array:arr,
            msg:"en"
          });
        } else {
          isOpnen = true;
          timer = setInterval(() => {
            // 旋转扇叶
            obj.children[0].rotation.y += 0.01;
          })
        }
      }else{
        // 选中粒子随机颜色
        selectedObject.material.color = new THREE.Color(0xff0000);
      }
    }
  }
}
function getIntersects(x, y) {
  x = (x / window.innerWidth) * 2 - 1;
  y = - (y / window.innerHeight) * 2 + 1;
  mouseVector.set(x, y, 0.5);
  raycaster.setFromCamera(mouseVector, camera);
  return raycaster.intersectObject(group, true);
}

function animate() {
  //更新控制器
  render();

  updateParticles();
  requestAnimationFrame(animate);
}

// 绘制场景
function draw() {
  initGui();
  initRender();
  initScene();
  initCamera();
  initLight();
  initModel();

  initControl();

  animate();
  window.onresize = onWindowResize;
};
draw();
