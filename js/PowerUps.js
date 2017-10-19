/**
 * Created by Jeltje on 10-10-2017.
 */
class PowerUps {
    constructor(xPos, zPos, sort, color) {

        this.size = 4;
        this.yPos = this.size;
        this.sort = sort;

        this.texture = 'img/'+this.sort+'.jpg';
        this.material = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture(this.texture),
            color: color,
            specular: 0x7c7c7c,
            ambient: 0x030303,
            shininess: 4
        });

        this.powerUpMesh = new THREE.Mesh(new THREE.SphereGeometry(this.size, 32, 32), this.material);
        this.powerUpMesh.position.set(xPos, this.yPos, zPos);
        this.powerUpMesh.rotation.x = Math.PI / 2;
        scene.add(this.powerUpMesh);
    }

    removeMesh(){
        scene.remove(this.powerUpMesh);
    }
}




