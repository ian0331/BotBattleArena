import { createRouter, createWebHistory } from 'vue-router'
import NotFound from "../views/error/NotFound.vue"
import PkIndexView from "../views/pk/PkIndexView.vue"
import RanklistIndexView from "../views/ranklist/RanklistIndexView.vue"
import UserBotIndexView from "../views/user/bots/UserBotIndexView.vue"
import RecordIndexView from "../views/record/RecordIndexView.vue"
import UserAccountLoginView from '@/views/user/account/UserAccountLoginView.vue'
import UserAccountRegisterView from '@/views/user/account/UserAccountRegisterView.vue'
import store from '@/store/index'
const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/pk/",
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/404/",
    name: "404",
    component: NotFound,
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: "/pk/",
    name: "pk_index",
    component: PkIndexView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/ranklist/",
    name: "ranklist_index",
    component: RanklistIndexView,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/user/bot/",
    name: "user_bot_index",
    component: UserBotIndexView ,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/user/account/login/",
    name: "user_account_login",
    component: UserAccountLoginView,
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: "/user/account/register/",
    name: "user_account_register",
    component: UserAccountRegisterView,
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: "/record/",
    name: "record_index",
    component:RecordIndexView ,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404/",
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth&&!store.state.user.is_login) {
    next({name: "user_account_login"})
  } else {
    next();
  }
})

export default router
