import { CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyTorus } from "./MyTorus.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyUnitCube } from "./MyUnitCube.js";

export class MyNest{
    constructor(scene){

        this.scene = scene
        this.cylinder = new MyCylinder(this.scene, 20, 1)
        this.torus = new MyTorus(this.scene, 20, 0.4, 2, 30);

        this.material = new CGFappearance(this.scene)
        this.material.setAmbient(0.4, 0.4, 0.4, 1);
        this.material.setDiffuse(0.8, 0.8, 0.8, 1);
        this.material.setSpecular(0.0, 0.0, 0.0, 1);
        this.material.setEmission(0.4, 0.4, 0.4, 1.0)
        this.material.setTexture(new CGFtexture(this.scene, "images/nest.jpg"));
        this.material.setTextureWrap('REPEAT', 'REPEAT');

        this.egg_positions = [
            [-70*2.6, -110.88, -51*2.6],
            [-70*2.6, -110.88, -49*2.6],
            [-71*2.6, -110.88, -48*2.6],
            [-71*2.6, -110.88, -50*2.6],
            [-71*2.6, -110.88, -52*2.6],
            [-72.3*2.6, -110.88, -47.5*2.6],
            [-72.3*2.6, -110.88, -49.5*2.6],
            [-72.3*2.6, -110.88, -51.5*2.6],
            [-73.5*2.6, -110.88, -48*2.6],
            [-73.5*2.6, -110.88, -50*2.6],
            [-73.5*2.6, -110.88, -52*2.6],
            [-74.7*2.6, -110.88, -51*2.6],
            [-74.7*2.6, -110.88, -49*2.6]
        ]

        this.occupied_spots = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    }

    display(){
        this.cube = new MyUnitCube(this.scene);
        
        // 4 unidades de diametro
        this.scene.pushMatrix()
        this.scene.translate(-75, -44.5, -52)
        this.scene.scale(2, 2, 2)
        this.scene.rotate(-Math.PI/2, 1, 0, 0)
        this.material.apply()
        this.torus.display()
        this.scene.translate(0, 0, -0.4)
        this.scene.scale(1, 1, 0.5)
        this.scene.scale(2, 2, 1)
        this.cylinder.display()
        this.scene.popMatrix();
    }

    getClosestEggPosition(coords){
        const x = coords[0], z = coords[2];
        let closest_pos = [], min_dist = Number.MAX_VALUE, pos_index;

        for(let i=0; i < 13; i++){
            if(this.occupied_spots[i] === 1){continue;}
            const element = this.egg_positions[i];
            const a = element[0] - x, c = element[2] - z;
            const distance = Math.sqrt(a * a + c * c);
            if(distance < min_dist){
                min_dist = distance;
                closest_pos = element;
                pos_index = i;
            }
        }
        this.occupied_spots[pos_index] = 1;
        return closest_pos;
    }
}