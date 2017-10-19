/**
 * Created by Jeltje on 10-10-2017.
 */
class PowerUps {
    constructor(xPos, zPos, sort, color) {

        this.size = 3;
        this.yPos = this.size;
        this.sort = sort;

        this.material = new THREE.MeshPhongMaterial({
            color: color,
            specular: 0x7c7c7c,
            shininess: 10
        });

        this.powerUpMesh = new THREE.Mesh(new THREE.SphereGeometry(this.size, 32, 32), this.material);
        this.powerUpMesh.position.set(xPos, this.yPos, zPos);
        scene.add(this.powerUpMesh);
    }

    removeMesh(){
        scene.remove(this.powerUpMesh);
    }
}




