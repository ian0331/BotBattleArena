import { createRouter, createWebHistory } from 'vue-router'
import PkIndexView from '../views/pk/PkIndexView.vue'
import RanklistIndexView from '../views/ranklist/RanklistIndexView.vue'
import RecordIndexView from '../views/record/RecordIndexView.vue'
import RecordContentView from '../views/record/RecordContentView'
import UserBotIndexView from '../views/user/bot/UserBotIndexView.vue'
import NotFound from '../views/error/NotFound.vue'
import UserAccountLoginView from '../views/user/account/UserAccountLoginView.vue'
import UserAccountRegisterView from '../views/user/account/UserAccountRegisterView.vue'
import store from '../store/index'

const routes = [
    {
        path: "/",
        name: "home",
        redirect: "/pk/",
        meta: {
            requestAuth: true,
        }
    },
    {
        path: "/pk/",
        name: "pk_index",
        component: PkIndexView,
        meta: {
            requestAuth: true,
        }
    },
    {
        path: "/record/",
        name: "record_index",
        component: RecordIndexView,
        meta: {
            requestAuth: true,
        }
    },
    {
        path: "/record/:recordId/",
        name: "record_content",
        component: RecordContentView,
        meta: {
            requestAuth: true,
        }
    },
    {
        path: "/ranklist/",
        name: "ranklist_index",
        component: RanklistIndexView,
        meta: {
            requestAuth: true,
        }
    },
    {
        path: "/user/bot/",
        name: "user_bot_index",
        component: UserBotIndexView,
        meta: {
            requestAuth: true,
        }
    },
    {
        path: "/404/",
        name: "404",
        component: NotFound,
        meta: {
            requestAuth: false,
        }
    },
    {
        path: "/:catch(.*)",
        name: "not_found",
        redirect: "/404/",
    },
    {
        path: "/user/account/login/",
        name: "user_account_login",
        component: UserAccountLoginView,
        meta: {
            requestAuth: false,
        }
    },
    {
        path: "/user/account/register/",
        name: "user_account_register",
        component: UserAccountRegisterView,
        meta: {
            requestAuth: false,
        }
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
})

// to跳转到哪个页面， from表示从哪个页面跳转过去
// next的表示将页面要不要执行下一步操作，写之前首先要记录每一个未授权界面
router.beforeEach((to, from, next) => {

    let flag = 1;
    const jwt_token = localStorage.getItem("jwt_token");

    if(jwt_token) {
        store.commit("updateToken", jwt_token);
        store.dispatch("getinfo",{
            success(){},
            error() {
                alert("token无效，请重新登录");
                localStorage.removeItem('jwt_token');
                store.commit("logout");
                router.push({name: "user_account_login"});
            }
        })
    }
    else {
        flag = 2;
    }

    if (to.meta.requestAuth && !store.state.user.is_login) {
        if(flag === 1) {
            next();
        }
        else {
            alert("请先进行登录");
            next({name: "user_account_login"});
        }
    }
    else {
        next();
    }    

    // if (to.meta.requestAuth && !store.state.user.is_login) {
    //     next({ name: "user_account_login" });
    // } else {
    //     next();
    // }
})

export default router
