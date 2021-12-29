<template>
  <div class="cont">
    <HomeNavigation id="nav" />
    <Button class="btn float-right _btn" @click="showusers()" v-if="show==false">Show Users</Button>
    <Button class="btn float-right _btn" @click="hide()" v-if="show==true">Hide</Button>
    <div class="row" id="margn" v-if="show==true">
      <h1>Users</h1>
      <UserCard
        class="col-lg-100% col-md-60% col-xs-6"
        v-for="user in users"
        :key="user.ID"
        :Id="user._d"
        :userName="user.userName"
        :email="user.email"
        :type="user.type"
      />
    </div>
    <p v-if="getloading==true">this will take some time</p>
    <div class="spinner-grow text-primary pos" role="status" v-if="getloading==true">
    </div> 
     <span class="sr-only load" v-if="getloading==true">Loading...</span>
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
    },
    UpdateArticals()
    {
      this.$store.dispatch("Authorization/UpdateArticals");
    },
    ClearArticals()
    {
      this.$store.dispatch("Authorization/ClearArticals");
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
margin-top: 10px;
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