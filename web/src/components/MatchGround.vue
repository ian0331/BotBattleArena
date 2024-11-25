<template>
    <div class="matchground">
        <div class="match-container">
            <div class="player-section left-player">
                <div class="user-card">
                    <div class="user-photo">
                        <img :src="$store.state.user.photo" alt="用户头像">
                    </div>
                    <div class="user-username">
                        {{ $store.state.user.username }}
                    </div>
                </div>
            </div>

            <div class="center-section">
                <div class="bot-selector">
                    <select v-model="select_bot" class="form-select" aria-label="选择机器人">
                        <option value="-1" selected>亲自上阵</option>
                        <option v-for="bot in bots" :key="bot.id" :value="bot.id">
                            {{ bot.title }}
                        </option>
                    </select>
                </div>
                <div class="match-button-container">
                    <button @click="click_match_btn" 
                            :class="['match-button', {'matching': match_btn_info === '取消'}]">
                        {{ match_btn_info }}
                    </button>
                </div>
            </div>

            <div class="player-section right-player">
                <div class="user-card">
                    <div class="user-photo">
                        <img :src="$store.state.pk.opponent_photo" alt="对手头像">
                    </div>
                    <div class="user-username">
                        {{ $store.state.pk.opponent_username }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex';
import $ from "jquery";

export default {
    setup() {
        const store = useStore();
        let match_btn_info = ref("开始匹配");
        let bots = ref([]);

        let select_bot = ref("-1");
        const click_match_btn = () => {
            if (match_btn_info.value === "开始匹配") {
                match_btn_info.value = "取消";
                store.state.pk.socket.send(JSON.stringify({
                    event: "start-matching",
                    bot_id: select_bot.value,
                }));
            } else {
                match_btn_info.value = "开始匹配";
                store.state.pk.socket.send(JSON.stringify({
                    event: "stop-matching",
                }));
            }
        }

        const refresh_bots = () => {
            $.ajax({
                url: "http://127.0.0.1:3000/user/bot/getlist/",
                type: "post",
                headers: {
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp) {
                    bots.value = resp;
                }
            })
        }
        refresh_bots();

        return {
            match_btn_info,
            click_match_btn,
            bots,
            select_bot,
        }
    }
}
</script>


<style scoped>
.matchground {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    /* 移除背景渐变，保持透明 *//* 添加半透明黑色遮罩 */
}

.match-container {
    width: 90%;
    max-width: 1200px;
    height: 80vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(5px);
    border-radius: 20px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.player-section {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.user-card {
    text-align: center;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    transition: transform 0.3s ease;
}

.user-card:hover {
    transform: translateY(-5px);
}

.user-photo {
    margin-bottom: 1.5rem;
}

.user-photo img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.2);
    transition: transform 0.3s ease;
    object-fit: cover;
}

.user-photo img:hover {
    transform: scale(1.05);
    border-color: rgba(255, 255, 255, 0.4);
}

.user-username {
    font-size: 1.5rem;
    font-weight: 600;
    color: #333;  /* 改为深色字体 */
    text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3); 
}

.center-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
}

.bot-selector {
    width: 80%;
    max-width: 300px;
}

.form-select {
    background-color: rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.2);
    color: #333;  /* 改为深色字体 */
    padding: 0.8rem;
    border-radius: 10px;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.form-select:focus {
    border-color: rgba(255, 255, 255, 0.4);
    box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.1);
}

.form-select option {
    background-color: #2a5298;
    color: white;
}

.match-button-container {
    margin-top: 2rem;
}

.match-button {
    padding: 1rem 3rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: white;
    background: linear-gradient(45deg, #4481eb 0%, #04befe 100%);  /* 改为蓝色渐变 */
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.match-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.match-button.matching {
    background: linear-gradient(45deg, #3f51b5 0%, #2196f3 100%);  /* 匹配状态时的深蓝色渐变 */
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}

@media (max-width: 768px) {
    .match-container {
        flex-direction: column;
        height: auto;
        padding: 1rem;
    }

    .player-section {
        margin: 1rem 0;
    }

    .user-photo img {
        width: 100px;
        height: 100px;
    }

    .user-username {
        font-size: 1.2rem;
    }

    .bot-selector {
        width: 90%;
    }
}
</style>