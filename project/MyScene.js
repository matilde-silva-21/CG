import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyBird } from "./MyBird.js";
import { MyPlane } from "./MyPlane.js";
import { MySphere } from "./MySphere.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import { MyTorus } from "./MyTorus.js";
import { MyCylinder } from "./MyCylinder.js";
import { MyNest } from "./MyNest.js";
import { MyBillboard } from "./MyBillboard.js";
import { MyTreeGroupPatch } from "./MyTreeGroupPatch.js";
import { MyTreeRowPatch } from "./MyTreeRowPatch.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    
    super();

  }

  createTexture(texturePath){
    let texture = new CGFappearance(this);
    texture.setAmbient(0.9, 0.9, 0.9, 1);
    texture.setDiffuse(0.9, 0.9, 0.9, 1);
    texture.setSpecular(0.1, 0.1, 0.1, 1);
    texture.setShininess(10.0);
    texture.loadTexture(texturePath);
    texture.setTextureWrap('REPEAT', 'REPEAT');

    return texture;
  }

  checkKeys(){
    var text = "Keys pressed: ";
    var keysPressed = false;

    // Check for key codes e.g. in https://keycode.info/

    if(this.gui.isKeyPressed("KeyW")){
      text+="W";
      keysPressed=true;

      this.bird.accelerate(1);
    }

    if(this.gui.isKeyPressed("KeyS")){
      text+="S";
      keysPressed=true;

      this.bird.accelerate(-1);
    }

    if(this.gui.isKeyPressed("KeyA")){
      text+="A";
      keysPressed=true;

      this.bird.turn(1);
    }

    if(this.gui.isKeyPressed("KeyD")){
      text+="D";
      keysPressed=true;

      this.bird.turn(-1);
    }

    if(this.gui.isKeyPressed("KeyP")){
      text+="P";
      keysPressed=true;

      this.bird.startDive();
    }

    if(this.gui.isKeyPressed("KeyO")){
      text+="O";
      keysPressed=true;

      this.bird.dropEgg();
    }

    if(this.gui.isKeyPressed("KeyR")){
      text+="R";
      keysPressed=true;
      this.bird.reset();
    }

    if(keysPressed){
      console.log(text);
    }

  }

  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.speedFactor = 1;
    this.birdScaleFactor = 1;
    this.bird_velocity = 0;
    this.bird_x = 0, this.bird_y = 0, this.bird_z = 0;
    this.t = 0;

    //Tree textures, appearances and shader 
    let treeAppearances = []
    let treeTextures = []
    let paths = ["images/billboardtree.png", "images/tree2.png", "images/tree3.png"]

    for(let i =0; i < 3; i++){
      let textureTree = new CGFtexture(this, paths[i]);
      let appearanceTree = new CGFappearance(this);
      appearanceTree.setTexture(textureTree);
      appearanceTree.setTextureWrap('REPEAT', 'REPEAT');
      treeAppearances.push(appearanceTree)
      treeTextures.push(textureTree)
    }

    this.shaderTree = new CGFshader(this.gl, "shaders/tree.vert", "shaders/tree.frag")
    this.shaderTree.setUniformsValues({ uSampler: 1 })
    this.shaderTree.setUniformsValues({ randomRed: 0 })
    this.shaderTree.setUniformsValues({ randomGreen: 0 })
    

    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.bird = new MyBird(this, 0, this.bird_velocity, this.bird_x, this.bird_y, this.bird_z);
    this.enableTextures(true);

    this.panText = new CGFtexture(this, "images/panorama4.jpg")
    this.eggText = new CGFtexture(this, "images/egg.png")
    this.egg_array = [];

    this.panorama = new MyPanorama(this, this.panText)

    this.terrainMaterial = new CGFappearance(this)
    this.terrainMaterial.setAmbient(0.0, 0.0, 0.0, 1);
    this.terrainMaterial.setDiffuse(0.0, 0.0, 0.0, 1);
    this.terrainMaterial.setSpecular(0.0, 0.0, 0.0, 1);
    this.terrainMaterial.setEmission(0.0, 0.0, 0.0, 1.0);

    this.terrain = new MyTerrain(this) 
    this.nest = new MyNest(this);

    this.egg1 = new MyBirdEgg(this, this.eggText, [-95*2.53, -44*2.53, 2.53*-30])
    this.egg2 = new MyBirdEgg(this, this.eggText, [-60*2.53, -44*2.53, 2.53*-10])
    this.egg3 = new MyBirdEgg(this, this.eggText, [-64*2.53, -44*2.53, 2.53* 20])
    this.egg4 = new MyBirdEgg(this, this.eggText, [-90*2.53, -44*2.53, 2.53 * 5])
    this.egg5 = new MyBirdEgg(this, this.eggText, [-51*2.53, -44*2.53, 2.53*-26])
    this.egg6 = new MyBirdEgg(this, this.eggText, [-85*2.53, -44*2.53, 2.53* 42])
    
    this.egg_array.push(this.egg1, this.egg2, this.egg3, this.egg4, this.egg5, this.egg6)
    
    this.tree3x3_1 = new MyTreeGroupPatch(this, this.shaderTree, treeAppearances, treeTextures)
    this.tree3x3_2 = new MyTreeGroupPatch(this, this.shaderTree, treeAppearances, treeTextures)
    this.treeRow_1 = new MyTreeRowPatch(this, this.shaderTree, treeAppearances, treeTextures)
    this.treeRow_2 = new MyTreeRowPatch(this, this.shaderTree, treeAppearances, treeTextures)
    
    this.setActiveShader(this.defaultShader)
    
    this.setUpdatePeriod(50);
  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      1.3,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.4, 0.4, 0.4, 1.0);
    this.setDiffuse(0.9, 0.9, 0.9, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }


  update(t) {
		this.checkKeys();
    this.t = t;
	}

  displayEggs(){
    this.egg_array.forEach(element => {
      element.display();
    });
  }

  resetEggCoords(){
    this.egg_array.forEach(element => {
      element.position = element.og_position;
    })
  }

  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();
    
    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section


    this.pushMatrix()
    this.panorama.dispay(this.camera.position)
    this.popMatrix()

    this.nest.display();    
    this.displayEggs();
    
    this.pushMatrix()
    this.terrainMaterial.apply()
    this.terrain.display()
    this.popMatrix()
    
    //place trees
    this.pushMatrix()
    this.tree3x3_1.display(-11.5, -5.2, 4, 0)
    this.tree3x3_2.display(-8, -5.2, -9, Math.PI/4)
    this.treeRow_1.display(-12, -5.2, 3.5, -Math.PI/5)
    this.treeRow_2.display(-3, -5.2, -13, Math.PI/3.5)
    this.setActiveShader(this.defaultShader)
    this.popMatrix()


    this.bird.updateBirdCoordinates(this.birdScaleFactor, this.speedFactor);

    this.bird.display();


    // ---- END Primitive drawing section
    // eggs in terrain
    // [-95*2.53, -44*2.53, 2.53*-30]
    // [-60*2.53, -44*2.53, 2.53*-10]
    // [-64*2.53, -44*2.53, 2.53* 20]
    // [-90*2.53, -44*2.53, 2.53 * 5]
    // [-51*2.53, -44*2.53, 2.53*-26]
    // [-85*2.53, -44*2.53, 2.53* 42]

    // eggs in nest    
    // [-70*2.6, -110.88, -51*2.6]
    // [-70*2.6, -110.88, -49*2.6]
    // [-71*2.6, -110.88, -48*2.6]
    // [-71*2.6, -110.88, -50*2.6]
    // [-71*2.6, -110.88, -52*2.6]
    // [-72.3*2.6, -110.88, -47.5*2.6]
    // [-72.3*2.6, -110.88, -49.5*2.6]
    // [-72.3*2.6, -110.88, -51.5*2.6]
    // [-73.5*2.6, -110.88, -48*2.6]
    // [-73.5*2.6, -110.88, -50*2.6]
    // [-73.5*2.6, -110.88, -52*2.6]
    // [-74.7*2.6, -110.88, -51*2.6]
    // [-74.7*2.6, -110.88, -49*2.6]

  }
}
