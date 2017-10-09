var scene, renderer, camera;
var height = window.innerHeight;
var width = window.innerWidth;

function onLoad() {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 250, 0);
    scene = new THREE.Scene();
    scene.add(camera);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    renderer.setClearColor(0x000000, 1);
    var canvasContainer = document.getElementById('canvas');
    canvasContainer.appendChild(renderer.domElement);

    //test cube
    var cGeometry = new THREE.BoxGeometry(10,10,10);
    var cMaterial = new THREE.MeshPhongMaterial( { color:0xffffff } );
    var cube = new THREE.Mesh(cGeometry,cMaterial);
    cube.position.set(0,0,0);
    scene.add(cube);

    addLights();

    camera.lookAt(new THREE.Vector3(0,0,0));
    animate();
};

function animate() {
    requestAnimationFrame(animate);

    window.addEventListener( 'resize', onWindowResize, false );

    renderer.render(scene, camera);
};

//voegt lichten toe
function addLights() {
    scene.add(new THREE.AmbientLight(0x0d0d0d));
    scene.add(new THREE.DirectionalLight(0xffffff, 0.5));
};

//resizes window after window size changed
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
};