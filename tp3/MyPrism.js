import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
	
    constructor(scene, slices, stacks){
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }
	
	initBuffers() {

        this.vertices = [];
        this.indices = [];
        this.normals = [];

        let x_coord = 0, y_coord = 0, z_coord = 0, hypothenuse = 1;

        let thickness = 1/this.stacks; 

        let teta_angle = 2*Math.PI / this.slices;

        let alpha_angle = teta_angle / 2;

        // criar os vertices todos de cada stack do prisma

        for(let j = 0; j < this.stacks ; j++){
            for(let i = 0; i < this.slices ; i++){
                x_coord = Math.cos(teta_angle*i)*hypothenuse;
                y_coord = Math.sin(teta_angle*i)*hypothenuse;

                // primeiro vertice é (0,0,z)
                this.vertices.push(0, 0, z_coord);
                this.vertices.push(x_coord, y_coord, z_coord);

                x_coord = Math.cos(teta_angle*(i+1))*hypothenuse;
                y_coord = Math.sin(teta_angle*(i+1))*hypothenuse;
                this.vertices.push(x_coord, y_coord, z_coord);
            }
            z_coord += thickness;
        }

        // fazer as normais + indices das faces

        for(let i = 0; i < this.vertices.length; i++){
            this.indices.push(i);
            if(i%3 == 0){this.normals.push(0, 0, 0); continue;}
            this.normals.push(Math.cos(alpha_angle+(Math.trunc(i/3))*teta_angle), Math.sin(alpha_angle+(Math.trunc(i/3))*teta_angle), 0);
        }

        // criar as ligacoes entre cada face
        
        for(let j = 0; j < this.stacks; j++){
            for(let i = 1; i < (this.slices)*3 ; i+=3){
                this.indices.push(i);
                this.indices.push(i+1);
                this.indices.push((this.slices)*3*j + i + 1);
            }
    
            for(let i = 1; i < (this.slices)*3 ; i+=3){
                this.indices.push((this.slices)*3*j + i + 1);
                this.indices.push((this.slices)*3*j + i);
                this.indices.push(i);
            }
        }
        
        

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

}
