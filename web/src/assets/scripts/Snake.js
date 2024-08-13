import { AcGameObject } from "./AcGameObject";
import {Cell} from "./Cell";

export class Snake extends AcGameObject{
    constructor(info,gamemap){
        super();


        this.id = info.id;
        this.color = info.color;
        this.gamemap = gamemap;

        this.cells = [new Cell(info.r,info.c)];//存放蛇的身体，cell[0]存放蛇头
        this.next_step_direction = null;//下一步的目标位置

        this.speed = 5;//蛇每秒走的格子数
        this.direction = -1;//-1表示没有指令，0 1 2 3表示上 右 下 左
        this.status = "idle";//idle表示静止，move表示正在移动，die表示死亡
    }
    start(){

    }

    next_step(){//将蛇的状态变成走下一步
        const d = this.direction;
    }
    update_move(){

    }
    update(){
        this.update_move();
        this.render();
    }
    render(){
        const L = this.gamemap.L;
        const ctx = this.gamemap.ctx;

        ctx.fillStyle = this.color;
        for(const cell of this.cells){
            ctx.beginPath();
            ctx.arc(cell.x*L,cell.y*L,L/2,0,Math.PI * 2);
            ctx.fill();
        }
    }
}

