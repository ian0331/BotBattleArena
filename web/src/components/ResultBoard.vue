<template>
    <div class="result-board">
        <div class="result-board-text" v-if="$store.state.pk.loser === 'all'">
            平局
        </div>
        <div class="result-board-text"
            v-else-if="$store.state.pk.loser === 'A' && $store.state.pk.a_id === parseInt($store.state.user.id)">
            失败
        </div>
        <div class="result-board-text"
            v-else-if="$store.state.pk.loser === 'B' && $store.state.pk.b_id === parseInt($store.state.user.id)">
            失败
        </div>
        <div class="result-board-text" v-else>
            胜利
        </div>
        <div class="result-board-btn">
            <button @click="restart" type="button" class="btn btn-primary btn-lg">
                再来!
            </button>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();

        const restart = () => {
            store.commit("updateStatus", "matching");
            store.commit("updateLoser", 'none');
            store.commit("updateOpponent", {
                username: "我的对手",
                photo: "https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png",
            });
        }

        return {
            restart,
        }
    }
}
</script>

<style scoped>
div.result-board {
    height: 35vh;
    width: 35vw;
    background-color: rgba(40, 40, 40, 0.9);
    position: absolute;
    top: 20vh;
    left: 32.5vw;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    animation: boardAppear 0.5s ease-out;
}

div.result-board-text {
    text-align: center;
    color: white;
    font-size: 4rem;
    font-weight: 700;
    font-style: italic;
    padding-top: 5vh;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    animation: fadeIn 0.5s ease-in;
}

div.result-board-btn {
    padding-top: 7vh;
    text-align: center;
}

.btn-primary {
    padding: 10px 30px;
    font-size: 1.5rem;
    border-radius: 10px;
    transition: all 0.3s ease;
    background-color: #007bff;
    border: none;
    animation: buttonPop 0.5s ease-out 0.3s backwards;
}

.btn-primary:hover {
    transform: scale(1.05);
    background-color: #0056b3;
    box-shadow: 0 0 15px rgba(0, 123, 255, 0.5);
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes boardAppear {
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes buttonPop {
    from {
        opacity: 0;
        transform: scale(0.8);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
    div.result-board {
        width: 80vw;
        left: 10vw;
    }

    div.result-board-text {
        font-size: 3rem;
    }

    .btn-primary {
        font-size: 1.2rem;
        padding: 8px 24px;
    }
}
</style>