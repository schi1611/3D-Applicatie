/**
 * Created by Jeltje on 10-10-2017.
 */
class PowerUps {
    constructor(xPos, zPos) {

        this.size = 3;
        this.yPos = this.size;

        this.material = new THREE.MeshPhongMaterial({
            color: 0xFFFFFF,
            specular: 0x7c7c7c,
            shininess: 10
        });

        this.powerUpMesh = new THREE.Mesh(new THREE.SphereGeometry(this.yPos, 32, 32), this.material);
        this.powerUpMesh.position.set(xPos, this.yPos, zPos);
        scene.add(this.powerUpMesh);

    }

        removeMesh(name){
            scene.remove(name);
        }
}




