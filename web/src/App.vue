<template>
  <h1>{{bot_name}}</h1>
  <h1>{{bot_rating}}</h1>
  <router-view/>
</template>
<script>
import $ from 'jquery';
import{ref} from 'vue';

export default{
  name:'App',
  setup:()=>{
    let bot_name = ref('');
    let bot_rating = ref('');

    $.ajax({
      url:"http://localhost:3000/pk/getbotinfo/",
      type:"get",
      success: resp=>{
        bot_name.value = resp.name;
        bot_rating.value = resp.rating;
      }
    });
    return{
      bot_name,
      bot_rating
    }
  }
}
</script>



<style>
body {
  background-image: url("@/assets/images/background.jpg");
  background-size: cover;/*百分百填充 */
}
</style>
