var scene, renderer, camera, snake, player, players = [], powerUp;
var height = window.innerHeight;
var width = window.innerWidth;
var game;
var raycaster = new THREE.Raycaster();
var cGroup = new THREE.Group();
var powerUpArr = [];
var waitTime = 10000;
var allTrails = [];
var placePowerUp = false;

function collision(speedx, speedz, _line, i, newPos) {
    if (line) {
        scene.remove(_line);
    }

    // Draw a line from pointA in the given direction at distance 100
    var pointA = newPos;
    var direction = new THREE.Vector3(speedx,0,speedz).normalize();
    direction = new THREE.Vector3().multiplyVectors(direction, new THREE.Vector3(-1,0,-1));

    var distance = 1; // at what distance to determine pointB

    var pointB = new THREE.Vector3();
    pointB.addVectors ( pointA, direction.multiplyScalar( distance ) );

    var geometry = new THREE.Geometry();
    geometry.vertices.push( pointA );
    geometry.vertices.push( pointB );
    var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
    _line = new THREE.Line( geometry, material );
    scene.add( _line );

    raycaster.set( newPos, direction);

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects( allTrails );

    if(intersects.length > 0){
        var intersection = intersects[0];
        console.log("intersects found");
        if(intersection.distance < 1){
            players[i].snake.collision();
        }
    }

    return _line;
}

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

    addLights();

    // snake = new Snake(0xffff00);
    // snake.faster();
    //
    // player = new Player(0,snake, new Controls("A", "D", "S"));
    // player2 = new Player(1, new Snake(0x0000ff), new Controls("LEFT","RIGHT", " "));
    // player2.snake.faster();
    // players = [player, player2];
    camera.lookAt(new THREE.Vector3(0,0,0));

    // powerUp = new PowerUps();
    // powerUpArr.push(powerUp);
    // console.log(powerUp.sort, powerUp.randomX, powerUp.randomZ);
    //
    // var powerUp2 = new PowerUps();
    // powerUpArr.push(powerUp2);
    // console.log(powerUp2.sort, powerUp2.randomX, powerUp2.randomZ);
    //
    // var powerUp3 = new PowerUps();
    // powerUpArr.push(powerUp3);
    // console.log(powerUp3.sort, powerUp3.randomX, powerUp3.randomZ);
    //
    // var powerUp4 = new PowerUps();
    // powerUpArr.push(powerUp4);
    // console.log(powerUp4.sort, powerUp4.randomX, powerUp4.randomZ);
    //
    // var powerUp5 = new PowerUps();
    // powerUpArr.push(powerUp5);
    // console.log(powerUp5.sort, powerUp5.randomX, powerUp5.randomZ);
    //
    // var powerUp6 = new PowerUps();
    // powerUpArr.push(powerUp6);
    // console.log(powerUp6.sort, powerUp6.randomX, powerUp6.randomZ);
    //
    // var powerUp7 = new PowerUps();
    // powerUpArr.push(powerUp7);
    // console.log(powerUp7.sort, powerUp7.randomX, powerUp7.randomZ);

    game = new Game();

    timerPowerUp();

    //animate();
};

var line = undefined;
var line2 = undefined;
var line3 = undefined;

function animate() {
    requestAnimationFrame(animate);

    //power-up on random time
    //setTimeout(function(){powerUpArr.push(new PowerUps());}, Math.random() * (30000 - 15000) + 15000);

    //array of the trails of all snakes
    allTrails = [];
    for(var i = 0; i < players.length; i++){
        allTrails = allTrails.concat(players[i].snake.trailArr);
    }

    for (var i = 0; i < players.length; i++) {

        var speedx;
        var speedz;

        var newPos = new THREE.Vector3(players[i].snake.sphere.position.x, players[i].snake.sphere.position.y, players[i].snake.sphere.position.z);
        newPos.x -= -Math.sin(players[i].snake.sphere.rotation.y) * players[i].snake.speed;
        newPos.z -= Math.cos(players[i].snake.sphere.rotation.y) * players[i].snake.speed;

        speedx = -Math.sin(players[i].snake.sphere.rotation.y) * players[i].snake.speed;
        speedz = Math.cos(players[i].snake.sphere.rotation.y) * players[i].snake.speed;

        line = collision(speedx, speedz, line, i, newPos);

        speedx = -Math.sin(players[i].snake.sphere.rotation.y + 0.8) * players[i].snake.speed;
        speedz = Math.cos(players[i].snake.sphere.rotation.y + 0.8) * players[i].snake.speed;

        line2 = collision(speedx, speedz, line2, i, newPos);

        speedx = -Math.sin(players[i].snake.sphere.rotation.y - 0.8) * players[i].snake.speed;
        speedz = Math.cos(players[i].snake.sphere.rotation.y - 0.8) * players[i].snake.speed;

        line3 = collision(speedx, speedz, line3, i, newPos);
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
                            setTimeout(function(){that.snake.lessJumps();}, waitTime);
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

//Adds lights to scene
function addLights() {
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

//timer for placing powerups
function timerPowerUp(){
    powerUpArr.push(new PowerUps());
    setTimeout(timerPowerUp,  Math.random() * (15000 - 3000) + 3000);
}

//Resizes window after window size changed
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
};