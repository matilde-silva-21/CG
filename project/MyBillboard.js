import { CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyQuad } from "./MyQuad.js";

export class MyBillboard{
    constructor(scene, shader, appearance, texture){
        this.scene = scene
        this.shader = shader
        this.appearance = appearance
        this.texture = texture
        this.quad = new MyQuad(scene)
        
        this.scaleRng = Math.random()*6
    }
    display(x, y, z){
        x*=8
        y*=8
        z*=8
        let cameraPosition = this.scene.camera.position
        
        let angleVector = vec3.fromValues(cameraPosition[0]-x, 0, cameraPosition[2]-z)
        vec3.normalize(angleVector, angleVector)


        let normalVector = vec3.fromValues(this.quad.normals[0], 0, this.quad.normals[2])

        let axisVector = vec3.create()
        vec3.cross(axisVector, normalVector, angleVector)
        let acos = Math.acos(vec3.dot(normalVector, angleVector))


        this.scene.pushMatrix()
        this.scene.translate(x, y+this.scaleRng/2, z)
        this.scene.rotate(acos, 0, axisVector[1], 0)
        this.scene.scale(8+this.scaleRng, 8+this.scaleRng, 8+this.scaleRng)
        this.scene.setActiveShader(this.shader)
        this.appearance.apply()
        this.texture.bind(1)
        this.quad.display()

        this.scene.popMatrix()
    
    }
}