var scene, renderer, camera, snake, player, players, powerUp;
var height = window.innerHeight;
var width = window.innerWidth;
var game;
var raycaster = new THREE.Raycaster();
var cGroup = new THREE.Group();
var powerUpArr = [];

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

    powerUp = new PowerUps(20,20,Math.floor(Math.random()*8),0x0000ff);
    powerUpArr.push(powerUp);
    console.log(powerUp.sort);

    game = new Game(4,3);
    animate();
};

function animate() {
    requestAnimationFrame(animate);

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
        if(powerUpArr.length > 0) {
            var xd = players[i].snake.sphere.position.x - powerUp.powerUpMesh.position.x;
            var zd = players[i].snake.sphere.position.z - powerUp.powerUpMesh.position.z;

            var sumRadius = (players[i].snake.size + powerUp.size);
            var sqrSumRadius = sumRadius * sumRadius;
            var distSqr = (xd * xd) + (zd * zd);


            if (distSqr <= sqrSumRadius) {
                console.log("HIT");

                switch (powerUpArr[0].sort) {
                    case 1:
                        players[i].snake.bigger();
                        break;
                    case 2:
                        players[i].snake.smaller();
                        break;
                    case 3:
                        players[i].snake.faster();
                        break;
                    case 4:
                        players[i].snake.slower();
                        break;
                    case 5:
                        //all snake trails removed
                        for (var j = 0; j < players.length; j++)
                            players[j].snake.eraser();
                        break;
                    case 6:
                        players[i].snake.moreJumps();
                        break;
                    case 7:
                        players[i].snake.mirroring();
                        break;
                    default:
                        break;
                }
                ;

                powerUp.removeMesh();
                powerUpArr.shift();
            }
        }

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

//Random numbers for powerUp sort
function randomPower(){
    Math.floor(Math.random()*8);
};