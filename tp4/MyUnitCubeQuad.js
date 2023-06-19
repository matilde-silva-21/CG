import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';

/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject{
    constructor(scene, text1, text2, text3, text4, text5, text6) {
		super(scene);
        this.scene = scene
        this.quad = new MyQuad(scene)
        this.text1 = text1; //topo (+Y)
        this.text2 = text2; //frente (+Z)
        this.text3 = text3; //direita (+X)
        this.text4 = text4; //trás (-Z)
        this.text5 = text5; //esquerda (-X)
        this.text6 = text6; //fundo (-Y)
	}

    display(){

        this.scene.pushMatrix()
        
        this.scene.translate(0, 0, 0.5) //front
        this.text5.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        
        this.quad.display();

        this.scene.popMatrix()
        this.scene.pushMatrix()

        this.scene.translate(0, 0, -0.5) //back
        this.scene.rotate(Math.PI, 0 , 1, 0)
        this.text4.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.quad.display()

        this.scene.popMatrix()
        this.scene.pushMatrix()

        this.scene.translate(0, 0.5, 0)
        this.scene.rotate(-Math.PI/2, 1, 0, 0)//top
        this.text1.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display()

        this.scene.popMatrix()
        this.scene.pushMatrix()

        this.scene.translate(0, -0.5, 0) //botom
        this.scene.rotate(Math.PI/2, 1, 0, 0)
        this.text6.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display()

        this.scene.popMatrix()
        this.scene.pushMatrix()

        this.scene.translate(0.5, 0, 0) //right
        this.scene.rotate(Math.PI/2, 0, 1, 0)
        this.text3.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display()

        this.scene.popMatrix()
        this.scene.pushMatrix()

        this.scene.translate(-0.5, 0, 0) //left
        this.scene.rotate(-Math.PI/2, 0, 1, 0)
        this.text5.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.quad.display()

        this.scene.popMatrix()
    }
}