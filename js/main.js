var scene, renderer, camera, snake, player, players, powerUp, longCube;
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

    // var lGeometry = new THREE.BoxGeometry(5,5,5);
    // var lMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
    // longCube = new THREE.Mesh(lGeometry,lMaterial);
    //
    // longCube.position.z = -10;
    // longCube.position.x = -50;
    // longCube.position.y = 3;
    //
    // scene.add(longCube);

    addLights();

    snake = new Snake(0,0, 0xffff00);
    snake.faster();

    player = new Player(0,snake, new Controls("A", "D", "S"));
    player2 = new Player(1, new Snake(2,2, 0x0000ff), new Controls("LEFT","RIGHT", " "));
    player2.snake.faster();
    players = [player, player2];
    camera.lookAt(new THREE.Vector3(0,0,0));

    powerUp = new PowerUps(20,20);

    var game = new Game(4,3);
    animate();
};

function animate() {
    requestAnimationFrame(animate);


    var xd = snake.sphere.position.x - powerUp.powerUpMesh.position.x;
    var zd = snake.sphere.position.z - powerUp.powerUpMesh.position.z;

    var sumRadius = (snake.size + 2.5);
    var sqrSumRadius = sumRadius * sumRadius;
    var distSqr = (xd * xd) + (zd * zd);

    if (distSqr <= sqrSumRadius){console.log("HIT"); powerUp.removeMesh(powerUp.powerUpMesh);}

    //raycaster.set( snake.sphere.position, snake.sphere.position);
    //
    // // calculate objects intersecting the picking ray
    // var intersects = raycaster.intersectObjects( cGroup.children );
    //
    // if(intersects.length > 0){
    //     var intersection = intersects[0];
    //     if(intersection.distance < 3.5){
    //         console.log("HIT");
    //     }
    // }

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