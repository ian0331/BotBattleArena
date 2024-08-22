<template>
    <ContentField>

        userbot

    </ContentField>
</template>

<script>
import ContentField from "@/components/ContentField.vue";
import { useStore } from "vuex";
import $ from "jquery";
export default {

    components: {
        ContentField
    },
    setup() {
        const store = useStore();
        // $.ajax({
        //     url:"http://localhost:3000/user/bot/add/",
        //     type:"post",
        //     data:{
        //         title:"Bot的标题",
        //         description:"Bot的描述",
        //         content:"Bot的代码",

        //     },
        //     headers:{
        //         Authorization: "Bearer " + store.state.user.token
        //     },
        //     success(resp){
        //         console.log(resp);
        //     },
        //     error(resp){
        //         console.log(resp);
        //     }
        // })
        // $.ajax({
        //     url:"http://localhost:3000/user/bot/remove/",
        //     type:"post",
        //     data:{
        //         bot_id:1,


        //     },
        //     headers:{
        //         Authorization: "Bearer " + store.state.user.token
        //     },
        //     success(resp){
        //         console.log(resp);
        //     },
        //     error(resp){
        //         console.log(resp);
        //     }
        // })
        // $.ajax({
        //     url:"http://localhost:3000/user/bot/update/",
        //     type:"post",
        //     data:{
        //         bot_id:2,
        //         title:"Bot的标题3",
        //         description:"Bot的描述3",
        //         content:"Bot的代码3",

        //     },
        //     headers:{
        //         Authorization: "Bearer " + store.state.user.token
        //     },
        //     success(resp){
        //         console.log(resp);
        //     },
        //     error(resp){
        //         console.log(resp);
        //     }
        // })
        $.ajax({
            url:"http://localhost:3000/user/bot/getlist/",
            type:"get",
            headers:{
                Authorization: "Bearer " + store.state.user.token
            },
            success(resp){
                console.log(resp);
            },
            error(resp){
                console.log(resp);
            }
        })
    }
}
</script>

<style scoped></style>