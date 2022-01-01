<template>
  <div class="cont">
    <HomeNavigation id="nav" />
    <div v-if="isLoggedIn =='success'">
    <Button class="btn float-right _btn" @click="showusers()" v-if="show==false">Show Users</Button>
    <Button class="btn float-right _btn" @click="hide()" v-if="show==true">Hide</Button>
    <div class="row" id="margn" v-if="show==true">
      <h1>Users</h1>
      <UserCard
        class="col-lg-50% col-md-30% col-xs-6"
        v-for="user in users"
        :key="user._id"
        :Id="user._id"
        :userName="user.userName"
        :email="user.email"
        :type="user.type"
      />
    </div>
    </div>
  </div>
</template>

<script>
import UserCard from "@/components/UserCard.vue";
import HomeNavigation from "@/components/HomeNavigationBar.vue";
import { mapGetters } from "vuex";
export default {
  name: "Admin",
  data(){
  return{
    show:false,
  }
},
  components:
  {
    UserCard,
    HomeNavigation,
  },
  created: function () {
    this.$store.dispatch("Authorization/showusers");
  },
  computed: {
    ...mapGetters({
      users: "Authorization/users",
      isLoggedIn: "Authorization/GetStatus",
    }),
  },
  methods:
  {
    showusers()
    {
     this.show=true;
    }
    ,
    hide()
    {
     this.show=false;
    }
  }
};
</script>

<style scoped>
#margn
{
  background-color: rgba(158, 185, 185, 0.274);
  border-radius: 70px;
  margin-top: 0px;
}
#nav {
  z-index: 0;
}
.cont {
  height: calc(200vh);
  background-color:white;
}
.home {
  background-repeat: no-repeat;
  height: calc(70vh);
  width: 100%;
  background-position: center;
  background-size: 100% 100%;
  position: absolute;
}
._btn{
color: black;
background-color: rgb(107, 180, 185);
width: 300px;
margin-right: 5px;
margin-top: 40px;
margin-bottom: 10px;
}

._btn:hover{
color: black;
background-color: rgb(37, 91, 122);
}
.pos
{
  margin-top: 100px;
  widows: 10%;
}
.load
{
  margin-left: 10px;
  font-weight: 100;
}
</style>