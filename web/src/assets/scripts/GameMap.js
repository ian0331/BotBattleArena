import { AcGameObject } from "./AcGameObject";
import { Snake } from "./Snake";
import { Wall } from "./Wall";
export class GameMap extends AcGameObject {
  constructor(ctx, parent,store) {
    super();

    this.ctx = ctx;
    this.parent = parent;
    this.store= store;
    this.L = 0;

    this.rows = 13;
    this.cols = 14;

    this.inner_walls_count = 10;
    this.walls = [];

    this.snakes = [
      new Snake({ id: 0, color: "#4876ec", r: this.rows - 2, c: 1 }, this),
      new Snake({ id: 1, color: "#f94848", r: 1, c: this.cols - 2 }, this),
    ];

    
  }
  
  create_walls() {
    const g = this.store.state.pk.gamemap;
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        if (g[r][c]) {
          this.walls.push(new Wall(r, c, this));
        }
      }
    }
    return true;
  }

  add_listening_events() {
    this.ctx.canvas.focus();
    this.ctx.canvas.addEventListener("keydown", e => {
      let d = -1; // 0,1,2,3
      if (e.key === "w") {
        d = 0;
      } else if (e.key === 'd') {
        d = 1;
      } else if (e.key === 's') {
        d = 2;
      } else if (e.key === 'a') {
        d = 3;
      }
      if(d>=0){
        this.store.state.pk.socket.send(JSON.stringify({
          event:"move",
          direction:d
        }));
      }
    });
  }

  start() {
    this.create_walls();
    this.add_listening_events();
  }
  update_size() {
    this.L = parseInt(
      Math.min(
        this.parent.clientWidth / this.cols,
        this.parent.clientHeight / this.rows
      )
    );
    this.ctx.canvas.width = this.cols * this.L;
    this.ctx.canvas.height = this.rows * this.L;
  }

  check_ready() { //检查是否所有蛇都准备好了
    for (const snake of this.snakes) {
      if (snake.status !== "idle") {
        return false;
      }
      if (snake.direction === -1) {
        return false;
      }
    }
    return true;
  }
  next_step() {//让两条蛇进入下一回合
    for (const snake of this.snakes) {
      snake.next_step();
    }
  }

  check_valid(cell) {
    for (const wall of this.walls) {
      if (wall.r === cell.r && wall.c === cell.c)
        return false;
    }
    for (const snake of this.snakes) {
      let k = snake.cells.length;
      if (!snake.check_tail_increasing()) {
        k--;
      }
      for (let i = 0; i < k; i++) {
        if (snake.cells[i].r === cell.r && snake.cells[i].c === cell.c)
          return false;
      }
    }
    return true;
  }

  update() {
    this.update_size();
    if (this.check_ready()) {
      this.next_step();
    }
    this.render();
  }
  render() {
    const color_even = "#00cc00";
    const color_odd = "#04A604";
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.ctx.fillStyle = (i + j) % 2 === 0 ? color_even : color_odd;
        this.ctx.fillRect(j * this.L, i * this.L, this.L, this.L);
      }
    }
  }
}
