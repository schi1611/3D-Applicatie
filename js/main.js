let scene, renderer, camera, player, players = [];
let height = window.innerHeight;
let width = window.innerWidth;
let game;
let raycaster = new THREE.Raycaster();
let cGroup = new THREE.Group();
let powerUpArr = [];
let waitTime = 10000;
let allTrails = [];
let paused = false;
let timeoutfunction;

function collision(speedx, speedy, speedz, _line, i, newPos) {
    if (line) {
        scene.remove(_line);
    }

    // Draw a line from pointA in the given direction at distance 100
    let pointA = newPos;
    let direction = new THREE.Vector3(speedx,speedy,speedz).normalize();
    direction = new THREE.Vector3().multiplyVectors(direction, new THREE.Vector3(-1,0,-1));

    let distance = 1; // at what distance to determine pointB

    let pointB = new THREE.Vector3();
    pointB.addVectors ( pointA, direction.multiplyScalar( distance ) );

    let geometry = new THREE.Geometry();
    geometry.vertices.push( pointA );
    geometry.vertices.push( pointB );
    let material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
    _line = new THREE.Line( geometry, material );
    scene.add( _line );

    raycaster.set( newPos, direction);

    // calculate objects intersecting the picking ray
    let intersects = raycaster.intersectObjects( allTrails );

    if(intersects.length > 0){
        let intersection = intersects[0];
        //console.log("intersects found");
        if(intersection.distance < 1){
            players[i].snake.collision();
            players[i].loser = true;
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
    let canvasContainer = document.getElementById('canvas');
    canvasContainer.appendChild(renderer.domElement);

    let ground = new THREE.Mesh( new THREE.PlaneBufferGeometry(width/4,height/4,2,2), new THREE.MeshPhongMaterial( { color: 0xf0f0f0 } ));
    ground.position.z = -10;
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);
    scene.add(cGroup);

    // Models/material loading!
    let mtlLoader = new THREE.MTLLoader();
    mtlLoader.load("Models/PlayGround.mtl", function(materials){

        materials.preload();
        let objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);

        objLoader.load("Models/PlayGround.obj", function(mesh){

            mesh.traverse(function(node){
                if( node instanceof THREE.Mesh ){
                    //node.castShadow = true;
                    node.receiveShadow = true;
                }
            });

            scene.add(mesh);
            mesh.scale.set(width/1495,height/1460,1);
            mesh.rotation.x = -Math.PI/2;
            mesh.position.set(0.3,0,-7);
        });

    });

    addLights();

    camera.lookAt(new THREE.Vector3(0,0,0));

    game = new Game();
}

let line = undefined;
let line2 = undefined;
let line3 = undefined;
let line4 = undefined;
let line5 = undefined;

function animate() {
    requestAnimationFrame(animate);

    let countWinners = 0;
    let winner;

    //array of the trails of all snakes
    allTrails = [];
    for(let i = 0; i < players.length; i++){
        allTrails = allTrails.concat(players[i].snake.trailArr);
        if(!players[i].loser){
            countWinners++;
            winner = players[i];
        }
    }

    if(countWinners === 1){
        //alert("player" + winner.name + " Winner!")
        winner.snake.speed = 0;
        paused = true;
        document.getElementById("gameover").innerHTML = "<p>The winner is Player " + winner.name + "!</p>";
        document.getElementById("win").style.display = "block";
    }

    for (let i = 0; i < players.length; i++) {

        let speedx;
        let speedz;

        let newPos = new THREE.Vector3(players[i].snake.sphere.position.x, players[i].snake.sphere.position.y, players[i].snake.sphere.position.z);
        newPos.x -= -Math.sin(players[i].snake.sphere.rotation.y) * players[i].snake.speed;
        newPos.z -= Math.cos(players[i].snake.sphere.rotation.y) * players[i].snake.speed;

        speedx = -Math.sin(players[i].snake.sphere.rotation.y) * players[i].snake.speed;
        speedz = Math.cos(players[i].snake.sphere.rotation.y) * players[i].snake.speed;

        line = collision(speedx, 0, speedz, line, i, newPos);

        speedx = -Math.sin(players[i].snake.sphere.rotation.y + 0.8) * players[i].snake.speed;
        speedz = Math.cos(players[i].snake.sphere.rotation.y + 0.8) * players[i].snake.speed;

        line2 = collision(speedx, 0, speedz, line2, i, newPos);

        speedx = -Math.sin(players[i].snake.sphere.rotation.y - 0.8) * players[i].snake.speed;
        speedz = Math.cos(players[i].snake.sphere.rotation.y - 0.8) * players[i].snake.speed;

        line3 = collision(speedx, 0, speedz, line3, i, newPos);

        //for collision going down in jump
        line4 = collision(0, (players[i].snake.sphere.position.y * players[i].snake.speed), 0, line4, i, newPos);
    }

    for(let i = 0; i < players.length; i++)
    {
        for(let j = 0; j < powerUpArr.length; j++){
                let xd = players[i].snake.sphere.position.x - powerUpArr[j].powerUpMesh.position.x;
                let zd = players[i].snake.sphere.position.z - powerUpArr[j].powerUpMesh.position.z;

                let sumRadius = (players[i].snake.size + powerUpArr[j].size);
                let sqrSumRadius = sumRadius * sumRadius;
                let distSqr = (xd * xd) + (zd * zd);

                if (distSqr <= sqrSumRadius) {
                    let that = players[i];
                    switch (powerUpArr[j].sort) {
                        case 1:
                            players[i].snake.bigger();
                            //let that = players[i];
                            timeoutfunction = setTimeout(function(){that.snake.smaller();}, waitTime);
                            break;
                        case 2:
                            players[i].snake.smaller();
                           //let that = players[i];
                            timeoutfunction = setTimeout(function(){that.snake.bigger();}, waitTime);
                            break;
                        case 3:
                            players[i].snake.faster();
                            //let that = players[i];
                            timeoutfunction = setTimeout(function(){that.snake.slower();}, waitTime);
                            break;
                        case 4:
                            players[i].snake.slower();
                            //let that = players[i];
                            timeoutfunction = setTimeout(function(){that.snake.faster();}, waitTime);
                            break;
                        case 5:
                            //all snake trails removed
                            for(let k = 0; k < players.length; k++){
                                players[k].snake.eraser();
                            }
                            break;
                        case 6:
                            players[i].snake.moreJumps();
                            //let that = players[i];
                            timeoutfunction = setTimeout(function(){that.snake.lessJumps();}, waitTime);
                            break;
                        case 7:
                            players[i].snake.mirroring();
                            //let that = players[i];
                            timeoutfunction = setTimeout(function(){that.snake.mirroring();}, waitTime);
                            break;
                        default:
                            break;
                    }

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
    renderer.setClearColor (0x9FE5E5, 1);
    renderer.render(scene, camera);
}

//Adds lights to scene
function addLights() {
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    let light = new THREE.PointLight(0xffffff, 1, height/2);
    light.position.set(0, 150, -height/4);
    light.castShadow = true;
    light.shadow.camera.near = 100;
    light.shadow.camera.far = height*width;
    scene.add(light);

    let light2 = light.clone();
    light2.position.set(0,150,height/4);
    scene.add(light2);
}

//timer for placing powerups
function addPowerUps(){
    if(!paused){
        powerUpArr.push(new PowerUps());
        setTimeout(addPowerUps,  Math.random() * (15000 - 8000) + 3000);
    }
}

//Resizes window after window size changed
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}