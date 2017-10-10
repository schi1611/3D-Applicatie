/**
 * Created by EverdienvanderWerff on 10-10-2017.
 */
class Snake{
    constructor(posX, posZ, color){
        this.size = 2;
        this.posY = this.size*1.5;
        this.speed = 0.5;
        this.trail = true;
        this.material = new THREE.MeshPhongMaterial({
            color: color,
            specular: 0x7c7c7c,
            ambient: 0x030303,
            shininess: 10
        });
        this.sphere = new THREE.Mesh(new THREE.SphereGeometry( this.size, 32, 32 ), this.material);
        this.sphere.position.set(posX, this.posY, posZ);
        scene.add(this.sphere);
        this.direction = new THREE.Vector3();
        this.direction.set(0.1,0,0);
        this.direction.normalize();
        this.speedDirection = new THREE.Vector3();
    }

    move(){
        this.sphere.position.add(this.speedDirection.copy(this.direction).multiplyScalar(this.speed));
        scene.add(this.sphere.clone());
    }

    collision(){
        this.speed = 0;
    }

    jump(){

    }

    bigger(){
        this.sphere.scale.multiplyScalar(1.5);
    }

    smaller(){
        this.sphere.scale.multiplyScalar((1/1.5));
    }

    noTrail(){

    }

    moreJumps(){

    }

    mirroring(){

    }

    faster(){
        this.speed *= 2;
    }

    slower(){
        this.speed *= 1/2;
    }

    eraser(){

    }
}