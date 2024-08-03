import { AcGameObject } from "./AcGameObject";
import { Wall } from "./Wall";
export class GameMap extends AcGameObject{
    constructor(ctx,parent){
        super();

        this.ctx = ctx;
        this.parent = parent;
        this.L=0;

        this.rows = 13;
        this.cols = 13;

        this.inner_walls_count = 10;
        this.wall = [];
    }
    check_connectivity(g, sx, sy, tx, ty){
        if(sx == tx && sy == ty) return true;
        g[sx][sy] = true;
        const dx = [-1,0,1,0];  // X方向的移动：右，左
        const dy = [0, 1,0,-1];  // Y方向的移动：下，上
        for(let i = 0; i < 4; i++){
            let x = sx + dx[i];
            let y = sy + dy[i];
            if(!g[x][y]&&this.check_connectivity(g,x,y,tx,ty)){
                return true;
            }
        }
        return false;
    }

    create_walls(){
        const g = [];
        for(let r = 0;r < this.rows;r++){
            g[r] = [];
            for(let c = 0;c < this.cols;c++){
                g[r][c] = false;
            }
        }
        // 设置边界
        for(let r = 0;r < this.rows;r++){
            g[r][0] = true;
            g[r][this.cols-1] = true;
        }
        for(let c = 0;c < this.cols;c++){
            g[0][c] = true;
            g[this.rows-1][c] = true;
        }
        //创建随机墙
        for(let i = 0;i<this.inner_walls_count/2;i++){
            for(let j = 0;j<1000;j++){
            let r = parseInt(Math.random()*this.rows);
            let c = parseInt(Math.random()*this.cols);
            if (g[r][c] || g[c][r]) continue;
            if(r==this.rows - 2 && c==1 || r==1 && c==this.cols - 2) continue;
            g[r][c] = true;
            g[c][r] = true;
            break;
            }
        }

        const copy_g = JSON.parse(JSON.stringify(g));
        if (!this.check_connectivity(copy_g,this.rows-2,1,1,this.cols-2)){
            return false;
        }
        for(let r = 0;r<this.rows;r++){
            for(let c = 0;c<this.cols;c++){
                if(g[r][c]){
                    this.wall.push(new Wall(r,c,this));
                }
            }
        }
        return true;
    }
    start(){
        for(let i = 0;i<1000;i++){
            if(this.create_walls()){
                break;
            }
        }
    }
    update_size(){
        this.L = parseInt(Math.min(this.parent.clientWidth/this.cols,this.parent.clientHeight/this.rows));
        this.ctx.canvas.width = this.cols*this.L;
        this.ctx.canvas.height = this.rows*this.L;
    }

    update(){
        this.update_size();
        this.render();
    }
    render(){
        const color_even = "#00cc00";
        const color_odd = "#04A604";
        for(let i=0;i<this.rows;i++){
            for(let j=0;j<this.cols;j++){
                this.ctx.fillStyle = (i+j)%2===0?color_even:color_odd;
                this.ctx.fillRect(j*this.L,i*this.L,this.L,this.L);
            }
        }
    }
}

