<template>
  <div class="cont">
    <HomeNavigation />
    <div class=" row justify-content-center home px-0 m-0">
      <div class="justify-content-center divcont ">
      <h3 >Learning-Management-System</h3>
      <h6 >Learning-Management-System Learning-Management-System</h6>
      <h6>Learning-Management-System Learning-Management-System</h6>
      <router-link 
            :to="{ path: '/UserPage/' +userid}"
            tag="li"
            v-if="isLoggedIn =='success' "  >
          <a>My Page</a>
          </router-link>
          <router-link to="/Register" tag="li" v-if="isLoggedIn !='success' "  >
          <a>Get Start</a>
          </router-link>
      </div>

     </div>
  </div>
</template>

<script>
import HomeNavigation from "@/components/HomeNavigationBar.vue";
import { mapGetters } from "vuex";
export default {
  name: "Home",
  components: {
    HomeNavigation
  },
   computed: {
    ...mapGetters({
      isLoggedIn: "Authorization/GetStatus",
      usertype:"Authorization/usertype",
      Username:"Authorization/Username",
      userid: "Authorization/userid",
    })
  } 
};
</script>

<style scoped>
.cont {
  background-color: rgb(37, 91, 122);
}
.home {
  
  background-repeat: no-repeat;
  width: 100%;
  height: auto;
  background-position: center;
  background-size: 100% 100%;
  position:absolute;
  color: black; 
}
.headers {
  justify-content: center;
  justify-items: center;
  padding-top: 30%;
  position: absolute;
  z-index: 0;
  margin-top: 80px;
}
h3 {
  font-weight: 80;
  font-size: 40px;
  letter-spacing: -0.04em;
  line-height: 0;
  margin-top: 400px;
  margin-bottom: 50px;
  text-align: center;
  width: 100%;
}
h6 {
  font-weight: 20;
  font-size: 20px;
  letter-spacing: -0.04em;
  line-height: 0;
  margin-bottom: 25px;
  text-align: center;
  width: 100%;
}
ul{
  list-style: none;
}
li {
  padding: 25px 17px;
  text-align: center;
  color: #ffffff;
   cursor: pointer;
}
a {
 color: black;
 background-color: rgb(37, 91, 122); 
 width: 200px;
 padding: 10px;
 border-radius: 10px;
 text-decoration: none;
}
a:hover {
  color: black;
  background-color:rgba(37, 91, 122, 0.342);
 }
.divcont
{
  width: 100%;
  height: 673px;
  background-image: url('../assets/back.png');
  background-size: cover;
}
input
{
  width: 100px;
  display: initial;
  margin-left: 10px;
  margin-bottom: 10px;
}
._btn{
color: black;
background-color: rgb(107, 180, 185);
width: 100px;
margin-top: 10px;
}

._btn:hover{
color: black;
background-color: rgb(37, 91, 122);
}

</style>
