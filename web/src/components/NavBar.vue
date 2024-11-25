<template>
    <nav class="navbar navbar-expand-lg custom-navbar">
        <div class="container">
            <router-link class="navbar-brand brand-logo" :to="{ name: 'pk_index' }">KOB</router-link>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link :class="route_name == 'pk_index' ? 'nav-link active' : 'nav-link'"
                            :to="{ name: 'pk_index' }">对战</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :class="route_name == 'record_index' ? 'nav-link active' : 'nav-link'"
                            :to="{ name: 'record_index' }">对局列表</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :class="route_name == 'ranklist_index' ? 'nav-link active' : 'nav-link'"
                            :to="{ name: 'ranklist_index' }">排行榜</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav" v-if="$store.state.user.is_login">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'user_bot_index' }">我的Bot</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click="logout">退出</a>
                    </li>
                    <li class="nav-item">
                        <span class="nav-link username">{{ $store.state.user.username }}</span>
                    </li>
                </ul>
                <ul class="navbar-nav" v-else-if="!$store.state.user.pulling_info">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'user_account_login' }" role="button">
                            登录
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'user_account_register' }" role="button">
                            注册
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
    setup() {
        const store = useStore();
        const route = useRoute();
        let route_name = computed(() => route.name)

        const logout = () => {
            store.dispatch("logout");
        }

        return {
            route_name,
            logout
        }
    }
}
</script>

<style scoped>
.custom-navbar {
    background: linear-gradient(135deg, #3494E6 0%, #5CB3FF 100%);
    padding: 1rem 0;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
    color: #ffffff !important;
    font-weight: bold;
    font-size: 1.5rem;
    transition: all 0.3s ease;
}

.navbar-brand:hover {
    transform: scale(1.05);
}

.nav-link {
    color: rgba(255, 255, 255, 0.9) !important;
    font-weight: 500;
    padding: 0.5rem 1rem;
    margin: 0 0.2rem;
    border-radius: 4px;
    transition: all 0.3s ease;
}

.nav-link:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff !important;
    transform: translateY(-2px);
}

.nav-link.active {
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff !important;
}

.username {
    font-weight: bold;
    color: #ffffff !important;
    cursor: default;
}

.username:hover {
    background: none;
    transform: none;
}

/* 汉堡菜单按钮样式 */
.navbar-toggler {
    border-color: rgba(255, 255, 255, 0.5);
    padding: 0.5rem;
}

.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.7%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

/* 响应式调整 */
@media (max-width: 991px) {
    .navbar-nav {
        padding: 1rem 0;
    }
    
    .nav-link {
        padding: 0.7rem 1rem;
        margin: 0.2rem 0;
    }
}
</style>