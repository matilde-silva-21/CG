import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
		this.initNormalVizBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			0, 0, 0,
            2, 0, 0,
            3, 1, 0,
            1, 1, 0,

            0, 0, 0,
            2, 0, 0,
            3, 1, 0,
            1, 1, 0
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			2, 0, 1,
            2, 3, 0,

            4, 7, 6,
            4, 6, 5
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		]

		this.texCoords = [
			0.25, 0.75,
			0.75, 0.75,
			1, 1,
			0.5, 1,
			
			0.25, 0.75,
			0.75, 0.75,
			1, 1,
			0.5, 1,
		]

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