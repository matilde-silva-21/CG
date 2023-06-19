import { CGFappearance, CGFobject } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";

export class MyBirdEgg{
    constructor(scene, texture, position){
        this.sphere = new MySphere(scene, 30, 30, false, false, 1.75)
        this.scene = scene
        this.position = position
        this.texture = texture
        this.material = new CGFappearance(this.scene)
        this.material.setAmbient(0.3, 0.3, 0.3, 1);
        this.material.setDiffuse(0.4, 0.4, 0.4, 1);
        this.material.setSpecular(0.2, 0.2, 0.2, 1);
        this.material.setEmission(0.3, 0.3, 0.3, 1.0)
        this.material.setTexture(texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');

        this.og_position = position;
    }

    getPosition(){
        return [this.position[0]/2.53, this.position[1]/2.53, this.position[2]/2.53];
    }
    
    display(){
        this.scene.pushMatrix()
        this.scene.scale(0.4,0.4, 0.4)
        this.material.apply()
        this.scene.translate(this.position[0], this.position[1], this.position[2])
        this.sphere.display()
        this.scene.popMatrix()
    }
}