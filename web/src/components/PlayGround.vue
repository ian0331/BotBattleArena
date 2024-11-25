<template>
    <div class="playground">
        <!-- A玩家信息 (当前玩家是A时显示自己的信息，否则显示对手信息) -->
        <div class="player-info a-player" v-if="$store.state.pk.status === 'playing'">
            <img :src="parseInt($store.state.user.id) === parseInt($store.state.pk.a_id) ? 
                $store.state.user.photo : 
                $store.state.pk.opponent_photo" alt="玩家A头像">
            <span class="username">{{ parseInt($store.state.user.id) === parseInt($store.state.pk.a_id) ? 
                $store.state.user.username : 
                $store.state.pk.opponent_username }}</span>
        </div>
        
        <!-- B玩家信息 (当前玩家是B时显示自己的信息，否则显示对手信息) -->
        <div class="player-info b-player" v-if="$store.state.pk.status === 'playing'">
            <img :src="parseInt($store.state.user.id) === parseInt($store.state.pk.b_id) ? 
                $store.state.user.photo : 
                $store.state.pk.opponent_photo" alt="玩家B头像">
            <span class="username">{{ parseInt($store.state.user.id) === parseInt($store.state.pk.b_id) ? 
                $store.state.user.username : 
                $store.state.pk.opponent_username }}</span>
        </div>
        <GameMap></GameMap>
    </div>
</template>
<script>
import GameMap from "./GameMap.vue"

export default {
    components: {
        GameMap,
    }
}
</script>

<style scoped>
    div.playground {
    width: 60vw;
    height: 70vh;
    /* 替换简单的背景色为渐变背景 */
    background: linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%);
    margin: 40px auto;
    position: relative;
    
    /* 添加圆角和阴影效果 */
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15),
                inset 0 0 20px rgba(255, 255, 255, 0.3);
    
    /* 添加边框效果 */
    border: 2px solid rgba(255, 255, 255, 0.4);
    
    /* 添加玻璃态效果 */
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    
    /* 添加过渡效果 */
    transition: all 0.3s ease;
}

/* 添加悬停效果 */
div.playground:hover {
    transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
    }

    .player-info {
        position: absolute;
        display: flex;
        align-items: center;
        gap: 15px;  /* 增加间距 */
    }

    .player-info img {
        width: 50px;  /* 增加头像尺寸 */
        height: 50px;
        border-radius: 50%;
    }

    .username {
        font-weight: bold;
        font-size: 24px;  /* 增加字体大小 */
    }

    .a-player {
        left: 30px;  /* 稍微调整位置 */
        bottom: 30px;
        color: blue;
    }

    .b-player {
        right: 30px;
        top: 30px;
        color: red;
    }
</style>