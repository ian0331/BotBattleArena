<template>
  <NavBar/>
  <router-view/>
</template>
<script>
import NavBar from './components/NavBar.vue';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

export default{
  components:{
    NavBar
  },
  setup(){
    


  //   $.ajax({
  //     url:"http://localhost:3000/user/account/register/",
  //     type:"post",
  //     data:{
  //       username:"yukio",
  //       password:"yukio0331",
  //       confirmedPassword:"yukio0331",
  //     },
  //     success(resp){
  //       console.log(resp);
  //     },
  //     error(resp){
  //       console.log(resp);
  //     }
  //   })
  }
}
</script>



<style>
body {
  background-image: url("@/assets/images/background.jpg");
  background-size: cover;/*百分百填充 */
}
</style>
