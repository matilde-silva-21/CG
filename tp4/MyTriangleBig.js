import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleBig extends CGFobject {
	constructor(scene, isBlue) {
		super(scene);
		this.isBlue = isBlue
		this.initBuffers();
		this.initNormalVizBuffers()
	}
	
	initBuffers() {
		this.vertices = [
			0, 2, 0,	//0
			-2, 0, 0,	//1
			2, 0, 0  	//2
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

		if(this.isBlue == true){
			this.texCoords=[
				0.5, 0.5, //0
				1, 0, //1
				0, 0 //2
			]
		}else{
			this.texCoords=[
				0.5, 0.5,
				1,1,
				1,0
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