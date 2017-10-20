/**
 * Created by Jeltje on 10-10-2017.
 */
class PowerUps {
    constructor() {

        this.size = 4;
        this.yPos = this.size;
        this.sort = Math.floor(Math.random()*7)+1;
        //Math.random() * (max - min) + min;
        //Math.floor(Math.random() * 201) - 100;
        this.randomX = Math.floor(Math.random() * ( width/4 - 20 )) - width/8 + 10 ;
        this.randomZ = Math.floor(Math.random() * ( height/4 - 20 )) - height/8 ;

        this.texture = 'img/'+this.sort+'.jpg';
        this.material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(this.texture),
            specular: 0x7c7c7c,
            shininess: 4
        });

        this.powerUpMesh = new THREE.Mesh(new THREE.SphereGeometry(this.size, 32, 32), this.material);
        this.powerUpMesh.position.set(this.randomX, this.yPos, this.randomZ);
        this.powerUpMesh.rotation.x = Math.PI / 2;
        this.powerUpMesh.receiveShadow = true;
        this.powerUpMesh.castShadow = true;
        scene.add(this.powerUpMesh);
    }

    removeMesh(){
        scene.remove(this.powerUpMesh);
    }
}




