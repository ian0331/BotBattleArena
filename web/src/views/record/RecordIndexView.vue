<template>
    <ContentField>
        <!-- 添加标题部分 -->
        <div class="record-header">
            <h2>对战记录</h2>
            <p class="text-muted">查看所有玩家的对战历史记录</p>
        </div>

        <table class="table table-striped table-hover record-table">
            <thead>
                <tr>
                    <th>A</th>
                    <th>B</th>
                    <th>对战结果</th>
                    <th>对战时间</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
        <tr v-for="record in records" :key="record.record.id">
            <td>
                <div class="d-flex align-items-center">
                    <img :src="record.a_photo" alt="" class="record-user-photo me-2">
                    <span class="record-user-username">{{ record.a_username }}</span>
                </div>
            </td>
            <td>
                <div class="d-flex align-items-center">
                    <img :src="record.b_photo" alt="" class="record-user-photo me-2">
                    <span class="record-user-username">{{ record.b_username }}</span>
                </div>
            </td>
            <td>
                {{ record.record.loser === "A" ? "B胜" : (record.record.loser === "B" ? "A胜" : "平局") }}
            </td>
            <td>{{ record.record.createtime }}</td>
            <td>
                <button @click="open_record_content(record.record.id)" 
                        class="btn btn-secondary">
                    查看录像
                </button>
            </td>
                </tr>
            </tbody>
        </table>

        <!-- 更新分页导航样式 -->
        <nav aria-label="对战记录分页" class="pagination-container">
            <ul class="pagination justify-content-center">
                <li class="page-item" :class="{ disabled: current_page === 1 }" @click="click_page(-2)">
                    <a class="page-link" href="#">&laquo; 前一页</a>
                </li>
                <li :class="'page-item ' + page.is_active" v-for="page in pages" :key="page.number"
                    @click="click_page(page.number)">
                    <a class="page-link" href="#">{{ page.number }}</a>
                </li>
                <li class="page-item" :class="{ disabled: current_page === Math.ceil(total_records / 10) }" @click="click_page(-1)">
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
import router from '../../router/index'

export default {
    components: {
        ContentField
    },
    setup() {
        const store = useStore();
        let records = ref([]);
        let current_page = 1;
        let total_records = 0;
        let pages = ref([]);

        const click_page = page => {
            if (page === -2) page = current_page - 1;
            else if (page === -1) page = current_page + 1;
            let max_pages = parseInt(Math.ceil(total_records / 10));

            if (page >= 1 && page <= max_pages) {
                pull_page(page);
            }
        }

        const udpate_pages = () => {
            let max_pages = parseInt(Math.ceil(total_records / 10));
            let new_pages = [];
            for (let i = current_page - 2; i <= current_page + 2; i++) {
                if (i >= 1 && i <= max_pages) {
                    new_pages.push({
                        number: i,
                        is_active: i === current_page ? "active" : "",
                    });
                }
            }
            pages.value = new_pages;
        }

        const pull_page = page => {
            current_page = page;
            $.ajax({
                url: "http://127.0.0.1:3000/record/getlist/",
                data: {
                    page,
                },
                type: "get",
                headers: {
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp) {
                    records.value = resp.records;
                    total_records = resp.records_count;
                    udpate_pages();
                },
                error(resp) {
                    console.log(resp);
                }
            })
        }

        pull_page(current_page);

        const stringTo2D = map => {
            let g = [];
            for (let i = 0, k = 0; i < 13; i++) {
                let line = [];
                for (let j = 0; j < 14; j++, k++) {
                    if (map[k] === '0') line.push(0);
                    else line.push(1);
                }
                g.push(line);
            }
            return g;
        }

        const open_record_content = recordId => {
            for (const record of records.value) {
                if (record.record.id === recordId) {
                    store.commit("updateIsRecord", true);
                    store.commit("updateGame", {
                        map: stringTo2D(record.record.map),
                        a_id: record.record.aid,
                        a_sx: record.record.asx,
                        a_sy: record.record.asy,
                        b_id: record.record.bid,
                        b_sx: record.record.bsx,
                        b_sy: record.record.bsy,
                    });
                    store.commit("updateSteps", {
                        a_steps: record.record.asteps,
                        b_steps: record.record.bsteps,
                    });
                    store.commit("updateRecordLoser", record.record.loser);
                    router.push({
                        name: "record_content",
                        params: {
                            recordId
                        }
                    })
                    break;
                }
            }
        }

        return {
            records,
            open_record_content,
            pages,
            click_page
        }
    }
}
</script>

<style scoped>
img.record-user-photo {
    width: 4vh;
    border-radius: 50%;
}
.record-header {
    text-align: center;
    margin-bottom: 2rem;
}

.record-header h2 {
    color: #2c3e50;
    font-weight: 600;
}

.record-header p {
    color: #7f8c8d;
}

.record-table {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 2rem;
}

.record-table thead {
    background-color: #2c3e50;
    color: white;
}

.record-table th {
    padding: 15px;
    font-weight: 500;
}
.record-table td {
    padding: 15px;
    vertical-align: middle;
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
    background-color: #edf2f7;
    color: #ffffff;
    border-color: #cbd5e0;
}

.page-item.active .page-link {
    background-color: #3674cb;
    border-color: #ffffff;
    color: white;
}

.page-item.disabled .page-link {
    color: #6c757d;
    pointer-events: none;
    background-color: #fff;
}
/* 响应式样式 */
@media (max-width: 768px) {
    .record-table {
        font-size: 0.9em;
    }

    img.record-user-photo {
        width: 30px;
        height: 30px;
    }

    .pagination-container {
        overflow-x: auto;
    }
}

/* 美化按钮样式 */
.btn-secondary {
    background-color: #3674cb;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    transition: all 0.3s;
}

.btn-secondary:hover {
    background-color: #2c5aa0;
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}
</style>
