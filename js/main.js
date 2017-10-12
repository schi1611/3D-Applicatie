var scene, renderer, camera, snake, player;
var height = window.innerHeight;
var width = window.innerWidth;

var keyboard = {};

function onLoad() {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, height/3, 50);
    scene = new THREE.Scene();
    scene.add(camera);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    renderer.setClearColor(0x000000, 1);
    var canvasContainer = document.getElementById('canvas');
    canvasContainer.appendChild(renderer.domElement);

    var ground = new THREE.Mesh( new THREE.PlaneBufferGeometry(width/4,height/4,2,2), new THREE.MeshPhongMaterial( { color: 0xf0f0f0 } ));
    ground.position.z = -10;
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    addLights();

    snake = new Snake(0,0, 0xffff00);
    snake.faster();
    snake.faster();

    player = new Player(0,snake);
    player.controls("A", "D");
    camera.lookAt(new THREE.Vector3(0,0,0));
    animate();
};

function animate() {
    requestAnimationFrame(animate);

    if (keyboard[37])
    {
        //sn.direction.z -=  Math.PI * 0.1;
        snake.left();
    }


    if (keyboard[39]) {
        //sn.direction.z +=  Math.PI * 0.1;
        snake.right();
    }

    snake.move();

    window.addEventListener( 'resize', onWindowResize, false );

    renderer.render(scene, camera);
};


function keyDown(event) {
    keyboard[event.keyCode] = true;
}

function keyUp(event) {
    keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

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