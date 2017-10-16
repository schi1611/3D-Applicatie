var scene, renderer, camera, snake, player, players;
var height = window.innerHeight;
var width = window.innerWidth;

var raycaster = new THREE.Raycaster();
var cGroup = new THREE.Group();

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
    scene.add(cGroup);

    var lGeometry = new THREE.BoxGeometry(5,10,height/4);
    var lMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
    var longCube = new THREE.Mesh(lGeometry,lMaterial);

    longCube.position.z = -10;
    longCube.position.x = -width/8;

//scene.add(longCube);
    cGroup.add(longCube);

    var clonedLongCube1 = longCube.clone();
    clonedLongCube1.position.x = width/8;

//scene.add(clonedLongCube);
    cGroup.add(clonedLongCube1);

    var clonedLongCube2 = longCube.clone();
    clonedLongCube2.scale.set(1,1,1.4);
    clonedLongCube2.position.x = 0;
    clonedLongCube2.rotation.y = -Math.PI / 2;
    clonedLongCube2.position.z = -height/8 - 10;


//scene.add(clonedLongCube);
    cGroup.add(clonedLongCube2);

    var clonedLongCube3 = longCube.clone();
    clonedLongCube3.scale.set(1,1,1.4);
    clonedLongCube3.position.x = 0;
    clonedLongCube3.rotation.y = -Math.PI / 2;
    clonedLongCube3.position.z = height/8 - 10;

//scene.add(clonedLongCube);
    cGroup.add(clonedLongCube3);

    addLights();

    snake = new Snake(0,0, 0xffff00);
    snake.faster();

    player = new Player(0,snake, new Controls("A", "D", " "));
    player2 = new Player(1, new Snake(2,2, 0x0000ff), new Controls("J","K", " "));
    player2.snake.faster();
    players = [player, player2];
    camera.lookAt(new THREE.Vector3(0,0,0));
    animate();
};

function animate() {
    requestAnimationFrame(animate);
    for(var i = 0; i < players.length; i++)
    {
        players[i].update();
        players[i].snake.move();

        if(players[i].snake.sphere.position.z < -height/8 - 10){
            players[i].snake.trail = false;
            players[i].snake.sphere.position.z = height/8 - 10;
        }

        if(players[i].snake.sphere.position.z > height/8 - 10){
            players[i].snake.trail = false;
            players[i].snake.sphere.position.z = -height/8 - 10;
        }

        if(players[i].snake.sphere.position.x < -width/8){
            players[i].snake.trail = false;
            players[i].snake.sphere.position.x = width/8;
        }
        if(players[i].snake.sphere.position.x > width/8){
            players[i].snake.trail = false;
            players[i].snake.sphere.position.x = -width/8;
        }
    }




    // raycaster.set( snake.sphere.position, snake.sphere.position);
    //
    // // calculate objects intersecting the picking ray
    // var intersects = raycaster.intersectObjects( cGroup.children );
    //
    // if(intersects.length > 0){
    //     var intersection = intersects[0];
    //     if(intersection.distance < 5){
    //         console.log("HIT");
    //     }
    // }
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