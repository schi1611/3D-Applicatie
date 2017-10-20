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

    powerUp = new PowerUps();
    powerUpArr.push(powerUp);
    console.log(powerUp.sort, powerUp.randomX, powerUp.randomZ);

    var powerUp2 = new PowerUps();
    powerUpArr.push(powerUp2);
    console.log(powerUp2.sort, powerUp2.randomX, powerUp2.randomZ);

    var powerUp3 = new PowerUps();
    powerUpArr.push(powerUp3);
    console.log(powerUp3.sort, powerUp3.randomX, powerUp3.randomZ);

    var powerUp4 = new PowerUps();
    powerUpArr.push(powerUp4);
    console.log(powerUp4.sort, powerUp4.randomX, powerUp4.randomZ);

    var powerUp5 = new PowerUps();
    powerUpArr.push(powerUp5);
    console.log(powerUp5.sort, powerUp5.randomX, powerUp5.randomZ);

    var powerUp6 = new PowerUps(100,100,6,0xffffff);
    powerUpArr.push(powerUp6);
    console.log(powerUp6.sort);

    var powerUp7 = new PowerUps(-100,-100,7,0xffffff);
    powerUpArr.push(powerUp7);
    console.log(powerUp7.sort);

    game = new Game();

    animate();
};

function animate() {
    requestAnimationFrame(animate);

    var speedx;
    var speedz;

    speedx = -Math.sin(snake.sphere.rotation.y) * snake.speed;
    speedz = Math.cos(snake.sphere.rotation.y) * snake.speed;

    var newPos = new THREE.Vector3(snake.sphere.position.x, snake.sphere.position.y, snake.sphere.position.z);
    newPos.x = -Math.sin(snake.sphere.rotation.y) * snake.speed;
    newPos.z = Math.cos(snake.sphere.rotation.y) * snake.speed;

    raycaster.set( newPos, new THREE.Vector3(speedx,0,speedz).normalize());

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects( snake.boxArr );

    if(intersects.length > 0){
        var intersection = intersects[0];
        //console.log("intersects found");
        if(intersection.distance < 1.5){
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
    // scene.add(new THREE.AmbientLight(0x0d0d0d));
    // var directlight = new THREE.DirectionalLight(0xffffff, 0.5);
    // scene.add(directlight);
    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    light = new THREE.PointLight(0xffffff, 1, height/2);
    light.position.set(0, 150, -height/4);
    light.castShadow = true;
    light.shadow.camera.near = 100;
    light.shadow.camera.far = height*width;
    scene.add(light);

    light2 = light.clone();
    light2.position.set(0,150,height/4);
    scene.add(light2);
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