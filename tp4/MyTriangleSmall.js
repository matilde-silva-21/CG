import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleSmall extends CGFobject {
	constructor(scene, isRed) {
		super(scene);
		this.isRed = isRed
		this.initBuffers();
		this.initNormalVizBuffers()
	}
	
	initBuffers() {
		this.vertices = [
			0, 1, 0,	//0
			-1, 0, 0,	//1
			1, 0, 0  	//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		]
		if(this.isRed){
			this.texCoords=[
				0.5, 0.5,
				0.25, 0.75,
				0.75, 0.75
			]
		}else{
			this.texCoords=[
				0.25, 0.25,
				0,0,
				0, 0.5
			]
		}

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
	enableNormalViz() {
        super.enableNormalViz();
    }
	updateBuffers(complexity){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}