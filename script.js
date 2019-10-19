const planes = [];
const zoomDelta = 2;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.rotation.x = THREE.Math.degToRad(-90);
camera.position.z = 0;
camera.position.y = 10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const size = 1000;
const divisions = 1000;

const gridHelper = new THREE.GridHelper( size, divisions );
gridHelper.position.x = 1;
gridHelper.position.y = 0;

scene.add(gridHelper);

const texture = new THREE.TextureLoader().load("assets/belt.png");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.minFilter = THREE.NearestFilter;
texture.magFilter = THREE.NearestFilter;

const geometry = new THREE.PlaneGeometry(1,1);
const material = new THREE.MeshBasicMaterial({
  color: 0x999999,
  side: THREE.DoubleSide,
  map: texture
});

const plane = new THREE.Mesh(geometry, material);

plane.position.x = .5;
plane.position.z = .5;
plane.position.y = 0;
plane.texture = texture;
plane.speed = 2;
plane.currentFrame = 0;
plane.rotation.x = THREE.Math.degToRad(-90);

planes.push(plane);

scene.add(plane);


window.addEventListener('mousewheel', event => {
  const zoomDirection = (event.deltaY < 0) ? 0.9 : 1.1;
  camera.position.y *= zoomDirection;
});

const animate = function () {
  requestAnimationFrame(animate);

  planes.forEach(plane => {
    plane.currentFrame++;

    if (plane.currentFrame === plane.speed) {
      plane.texture.offset.x -= 0.0625;
      plane.currentFrame = 0;
    }
  });

  renderer.render(scene, camera);
};

animate();
