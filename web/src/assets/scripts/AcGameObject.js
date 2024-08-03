const AC_GAME_OBJECTS = [];

export class AcGameObject{
    constructor(){
        AC_GAME_OBJECTS.push(this);
        this.timedelta = 0;//这一帧到上一帧的时间间隔
        this.has_called_start = false;
    }

    start(){
        //只执行一次
    }

    update(){
        //每一帧执行,除了第一帧
    }
    on_destory(){
        //删除前执行


    }
    destroy(){
        this.on_destory();
        //销毁
        for(let i in AC_GAME_OBJECTS){
            const obj = AC_GAME_OBJECTS[i];
            if(obj === this){
                AC_GAME_OBJECTS.splice(i);
                break;
            }
        }
    }
}

let last_timestamp; //上一次执行的时刻
const step = timestamp =>{
    for(let obj of AC_GAME_OBJECTS){
        if(!obj.has_called_start){
            obj.has_called_start = true;
            obj.start();
        }else{
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }

    last_timestamp = timestamp;
    requestAnimationFrame(step);
}

requestAnimationFrame(step);