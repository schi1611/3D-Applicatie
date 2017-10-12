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
        this.direction = new THREE.Vector3();
        this.direction.set(0.1,0,0);
        this.direction.normalize();
        this.speedDirection = new THREE.Vector3();

        //test trail
        this.materialTrail = new THREE.LineBasicMaterial({ color: 0x0000ff });
        this.linePoints = [new THREE.Vector3().copy(this.sphere.position)];
    }

    move(){
        //this.sphere.position.add(this.speedDirection.copy(this.direction).multiplyScalar(this.speed));
        this.sphere.position.x -= -Math.sin(this.sphere.rotation.y) * this.speed;
        this.sphere.position.z -= Math.cos(this.sphere.rotation.y) * this.speed;
        //test trail
        var newPos = new THREE.Vector3().copy(this.sphere.position);
        this.linePoints.push(newPos);
        scene.remove(this.line);
        this.geometry = new THREE.Geometry();
        this.geometry.vertices = this.linePoints;
        this.line = new THREE.Line(this.geometry, this.materialTrail);
        scene.add(this.line);
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

//trail
function CustomSinCurve( scale ) {

    THREE.Curve.call( this );

    this.scale = ( scale === undefined ) ? 1 : scale;

}

CustomSinCurve.prototype = Object.create( THREE.Curve.prototype );
CustomSinCurve.prototype.constructor = CustomSinCurve;

CustomSinCurve.prototype.getPoint = function ( t ) {

    var tx = t * 3 - 1.5;
    var ty = Math.sin( 2 * Math.PI * t );
    var tz = 0;

    return new THREE.Vector3( tx, ty, tz ).multiplyScalar( this.scale );

};