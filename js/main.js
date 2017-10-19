var scene, renderer, camera, snake, player, players, powerUp;
var height = window.innerHeight;
var width = window.innerWidth;
var game;
var raycaster = new THREE.Raycaster();
var cGroup = new THREE.Group();
var powerUpArr = [];
var waitTime = 10000;


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

    powerUp = new PowerUps(20,20,1,0x0000ff);
    powerUpArr.push(powerUp);
    console.log(powerUp.sort);

    var powerUp2 = new PowerUps(40,40,Math.floor(Math.random()*7)+1,0x00ffff);
    powerUpArr.push(powerUp2);
    console.log(powerUp2.sort);

    game = new Game(4,3);
    animate();
};

function animate() {
    requestAnimationFrame(animate);

    raycaster.set( snake.sphere.position, snake.sphere.position.clone().normalize());

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects( snake.boxArr  );

    if(intersects.length > 0){
        var intersection = intersects[0];
        if(intersection.distance < 3.5){
            console.log("HIT");
        }
    }

    for(var i = 0; i < players.length; i++)
    {
        for(var j = 0; j < powerUpArr.length; j++){
                var xd = players[i].snake.sphere.position.x - powerUpArr[j].powerUpMesh.position.x;
                var zd = players[i].snake.sphere.position.z - powerUpArr[j].powerUpMesh.position.z;

                var sumRadius = (players[i].snake.size + powerUpArr[j].size);
                var sqrSumRadius = sumRadius * sumRadius;
                var distSqr = (xd * xd) + (zd * zd);

                if (distSqr <= sqrSumRadius) {
                    switch (powerUpArr[j].sort) {
                        case 1:
                            players[i].snake.bigger();
                            var that = players[i]
                            setTimeout(function(){that.snake.smaller();}, waitTime);
                            break;
                        case 2:
                            players[i].snake.smaller();
                            var that = players[i]
                            setTimeout(function(){that.snake.bigger();}, waitTime);
                            break;
                        case 3:
                            players[i].snake.faster();
                            var that = players[i]
                            setTimeout(function(){that.snake.slower();}, waitTime);
                            break;
                        case 4:
                            players[i].snake.slower();
                            var that = players[i]
                            setTimeout(function(){that.snake.faster();}, waitTime);
                            break;
                        case 5:
                            //all snake trails removed
                            for(var k = 0; k < players.length; k++){
                                players[k].snake.eraser();
                            }
                            break;
                        case 6:
                            players[i].snake.moreJumps();
                            break;
                        case 7:
                            players[i].snake.mirroring();
                            var that = players[i]
                            setTimeout(function(){that.snake.mirroring();}, waitTime);
                            break;
                        default:
                            break;
                    };

                    powerUpArr[j].removeMesh();
                    powerUpArr.splice(powerUpArr.indexOf(powerUpArr[j]), 1);
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
    Math.floor(Math.random()*7)+1;
};