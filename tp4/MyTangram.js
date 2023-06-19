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
export class MyTangram extends CGFobject{
    constructor(scene, texture) {
		super(scene);
        this.scene = scene
        this.diamond = new MyDiamond(this.scene);
        this.blue_triangle = new MyTriangleBig(this.scene, true);
        this.orange_triangle = new MyTriangleBig(this.scene, false);
        this.pink_triangle = new MyTriangle(this.scene)
        this.red_triangle = new MyTriangleSmall(this.scene, true)
        this.parallelogram = new MyParallelogram(this.scene);
        this.purple_triangle = new MyTriangleSmall(this.scene, false)
        this.texture = texture
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

    this.scene.pushMatrix()
    this.scene.multMatrix(shift_tranlation)
    this.scene.pushMatrix()

    this.scene.multMatrix(diaTranslation);
    this.texture.apply()
    this.diamond.display();

    this.scene.popMatrix()
    this.scene.pushMatrix()

    this.scene.multMatrix(blue_translation)
    this.scene.multMatrix(blue_rotation)
    this.texture.apply()
    this.blue_triangle.display()

    this.scene.popMatrix()
    this.scene.pushMatrix()

    this.scene.multMatrix(orange_translation)
    this.scene.multMatrix(orange_rotation)
    this.texture.apply()
    this.orange_triangle.display()

    this.scene.popMatrix()
    this.scene.pushMatrix()
    
    this.scene.multMatrix(pink_translation)
    this.scene.multMatrix(pink_rotation)
    this.texture.apply()
    this.pink_triangle.display()

    this.scene.popMatrix()
    this.scene.pushMatrix()
    
    this.scene.multMatrix(red_translation)
    this.scene.multMatrix(red_rotation)
    this.texture.apply()
    this.red_triangle.display()

    this.scene.popMatrix()
    this.scene.pushMatrix()

    this.scene.multMatrix(paralellogram_translation)
    this.scene.multMatrix(paralellogram_rotation_x)
    this.scene.multMatrix(paralellogram_rotation_z)
    this.texture.apply()
    this.parallelogram.display()

    this.scene.popMatrix()
    this.scene.pushMatrix()

    this.scene.multMatrix(purple_translation)
    this.scene.multMatrix(blue_rotation)
    this.texture.apply()
    this.purple_triangle.display()

    this.scene.popMatrix()
    this.scene.popMatrix()
    this.scene.pushMatrix()
    }
}