import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of divisions around Y-axis
 * @param stacks - Number of divisions around X and Z axis
 * @param isInverted - true: is in panorama mode, false: is in sphere mode
 */
export class MySphere extends CGFobject{
    constructor(scene, slices, stacks, isInverted, halfSphere, ns = 1, ss = 1){
        super(scene);
        this.slices = slices;
        this.stacks = stacks*2;
        this.invertScale = isInverted ? -1 : 1
        this.ns = ns
        this.ss = ss
        this.halfSphere = 1
        if(halfSphere){
            this.halfSphere = 0.5
        }
        this.initBuffers();
    }

    initBuffers(){
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = []
        
        for (let i = 0; i <= this.stacks; i++) {
            const inclination = Math.PI / this.stacks * i ;
            const cosPhi = Math.cos(inclination);
            const sinPhi = Math.sin(inclination);
            const t = i / (this.slices*this.halfSphere*2);
      
            for (let j = 0; j <= this.slices*this.halfSphere; j++) {
                const azimuth = 2 * Math.PI / this.slices * j;
                const cosAzi = Math.cos(azimuth);
                const sinAzi = Math.sin(this.invertScale * azimuth);
        
                const x = sinPhi * cosAzi;
                let y = cosPhi;
                const z = sinPhi * sinAzi;
                let s;
                s = (1-j / (this.stacks/2)) + 0.5 

                y = (y>0) ? y*this.ns : y*this.ss
                this.vertices.push(x, y, z);

                this.normals.push(x, y, z);
                this.texCoords.push(s, t);
            }
        }
    
        for (let i = 0; i < this.stacks; i++) {
            for (let j = 0; j < this.slices*this.halfSphere; j++) {
                const index = i * (this.slices*this.halfSphere + 1) + j;
        
                this.indices.push(index, index + 1, index + this.slices*this.halfSphere + 1);
                this.indices.push(index + 1, index + this.slices*this.halfSphere + 2, index + this.slices*this.halfSphere + 1);
            }
        }
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}