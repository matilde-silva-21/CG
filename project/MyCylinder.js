import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks){
        super(scene);
        this.slices = slices;
        this.stacks = stacks+1;
        this.initBuffers();
    }
	
	initBuffers() {

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        let x_coord = 0, y_coord = 0, z_coord = 0, hypothenuse = 1;

        let thickness = 1/this.stacks; 

        let teta_angle = 2*Math.PI / this.slices;


        // criar os vertices todos de cada stack do prisma

        for(let j = 0; j < this.stacks ; j++){
            this.vertices.push(0,0,z_coord);
            this.texCoords.push(0.5, 0.5);

            for(let i = 0; i < this.slices; i++){
                x_coord = Math.cos(teta_angle*i)*hypothenuse;
                y_coord = Math.sin(teta_angle*i)*hypothenuse;

                this.vertices.push(x_coord, y_coord, z_coord);
                this.texCoords.push((x_coord/hypothenuse)/2 + hypothenuse/2 , (y_coord/hypothenuse)/2 + hypothenuse/2)   
            }
            
            z_coord += thickness;
        }

        // fazer as normais das faces
        this.normals.push(0, 0, 1);

        for(let i = 1; i < (this.slices+1)*this.stacks; i++){
            if(i%(this.slices+1) == 0){
                this.normals.push(0, 0, 1);
                continue;
            }
            this.normals.push(Math.cos(teta_angle*(i%(this.slices+1)-1)), Math.sin(teta_angle*(i%(this.slices+1)-1)), 0);
        }

        
        
        // fazer os indices das faces
        for(let i = 1; i < (this.vertices.length / 3); i++){
            if((i+1)%(this.slices+1) == 0){
                this.indices.push((Math.trunc(i/(this.slices + 1)))*(this.slices + 1));
                this.indices.push(i);
                this.indices.push((Math.trunc(i/(this.slices + 1)))*(this.slices + 1) + 1);

                this.indices.push((Math.trunc(i/(this.slices + 1)))*(this.slices + 1) + 1);
                this.indices.push(i);
                this.indices.push((Math.trunc(i/(this.slices + 1)))*(this.slices + 1));
                continue;
            }
            
            if(i%(this.slices+1) == 0){
                continue;
            }

            this.indices.push((Math.trunc(i/(this.slices + 1)))*(this.slices + 1));
            this.indices.push(i);
            this.indices.push(i+1);

            this.indices.push(i+1);
            this.indices.push(i);
            this.indices.push((Math.trunc(i/(this.slices + 1)))*(this.slices + 1));
            
        }

        // criar as ligacoes entre cada face
        for(let j = 0; j < this.stacks-1; j++){
            let index_of_center = (j*(this.slices+1));

            for(let i = 1; i < this.slices; i++){

                if(i%(this.slices+1) == 0){continue;}

                this.indices.push(index_of_center+i);
                this.indices.push(index_of_center+i+1);
                this.indices.push((index_of_center+(this.slices+1))+i+1);

            }

            this.indices.push((index_of_center+(this.slices+1))-1);
            this.indices.push(index_of_center+1);
            this.indices.push((index_of_center+(this.slices+1))+1);

            for(let i = 1; i < this.slices; i++){

                if(i%(this.slices+1) == 0){continue;}

                this.indices.push((index_of_center+(this.slices+1))+i+1);
                this.indices.push((index_of_center+(this.slices+1))+i);
                this.indices.push(index_of_center+i);
            }

            this.indices.push((index_of_center+(this.slices+1))+1);
            this.indices.push((index_of_center+(this.slices+1))+(this.slices));
            this.indices.push((index_of_center+(this.slices+1))-1);
        }
        
        

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}

}
