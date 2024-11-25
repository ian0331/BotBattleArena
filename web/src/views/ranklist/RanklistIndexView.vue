<template>
    <ContentField>
        <div class="ranklist-header">
            <h2>玩家排行榜</h2>
            <p class="text-muted">实时更新的玩家天梯积分排名</p>
        </div>

        <table class="table table-striped table-hover ranklist-table">
            <thead>
                <tr>
                    <th>排名</th>
                    <th>玩家</th>
                    <th>天梯分</th>
                    <th>称号</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(user, index) in users" :key="user.id">
                    <td class="rank-number">
                        <span :class="['rank-badge', getRankClass(index + 1)]">
                            {{ (current_page - 1) * 3 + index + 1 }}
                        </span>
                    </td>
                    <td class="player-info">
                        <img :src="user.photo" :alt="user.username" class="record-user-photo">
                        <span class="record-user-username">{{ user.username }}</span>
                    </td>
                    <td class="rating-cell">
                        <strong>{{ user.rating }}</strong>
                    </td>
                    <td>{{ getRankTitle(user.rating) }}</td>
                </tr>
            </tbody>
        </table>

        <nav aria-label="排行榜分页" class="pagination-container">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: current_page === 1 }" @click="click_page(-2)">
                    <a class="page-link" href="#">&laquo; 前一页</a>
                </li>
                <li :class="'page-item ' + page.is_active" v-for="page in pages" :key="page.number"
                    @click="click_page(page.number)">
                    <a class="page-link" href="#">{{ page.number }}</a>
                </li>
                <li class="page-item" :class="{ disabled: current_page === Math.ceil(total_users / 3) }" @click="click_page(-1)">
                    <a class="page-link" href="#">后一页 &raquo;</a>
                </li>
            </ul>
        </nav>
    </ContentField>
</template>

<script>
import ContentField from '../../components/ContentField.vue'
import { useStore } from 'vuex';
import { ref } from 'vue';
import $ from 'jquery';

export default {
    components: {
        ContentField
    },
    setup() {
        const store = useStore();
        let users = ref([]);
        let current_page = ref(1);
        let total_users = ref(0);
        let pages = ref([]);

        const getRankClass = (rank) => {
            if (rank === 1) return 'rank-gold';
            if (rank === 2) return 'rank-silver';
            if (rank === 3) return 'rank-bronze';
            return '';
        }

        const getRankTitle = (rating) => {
            if (rating >= 3000) return '大神';
            if (rating >= 2500) return '王者';
            if (rating >= 2000) return '钻石';
            if (rating >= 1500) return '黄金';
            if (rating >= 1000) return '白银';
            return '青铜';
        }

        const click_page = page => {
            if (page === -2) page = current_page.value - 1;
            else if (page === -1) page = current_page.value + 1;
            let max_pages = parseInt(Math.ceil(total_users.value / 3));

            if (page >= 1 && page <= max_pages) {
                pull_page(page);
            }
        }

        const update_pages = () => {
            let max_pages = parseInt(Math.ceil(total_users.value / 3));
            let new_pages = [];
            for (let i = current_page.value - 2; i <= current_page.value + 2; i++) {
                if (i >= 1 && i <= max_pages) {
                    new_pages.push({
                        number: i,
                        is_active: i === current_page.value ? "active" : "",
                    });
                }
            }
            pages.value = new_pages;
        }

        const pull_page = page => {
            current_page.value = page;
            $.ajax({
                url: "http://127.0.0.1:3000/ranklist/getlist/",
                data: {
                    page,
                },
                type: "get",
                headers: {
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp) {
                    users.value = resp.users;
                    total_users.value = resp.users_count;
                    update_pages();
                },
                error(resp) {
                    console.log(resp);
                }
            })
        }

        pull_page(current_page.value);

        return {
            users,
            pages,
            click_page,
            getRankClass,
            getRankTitle,
            current_page,
        }
    }
}
</script>

<style scoped>
.ranklist-header {
    text-align: center;
    margin-bottom: 2rem;
}

.ranklist-header h2 {
    color: #2c3e50;
    font-weight: 600;
}

.ranklist-header p {
    color: #7f8c8d;
}

.ranklist-table {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 2rem;
}

.ranklist-table thead {
    background-color: #2c3e50;
    color: white;
}

.ranklist-table th {
    padding: 15px;
    font-weight: 500;
}

.ranklist-table td {
    padding: 15px;
    vertical-align: middle;
}

.rank-number {
    font-weight: bold;
    width: 80px;
}

.rank-badge {
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    text-align: center;
    font-weight: bold;
    transition: transform 0.2s;
}

.rank-badge:hover {
    transform: scale(1.1);
}

.rank-gold {
    background-color: #FFD700;
    color: white;
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.rank-silver {
    background-color: #C0C0C0;
    color: white;
    box-shadow: 0 0 10px rgba(192, 192, 192, 0.5);
}

.rank-bronze {
    background-color: #CD7F32;
    color: white;
    box-shadow: 0 0 10px rgba(205, 127, 50, 0.5);
}

.player-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

img.record-user-photo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
}

img.record-user-photo:hover {
    transform: scale(1.1);
}

.record-user-username {
    font-weight: 500;
    color: #2c3e50;
}

.rating-cell {
    font-size: 1.1em;
    color: #e74c3c;
    font-weight: bold;
}

.pagination-container {
    margin-top: 2rem;
}

.pagination {
    gap: 5px;
}

.page-link {
    color: #5ca1e6;
    border-radius: 5px;
    padding: 8px 16px;
    transition: all 0.3s;
}

.page-link:hover {
    background-color: #edf2f7;  /* 更改为更浅的背景色 */
    color: #ffffff;  /* 保持文字颜色深色 */
    border-color: #cbd5e0;
}

.page-item.active .page-link {
    background-color: #3674cb;  /* 更浅的活动状态背景色 */
    border-color: #ffffff;
    color: white;  /* 确保活动状态的文字为白色 */
}

.page-item.disabled .page-link {
    color: #6c757d;
    pointer-events: none;
    background-color: #fff;
}

/* 添加响应式样式 */
@media (max-width: 768px) {
    .ranklist-table {
        font-size: 0.9em;
    }

    .rank-badge {
        width: 25px;
        height: 25px;
        line-height: 25px;
    }

    img.record-user-photo {
        width: 30px;
        height: 30px;
    }

    .pagination-container {
        overflow-x: auto;
    }
}
</style>