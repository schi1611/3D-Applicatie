/**
 * Created by EverdienvanderWerff on 10-10-2017.
 */
class Snake{
    constructor(posX, posZ, color){
        this.size = 3;
        this.posY = this.size;
        this.speed = 0.2;
        this.rotateSpeed = Math.PI * 0.1;
        this.trail = true;
        this.material = new THREE.MeshPhongMaterial({
            color: color,
            specular: 0x7c7c7c,
            shininess: 10
        });
        this.sphere = new THREE.Mesh(new THREE.SphereGeometry( this.size, 32, 32 ), this.material);
        this.sphere.position.set(posX, this.posY, posZ);
        scene.add(this.sphere);
        this.oldPos = new THREE.Vector3().copy(this.sphere.position);

        //line trail
        //this.materialTrail = new THREE.LineBasicMaterial({ color: 0x0000ff });
        //this.linePoints = [new THREE.Vector3().copy(this.sphere.position)];
    }

    move(){
        this.sphere.position.x -= -Math.sin(this.sphere.rotation.y) * this.speed;
        this.sphere.position.z -= Math.cos(this.sphere.rotation.y) * this.speed;

        //line trail
        //var newPos = new THREE.Vector3().copy(this.sphere.position);
        //this.linePoints.push(newPos);
        // scene.remove(this.line);
        // this.geometry = new THREE.Geometry();
        // this.geometry.vertices = this.linePoints;
        // this.line = new THREE.Line(this.geometry, this.materialTrail);
        // scene.add(this.line);

        //3d trail
        var newPos = new THREE.Vector3().copy(this.sphere.position);
        var trail3d = cylinderMesh(this.oldPos, newPos, this.material, this.size);
        scene.add(trail3d);
        this.oldPos = newPos;
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
function cylinderMesh(pointX, pointY, material, size) {
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