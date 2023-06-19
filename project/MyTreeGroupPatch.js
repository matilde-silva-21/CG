import { MyBillboard } from "./MyBillboard.js"

export class MyTreeGroupPatch{
    constructor(scene, shader, treeAppearances, treeTextures){
        this.scene = scene
        this.shader = shader
        this.treeAppearances = treeAppearances
        this.treeTextures = treeTextures
        
        this.trees = []
        this.offsets = []
        this.randomreds = []
        this.randomgreens = []

        for (let i =0; i < 9; i++) this.offsets.push(Math.random()*0.3)
        for (let i = 0; i < 9; i++){
            let rng = Math.floor(Math.random() * 3)
            let tree = new MyBillboard(scene, this.shader, this.treeAppearances[rng], this.treeTextures[rng])
            this.trees.push(tree)

            this.randomreds.push(Math.random())
            this.randomgreens.push(Math.random())
        } 
        this.coords = [
            [-1.5, 0, -1.5],
            [0, 0, -1.5],
            [1.5, 0, -1.5],
            [-1.5, 0, 0],
            [0, 0, 0],
            [1.5, 0, 0],
            [-1.5, 0, 1.5],
            [0, 0, 1.5],
            [1.5, 0, 1.5]
        ]
        

        
    }
    display(x, y, z, o){
        this.scene.pushMatrix()
        this.scene.rotate(o, 0, 1, 0)

        for(let i = 0; i < 9; i++){
        
        this.shader.setUniformsValues({randomRed: this.randomreds[i]})
        this.shader.setUniformsValues({randomGreen: this.randomgreens[i]})
            this.trees[i].display(
                x+this.coords[i][0]+this.offsets[i],
                y+this.coords[i][1],
                z+this.coords[i][2]+this.offsets[i]
                )
        }

        this.scene.popMatrix()
    }
}