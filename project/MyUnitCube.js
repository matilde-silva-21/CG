import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            0.5, 0.5, 0.5, //A1
            0.5, 0.5, -0.5, //B1
            0.5, -0.5, 0.5, //C1
			0.5, -0.5, -0.5, //D1

            -0.5, 0.5, 0.5, //E1
            -0.5, 0.5, -0.5, //F1
            -0.5, -0.5, 0.5, //G1
            -0.5, -0.5, -0.5, //H1
			
			0.5, 0.5, 0.5, //A2
            0.5, 0.5, -0.5, //B2
            0.5, -0.5, 0.5, //C2
			0.5, -0.5, -0.5, //D2

            -0.5, 0.5, 0.5, //E2
            -0.5, 0.5, -0.5, //F2
            -0.5, -0.5, 0.5, //G2
            -0.5, -0.5, -0.5, //H2

			0.5, 0.5, 0.5, //A3
            0.5, 0.5, -0.5, //B3
            0.5, -0.5, 0.5, //C3
			0.5, -0.5, -0.5, //D3

            -0.5, 0.5, 0.5, //E13
            -0.5, 0.5, -0.5, //F13
            -0.5, -0.5, 0.5, //G13
            -0.5, -0.5, -0.5, //H13
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 2, 1, // face da direita anterior
            2, 3, 1, // face da direita anterior

            6, 2, 0, // face da esquerda anterior
            0, 4, 6, // face da esquerda anterior

            4, 0, 1, // face de cima
            1, 5, 4, // face de cima

			2, 6, 7, // face de baixo
			2, 7, 3, // face de baixo

			7, 5, 1, // face da direita posterior
			7, 1, 3, // face da direita posterior

			6, 4, 5, // face da esquerda posterior
			5, 7, 6  // face da esquerda posterior

		];

		this.normals = [

			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,

			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,

			0, 1, 0,
			0, 1, 0,
			0, -1, 0,
			0, -1, 0,

			0, 1, 0,
			0, 1, 0,
			0, -1, 0,
			0, -1, 0,

			0, 0, 1,
			0, 0, -1,
			0, 0, 1,
			0, 0, -1,

			0, 0, 1,
			0, 0, -1,
			0, 0, 1,
			0, 0, -1,
			];

			this.texCoords = [
				0, 1,
				1, 1,
				0, 0,
				1, 0
			]
		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

