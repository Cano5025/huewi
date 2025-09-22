let scene, camera, renderer, controls, huevo;
let alreadyCared = localStorage.getItem("caredToday");

init();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xfff5f0);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1.5, 4);

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('container').appendChild(renderer.domElement);

  const light = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(light);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight.position.set(5, 10, 7);
  scene.add(dirLight);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const loader = new THREE.GLTFLoader();
  loader.load('models/huevo.glb', function(gltf) {
    huevo = gltf.scene;
    scene.add(huevo);
  });

  document.getElementById('care-btn').addEventListener('click', () => {
    if (huevo && !alreadyCared) {
      huevo.traverse(child => {
        if (child.isMesh) {
          child.material.color.setHex(0xffccff);
        }
      });
      localStorage.setItem("caredToday", "true");
      alert("¡Cuidaste a tu huevo!");
      alreadyCared = true;
    } else if (alreadyCared) {
      alert("Ya lo cuidaste hoy :)");
    }
  });

  window.addEventListener('resize', onWindowResize, false);
  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  if (huevo) huevo.rotation.y += 0.005;
  controls.update();
  renderer.render(scene, camera);
}
