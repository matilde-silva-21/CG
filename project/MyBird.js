import {CGFobject, CGFshader} from '../lib/CGF.js';
import { MySphere } from './MySphere.js'
import { MyPyramid } from './MyPyramid.js';
import { MyDiamond } from './MyDiamond.js';
import { MyTriangle } from './MyTriangle.js';
import { MyCone } from './MyCone.js'
import { MyUnitCube } from './MyUnitCube.js';

/**
* MyCone
* @constructor
 * @param scene - Reference to MyScene object
*/
export class MyBird extends CGFobject {
    constructor(scene, orientation, velocity, x, y, z) {
        super(scene);

        this.vertices = []
        this.indices = []

        this.head = new MySphere(this.scene, 10, 10, false, false);
        this.body = new MySphere(this.scene, 10, 10, false, true);
        this.beak = new MyPyramid(this.scene, 4, 1)
        this.tail = new MyCone(this.scene, 35, 1)
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene)
        this.cube = new MyUnitCube(this.scene);

        this.body_color = this.scene.createTexture('textures/cor_corpo_adalberto.png')
        this.eye_color = this.scene.createTexture('textures/cor_olhos_adalberto.png')
        this.beak_color = this.scene.createTexture('textures/cor_bico_adalberto.png')

        this.value = 0;
        this.body_speed = 0;
        this.wing_speed_inc = 0;
        this.up = true;

        this.birdScaleFactor = 0;
        this.speedFactor = 0;

        this.orientation = orientation;
        this.velocity = velocity;

        this.acceleration = 0;

        this.dive = 0;
        this.diving = false;
        this.pickingUpEgg = false;
        this.carrying_egg = false;


        this.egg = -1;
        this.droppingEgg = false;

        this.x = x, this.y = y, this.z = z;
        this.old_y = 0;

        this.vector = [];
        this.landing_position = []
        this.parabola_factor = 0;
        this.inclination = 0;
        this.b_value = 0;
        // speed é o ritmo a que ele oscila, velocity é o ritmo a que ele anda

        this.initBuffers();

    }


    initBuffers() {
        //The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

        

        this.testShaders = [
            new CGFshader(this.scene.gl, "shaders/bird_oscilation.vert", "shaders/bird_oscilation.frag")
        ];

        // additional texture will have to be bound to texture unit 1 later, when using the shader, with "this.texture2.bind(1);"
        this.testShaders[0].setUniformsValues({ uSampler2: 1 });
        this.testShaders[0].setUniformsValues({ timeFactor: 0 })

        
        // Shaders interface variables
        
        this.shadersList = {
            'Bird Oscilation': 0
        };
        
        //this.scene.setUpdatePeriod(50);
        
		this.initGLBuffers();
    }
    
    createLeftWing(){
        // left wing - main structure
        this.scene.pushMatrix()
        this.scene.translate(-0.7,-0.75,-0.5);
        this.scene.scale(0.5, 1, 0.3);
        this.scene.rotate(-Math.PI/30, 0, 0, 1)
        this.scene.rotate(-Math.PI/4, 0, 1, 0)
        this.scene.rotate(-Math.PI/2, 1, 0, 0)
        this.body_color.apply();
        this.diamond.display();
        this.scene.popMatrix()

        
        // left wing - edge
        this.scene.pushMatrix()
        this.scene.translate(-1.34,-0.74,-0.5);
        this.scene.scale(0.3, 0.3, 0.215);
        this.scene.rotate(Math.PI/15, 0, 0, 1)
        this.scene.rotate(-Math.PI, 0, 1, 0)
        this.scene.rotate(-Math.PI/2, 1, 0, 0)
        this.body_color.apply();
        this.triangle.display()
        this.scene.popMatrix()
    }

    createRightWing(){

        // right wing - main structure
        this.scene.pushMatrix()
        this.scene.translate(0.7,-0.75,-0.5);
        this.scene.scale(0.5, 1, 0.3);
        this.scene.rotate(Math.PI/30, 0, 0, 1)
        this.scene.rotate(-Math.PI/4, 0, 1, 0)
        this.scene.rotate(-Math.PI/2, 1, 0, 0)
        this.body_color.apply();
        this.diamond.display();
        this.scene.popMatrix()


        // right wing - edge
        this.scene.pushMatrix()
        this.scene.translate(1.34,-0.74,-0.5);
        this.scene.scale(0.3, 0.3, 0.215);
        this.scene.rotate(-Math.PI/15, 0, 0, 1)
        this.scene.rotate(-Math.PI/2, 0, 1, 0)
        this.scene.rotate(-Math.PI/2, 1, 0, 0)
        this.body_color.apply();
        this.triangle.display()
        this.scene.popMatrix()
    }

    createMainBody(){
        
        //this.scene.setActiveShader(this.testShaders[0]);
        this.scene.scale(0.5, 0.5, 0.5)
        
        // main body
        this.scene.pushMatrix()
        this.scene.scale(0.6, 0.6, 0.6);
        this.body_color.apply();
        this.head.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.scale(0.65, 0.65, 0.65);
        this.scene.translate(0,-1.4,-0.8);
        this.body_color.apply();
        this.body.display()
        this.scene.popMatrix()
        
        // right eye
        this.scene.pushMatrix();
        this.scene.scale(0.12, 0.12, 0.12);
        this.scene.translate(3.2, 1.5, 3);
        this.eye_color.apply();
        this.head.display();
        this.scene.popMatrix();

        // left eye
        this.scene.pushMatrix();
        this.scene.scale(0.12, 0.12, 0.12);
        this.scene.translate(-3.2, 1.5, 3);
        this.eye_color.apply();
        this.head.display();
        this.scene.popMatrix();

        // beak
        this.scene.pushMatrix()
        this.scene.translate(0,0,0.55);
        this.scene.rotate(Math.PI/2, 1, 0, 0)
        this.scene.scale(0.15, 0.2, 0.15);
        this.beak_color.apply();
        this.beak.display()
        this.scene.popMatrix()

        // tail
        this.scene.pushMatrix()
        this.body_color.apply();
        this.scene.translate(0,-0.91,-0.52);
        this.scene.rotate(-Math.PI/2, 0, 0, 1)
        this.scene.rotate(-Math.PI/2, 1, 0, 0)
        this.scene.scale(0.65, 1.3, 0.65);
        this.tail.display()
        this.scene.popMatrix()

        
        
        //this.scene.setActiveShader(this.scene.defaultShader);
        
    }

    rotateBirdWings(){

        // for left wing
        this.scene.pushMatrix() 
        this.scene.scale(0.5, 0.5, 0.5)
        this.scene.scale(1.2, 1, 1.5)
        this.scene.translate(0, 0, 0.15)

        this.scene.translate(-0.348,-0.83,-0.5);
        this.scene.rotate((Math.PI/10) * this.value, 0, 0, 1)
        this.scene.translate(0.348,0.83,0.5); 
        this.createLeftWing();
        this.scene.popMatrix()


        // for right wing
        this.scene.pushMatrix()
        this.scene.scale(0.5, 0.5, 0.5)
        this.scene.scale(1.2, 1, 1.5)
        this.scene.translate(0, 0, 0.15)

        this.scene.translate(0.348,-0.83,-0.5);
        this.scene.rotate(-(Math.PI/10) * this.value, 0, 0, 1)
        this.scene.translate(-0.348,0.83,0.5); 
        this.createRightWing();
        this.scene.popMatrix()

        
        if(this.value > 1){
            this.up = false;
        }
        else if(this.value < -1.546){
            this.up = true;
        }
        
        if(this.up){
            this.value += this.wing_speed_inc;
        }
        else{
            this.value -= this.wing_speed_inc;
        }
    }

    accelerate(v){
        
        if(v == 1){
            if(this.acceleration < 20){
                this.acceleration += this.speedFactor/3;
            }  
        }
       
        else{
            if(this.acceleration <= -1){
                this.acceleration = 0;
            }
            else{
                this.acceleration -= this.speedFactor/3;
            }  
        }
        
    }

    turn(v){
        if(v == 1){
            this.orientation += Math.sin((Math.PI * Math.sqrt(this.speedFactor))/200); 
        }
       
        else{
            this.orientation -= Math.sin((Math.PI * Math.sqrt(this.speedFactor))/200);
        }
    }


    checkForEgg(){
        const eggs = this.scene.egg_array;

        for(let i=0; i<eggs.length ; i++){
            const position = eggs[i].getPosition(), a = position[0] - (this.x-65), b = position[1] - (this.y-40), c = position[2] - (this.z-30);
            const distance = Math.sqrt(a * a + b * b + c * c);
            if(distance < 5 && distance > 0){
                this.carrying_egg = true;
                this.egg = i;
                return i;
            }
        }

        return -1;
    }


    pickUpEgg(){

        if(this.diving){
            this.dive += 0.002

            this.x = this.x + Math.sin(this.orientation) * Math.PI /50
            this.y -= Math.cos(this.dive) / ((Math.PI)*3);
            this.z = this.z + Math.cos(this.orientation) * Math.PI /50;
        }
        else{
            this.dive -= 0.002

            this.x = this.x + Math.sin(this.orientation) * Math.PI / 50
            this.y += Math.cos(this.dive) / ((Math.PI)*3);
            this.z = this.z + Math.cos(this.orientation) * Math.PI / 50;
        }
        
        if(this.dive*10 > 0.5){
            this.diving = false;
            const res = this.checkForEgg();
        }
        
        else if (this.dive*10 < -0.5){this.diving = true;}


        else if(this.old_y < this.y){
            this.dive = 0;
            this.diving = false;
            this.pickingUpEgg = false;
            this.body_speed = 0.1;
        }
    }

    dropEgg(){
        if(this.x > -12 && this.x < -3 && this.z > -26 && this.z < -17 && this.carrying_egg && !this.droppingEgg){
            this.carrying_egg = false;
            this.droppingEgg = true;
            const egg = this.scene.egg_array[this.egg].position;
            this.landing_position = this.scene.nest.getClosestEggPosition(egg);

            this.inclination = (egg[0]-this.landing_position[0])/(egg[1]-this.landing_position[1])
            this.b_value = egg[0] - this.inclination*egg[1]

            this.parabola_factor = (egg[2] - this.landing_position[2]) / ((egg[0]-this.landing_position[0])**2)

        }

    }

    startDive(){
        this.old_y = this.y;
        this.pickingUpEgg = true;
        this.diving = true;
    }

    reset(){
        this.x = 0, this.y = 0, this.z = 0;
        this.orientation = 0;
        this.scene.birdScaleFactor = 1;
        this.scene.speedFactor = 1;
        this.acceleration = 0;
        this.dive = 0;
        this.pickingUpEgg = false;
        this.droppingEgg = false;
        this.carrying_egg = false;
        this.egg = -1;
        this.vector = [];
        this.landing_position = [];
        this.parabola_factor = 0;
        this.inclination = 0;
        this.b_value = 0;
        this.scene.resetEggCoords();
    }
    
    updateEggCoordinates(){

        if(this.egg != -1 && this.carrying_egg && !this.droppingEgg){
            this.scene.egg_array[this.egg].position = [(this.x-64.3)*2.53, (this.y - 1.5 - 40)*2.53, (this.z - 29.5)*2.53]
        }

        if(this.droppingEgg){
            if(this.scene.egg_array[this.egg].position[1] < -110.8){
                this.droppingEgg = false;
                this.egg = -1;
                this.vector = [];
                this.landing_position = [];
                this.parabola_factor = 0;
                this.inclination = 0;
                this.b_value = 0;
            }
            else{
                // For linear descent
                this.scene.egg_array[this.egg].position[1] -= 0.1;
                
                this.scene.egg_array[this.egg].position[0] = this.scene.egg_array[this.egg].position[1]*this.inclination + this.b_value;
                this.scene.egg_array[this.egg].position[2] = this.parabola_factor*((this.scene.egg_array[this.egg].position[0] - this.landing_position[0])**2) + this.landing_position[2]

            }
        }
    }

    updateBirdCoordinates(birdScaleFactor, speedFactor){

        this.birdScaleFactor = birdScaleFactor;
        this.speedFactor = speedFactor;

        this.velocity =  (this.velocity + this.acceleration*this.speedFactor)/5
        if(this.velocity < 0){this.velocity = 0;}

        this.x = this.x + Math.sin(this.orientation) * Math.PI /180 * this.velocity
        if(!this.pickingUpEgg) {this.y = Math.cos(this.speedFactor*this.body_speed) / ((Math.PI)*4);}
        this.z = this.z + Math.cos(this.orientation) * Math.PI / 180 * this.velocity;
        

        this.body_speed += 0.2; //0.03 ubuntu
        this.wing_speed_inc = this.speedFactor/3; //33 ubuntu

        if(this.pickingUpEgg){this.pickUpEgg();}
        this.updateEggCoordinates();
    }

    display(){

        this.scene.pushMatrix()
        // passaro (-65, -34, -30)
        // chao = -43
        this.scene.translate(-65, -40, -30);
        this.scene.translate(this.x, this.y, this.z)
        this.scene.rotate(this.orientation, 0, 1, 0)
        this.scene.translate(0, 0, 0.2)
        this.scene.rotate(this.dive*(Math.PI*2), 1, 0, 0)
        this.scene.scale(this.birdScaleFactor, this.birdScaleFactor, this.birdScaleFactor)
        this.rotateBirdWings();
        this.createMainBody();
        this.scene.popMatrix();
       
    }

    // TODO trajetoria parabolica - https://math.stackexchange.com/questions/2585717/equation-of-a-2d-parabola-in-3d-and-proving-that-the-projection-on-to-basis-pla
    // z = a*x^2
}


