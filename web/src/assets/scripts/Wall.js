import { AcGameObject } from "./AcGameObject";

export class Wall extends AcGameObject{
    constructor(r,c,gamemap){
        super();
        this.r = r;
        this.c = c;
        this.gamemap = gamemap;
    }
    update(){
        this.render();
    }
    render(){
        const L =this.gamemap.L;
        const ctx = this.gamemap.ctx;

        ctx.fillStyle = "#994c00";
        ctx.fillRect(this.c*L,this.r*L,L,L);
    }
}

