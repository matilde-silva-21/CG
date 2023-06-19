import {CGFobject, CGFappearance} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram{
    constructor(scene) {
        this.scene = scene
        this.diamond = new MyDiamond(this.scene);
        this.blue_triangle = new MyTriangleBig(this.scene);
        this.orange_triangle = new MyTriangleBig(this.scene);
        this.pink_triangle = new MyTriangle(this.scene);
        this.red_triangle = new MyTriangleSmall(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.purple_triangle = new MyTriangleSmall(this.scene);

        this.material = new CGFappearance(this.scene);
        this.customMaterial= this.scene.customMaterial;
	  }

    display(){
        let diaTranslation = 
      [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        -2, -2.3, 0, 1
      ]
    
    let blue_rotation = 
      [
        Math.cos(3*Math.PI/4), -Math.sin(3*Math.PI/4), 0, 0,
        Math.sin(3*Math.PI/4), Math.cos(3*Math.PI/4), 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ]
    
    let blue_translation = 
      [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        -0.1, -1.4, 0, 1
      ]

    let orange_rotation = 
    [
      Math.cos(3*Math.PI/4), Math.sin(3*Math.PI/4), 0, 0,
      -Math.sin(3*Math.PI/4), Math.cos(3*Math.PI/4), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]

    let orange_translation = 
    [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      -0.1, 1.4, 0, 1
    ]

    let pink_rotation = 
    [
      Math.cos(Math.PI/2), -Math.sin(Math.PI/2), 0, 0,
      Math.sin(Math.PI/2), Math.cos(Math.PI/2), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]

    let pink_translation = 
    [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0.3, -1, 0, 1
    ]

    let red_rotation = 
    [
      Math.cos(Math.PI/2), Math.sin(Math.PI/2), 0, 0,
      -Math.sin(Math.PI/2), Math.cos(Math.PI/2), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]

    let red_translation = 
    [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      -1.5, 2.9, 0, 1
    ]
  
    let paralellogram_rotation_x = 
    [
      1, 0, 0, 0,
      0, Math.cos(Math.PI), -Math.sin(Math.PI), 0,
      0, Math.sin(Math.PI), Math.cos(Math.PI), 0,
      0, 0, 0, 1
    ]

    let paralellogram_rotation_z = 
    [
      Math.cos(3*Math.PI/4), Math.sin(3*Math.PI/4), 0, 0,
      -Math.sin(3*Math.PI/4), Math.cos(3*Math.PI/4), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]

    let paralellogram_translation =
    [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      1.3, -2.8, 0, 1
    ]

    let purple_translation =
    [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0.2, -3.9, 0, 1
    ]
    let shift_tranlation=
    [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0.7, 0 ,0, 1
    ]

  
    this.customMaterial.apply();
    this.scene.multMatrix(shift_tranlation)
    this.scene.pushMatrix()


    this.scene.multMatrix(diaTranslation);
    this.diamond.display();
    
    this.scene.popMatrix()
  
    this.material.setAmbient(0.2, 0.2, 0.2, 1.0);
    this.material.setDiffuse(0.0, 0.0, 0.0, 1.0);
    this.material.setSpecular(0.0, 0.0, 1.0, 1.0);
    this.material.apply()
    this.scene.pushMatrix()
    
    this.scene.multMatrix(blue_translation)
    this.scene.multMatrix(blue_rotation)
    this.blue_triangle.display()
    this.scene.popMatrix()
    this.material.setAmbient(0.2, 0.2, 0.2, 1.0);
    this.material.setDiffuse(0.0, 0.0, 0.0, 1.0);
    this.material.setSpecular(0.0, 0.0, 1.0, 1.0);
    this.material.apply()

    this.material.setAmbient(0.2, 0.2, 0.2, 1.0);
    this.material.setDiffuse(0.0, 0.0, 0.0, 1.0);
    this.material.setSpecular(1.0, 0.5, 0.0, 1.0);
    this.material.apply()
    this.scene.pushMatrix()

    this.scene.multMatrix(orange_translation)
    this.scene.multMatrix(orange_rotation)
    this.orange_triangle.display()

    this.scene.popMatrix()

    this.material.setAmbient(0.2, 0.2, 0.2, 1.0);
    this.material.setDiffuse(0.0, 0.0, 0.0, 1.0);
    this.material.setSpecular(1.0, 0.7, 0.8, 1.0);
    this.material.apply()

    this.scene.pushMatrix()
    
    this.scene.multMatrix(pink_translation)
    this.scene.multMatrix(pink_rotation)
    this.pink_triangle.display()

    this.scene.popMatrix()

    this.material.setAmbient(0.2, 0.2, 0.2, 1.0);
    this.material.setDiffuse(0.0, 0.0, 0.0, 1.0);
    this.material.setSpecular(1.0, 0.0, 0.0, 1.0);
    this.material.apply()

    this.scene.pushMatrix()
    
    this.scene.multMatrix(red_translation)
    this.scene.multMatrix(red_rotation)
    this.red_triangle.display()

    this.scene.popMatrix()

    this.material.setAmbient(0.2, 0.2, 0.2, 1.0);
    this.material.setDiffuse(0.0, 0.0, 0.0, 1.0);
    this.material.setSpecular(1.0, 1.0, 0.0, 1.0);
    this.material.apply()

    this.scene.pushMatrix()

    this.scene.multMatrix(paralellogram_translation)
    this.scene.multMatrix(paralellogram_rotation_x)
    this.scene.multMatrix(paralellogram_rotation_z)
    this.parallelogram.display()

    this.scene.popMatrix()

    this.material.setAmbient(0.2, 0.2, 0.2, 1.0);
    this.material.setDiffuse(0.0, 0.0, 0.0, 1.0);
    this.material.setSpecular(1.0, 0.0, 1.0, 1.0);
    this.material.apply()

    this.scene.pushMatrix()

    this.scene.multMatrix(purple_translation)
    this.scene.multMatrix(blue_rotation)
    this.purple_triangle.display()

    this.scene.popMatrix()
    this.scene.popMatrix()
    this.scene.pushMatrix()
    }

    /*initBuffers() {
      this.primitiveType = this.scene.gl.TRIANGLES;

      this.diamond.initBuffers()
      this.blue_triangle.initBuffers()
      this.orange_triangle.initBuffers()
      this.pink_triangle.initBuffers()
      this.red_triangle.initBuffers()
      this.parallelogram.initBuffers()
      this.purple_triangle.initBuffers()
    }
*/
    updateBuffers(complexity){
      this.diamond.updateBuffers(complexity);
      this.blue_triangle.updateBuffers(complexity);
      this.orange_triangle.updateBuffers(complexity);
      this.pink_triangle.updateBuffers(complexity);
      this.red_triangle.updateBuffers(complexity);
      this.parallelogram.updateBuffers(complexity);
      this.purple_triangle.updateBuffers(complexity);
  }

  enableNormalViz() {
    this.diamond.enableNormalViz()
    this.blue_triangle.enableNormalViz()
    this.orange_triangle.enableNormalViz()
    this.pink_triangle.enableNormalViz()
    this.red_triangle.enableNormalViz()
    this.parallelogram.enableNormalViz()
    this.purple_triangle.enableNormalViz()
  }

  disableNormalViz() {
    this.diamond.disableNormalViz()
    this.blue_triangle.disableNormalViz()
    this.orange_triangle.disableNormalViz()
    this.pink_triangle.disableNormalViz()
    this.red_triangle.disableNormalViz()
    this.parallelogram.disableNormalViz()
    this.purple_triangle.disableNormalViz()

  }
}