/**
 * Created by EverdienvanderWerff on 10-10-2017.
 */
class Snake{
    constructor(color){
        this.size = 2;
        this.posX = Math.floor(Math.random() * ( width/4 - 20 )) - width/8 + 10 ; //random snake x position
        this.posY = this.size;
        this.posZ = this.randomZ = Math.floor(Math.random() * ( height/4 - 20 )) - height/8 ; //random snake z position
        this.speed = 0.5;
        this.lastSpeed = this.speed;
        this.rotateSpeed = Math.PI * 0.05;
        this.trail = true;
        this.material = new THREE.MeshPhongMaterial({
            color: color,
            specular: 0x7c7c7c,
            shininess: 10
        });
        this.cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        this.sphere = new THREE.Mesh(new THREE.SphereGeometry( this.size, 32, 32 ), this.material);
        this.sphere.position.set(this.posX, this.posY, this.posZ);
        this.sphere.rotation.y = Math.floor(Math.random() * ( 2*Math.PI ))  ;
        this.sphere.receiveShadow = true;
        this.sphere.castShadow = true;
        scene.add(this.sphere);
        this.powerUp = false;

        //trail
        this.oldPos = new THREE.Vector3().copy(this.sphere.position);
        this.oldestPos = new THREE.Vector3().copy(this.sphere.position);
        this.oldRot = this.sphere.rotation.y;
        this.trailArr = [];
        //this.boxArr = [];

        //jump
        this.isJumping = false;
        this.jumpHeight = this.size*3;
        this.jumpSinWavePos = 0;
        //time out jump
        this.waitToJump = 10000;
        this.isAllowedToJump = true;
    }

    move() {
        this.sphere.position.x -= -Math.sin(this.sphere.rotation.y) * this.speed;
        this.sphere.position.z -= Math.cos(this.sphere.rotation.y) * this.speed;

        //jump
        if(this.isJumping){
            // the last position on the sine wave
            var lastHeight = this.jumpSinWavePos;
            // the new position on the sine wave
            this.jumpSinWavePos += this.speed/(this.size*2);
            if (this.jumpSinWavePos >= Math.PI){
                this.sphere.position.y = this.posY;
                //hit ground set isJumping to false
                this.isJumping = false
            } else{
                //move along the sine wave
                this.sphere.position.y -= -(Math.sin(this.jumpSinWavePos) - Math.sin(lastHeight)) * this.jumpHeight;
            }
        }

        //3d trail
        var newRot = this.sphere.rotation.y;
        var newPos = new THREE.Vector3().copy(this.sphere.position);

        if (this.trail) {
            if (newRot == this.oldRot && !this.isJumping && !this.powerUp) {
                //remove old and create new
                var trail3d = this.cylinderMesh(this.oldestPos, newPos, this.material, this.size);
                scene.remove(this.trailArr.pop());
                // var box = this.boxMesh(this.oldestPos, newPos, this.cubeMaterial, this.size*2);
                // scene.remove(this.boxArr.pop());
            } else {
                //create new
                var trail3d = this.cylinderMesh(this.oldPos, newPos, this.material, this.size);
                //var box = this.boxMesh(this.oldPos, newPos, this.cubeMaterial, this.size*2);
                this.oldestPos = newPos;
            }
        }
        else{
            //end old and start new
            var trail3d = this.cylinderMesh(this.oldestPos, this.oldPos, this.material, this.size);
            //var box = this.boxMesh(this.oldestPos, this.oldPos, this.cubeMaterial, this.size*2);
            this.oldestPos = newPos;
        }

        trail3d.receiveShadow = true;
        trail3d.castShadow = true;
        this.trailArr.push(trail3d);
        scene.add(trail3d);
        //this.boxArr.push(box);
        //scene.add(box);
        this.oldPos = newPos;
        this.oldRot = newRot;
        this.trail = true;
    }

    left(){
        this.sphere.rotation.y -= this.rotateSpeed;
    }

    right() {
        this.sphere.rotation.y += this.rotateSpeed;
    }

    collision(){
        this.speed = 0;
    }

    jump(){
        this.isJumping = true;
        this.jumpSinWavePos = 0;
    }

    bigger(){
        this.powerUp = true;
        this.sphere.scale.multiplyScalar(1.5);
        this.size *= 1.5;
        this.move();
        this.powerUp = false;
    }

    smaller(){
        this.powerUp = true;
        this.sphere.scale.multiplyScalar((1/1.5));
        this.size *= (1/1.5);
        this.move();
        this.powerUp = false;
    }

    noTrail(){
        this.trail = false;
    }

    moreJumps(){
        this.waitToJump *= 1/2;
    }

    lessJumps(){
        this.waitToJump *= 2;
    }

    mirroring(){
        this.rotateSpeed *= -1;
    }

    faster(){
        this.speed *= 2;
    }

    slower(){
        this.speed *= 1/2;
    }

    eraser(){
        this.powerUp = true;
        this.move();
        for(var i = 0; i < this.trailArr.length; i++){
            scene.remove(this.trailArr[i]);
        }
        this.trailArr = [];
        this.powerUp = false;
    }

    cylinderMesh(pointX, pointY, material, size) {
    var direction = new THREE.Vector3().subVectors(pointY, pointX);
    var orientation = new THREE.Matrix4();
    orientation.lookAt(pointX, pointY, new THREE.Object3D().up);
    orientation.multiply(new THREE.Matrix4().set(1, 0, 0, 0,
        0, 0, 1, 0,
        0, -1, 0, 0,
        0, 0, 0, 1));
    var edgeGeometry = new THREE.CylinderGeometry(size, size, direction.length()+1, 8, 1);
    var edge = new THREE.Mesh(edgeGeometry, material);
    edge.applyMatrix(orientation);
    // position based on midpoints
    edge.position.x = (pointY.x + pointX.x) / 2;
    edge.position.y = (pointY.y + pointX.y) / 2;
    edge.position.z = (pointY.z + pointX.z) / 2;
    return edge;
    }

    // boxMesh(pointX, pointY, material, size) {
    //     var direction = new THREE.Vector3().subVectors(pointY, pointX);
    //     var orientation = new THREE.Matrix4();
    //     orientation.lookAt(pointX, pointY, new THREE.Object3D().up);
    //     orientation.multiply(new THREE.Matrix4().set(1, 0, 0, 0,
    //         0, 0, 1, 0,
    //         0, -1, 0, 0,
    //         0, 0, 0, 1));
    //     var edgeGeometry = new THREE.BoxGeometry(size, direction.length()+1, size);
    //     var edge = new THREE.Mesh(edgeGeometry, material);
    //     edge.material.visible = false;
    //     edge.applyMatrix(orientation);
    //     // position based on midpoints
    //     edge.position.x = (pointY.x + pointX.x) / 2;
    //     edge.position.y = (pointY.y + pointX.y) / 2;
    //     edge.position.z = (pointY.z + pointX.z) / 2;
    //     return edge;
    // }
}