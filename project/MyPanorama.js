import { CGFappearance, CGFobject, CGFshader } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";

export class MyPanorama{
    constructor(scene, texture, center){
        this.scene = scene
        this.material = new CGFappearance(this.scene)
        this.material.setAmbient(1.0, 1.0, 1.0, 1);
        this.material.setDiffuse(0.0, 0.0, 0.0, 1);
        this.material.setSpecular(0.0, 0.0, 0.0, 1);
        this.material.setEmission(1.0, 1.0, 1.0, 0.0)
        this.material.setTexture(texture);
        this.material.setTextureWrap('REPEAT', 'REPEAT');
        this.center = center
        this.sphere = new MySphere(this.scene, 30, 30, true, false)
    }

    dispay(center){
        this.scene.pushMatrix()
        this.scene.translate(center[0], center[1], center[2])
        this.scene.scale(200, 200, 200)
        this.material.apply()
        this.sphere.display()
        this.scene.popMatrix()
    }
} 