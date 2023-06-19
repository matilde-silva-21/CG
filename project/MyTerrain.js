import { CGFtexture, CGFappearance, CGFshader } from '../lib/CGF.js';
import { MyPlane } from './MyPlane.js'

export class MyTerrain{
    constructor(scene){
        this.scene = scene
        this.texture = new CGFtexture(this.scene, "images/terrain.jpg");
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.texture2 = new CGFtexture(this.scene, "images/heightmap.jpg");
        this.texture3 = new CGFtexture(this.scene, "images/altimetry.png")

        this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag")
        this.shader.setUniformsValues({ uSampler2: 1 })
        this.shader.setUniformsValues({ uSampler3: 2 })

        this.plane = new MyPlane(scene, 50)
    }
    display(){
        this.scene.pushMatrix()
        this.appearance.apply()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.setActiveShader(this.shader)
        this.texture2.bind(1)
        this.texture3.bind(2)
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.rotate(-Math.PI, 0, 1, 0)
        this.scene.translate(0,275,0);
        this.scene.scale(400,400, 400);
        this.scene.rotate(-Math.PI/2.0,1,0,0);
        this.plane.display()
        this.scene.popMatrix()

        this.scene.setActiveShader(this.scene.defaultShader)
    }

}