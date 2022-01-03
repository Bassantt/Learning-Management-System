<template>
  <div class="cont" v-if="isLoggedIn =='success'">
    <HomeNavigation />
  <div class=" row justify-content-center home px-0 m-0" >
     <div class="col-sm-70%" id="edit_div" >
        <h2>My Profile</h2>
        <p v-if="user.user.type=='customer'">Your Role is : {{user.user.role}}</p>
        <p v-if="(user.user.type=='Admin'|| user.user.type=='admin')">Your Role is : {{user.user.type}}</p>
        <ul>
          <li>
           Email :{{user.user.email}}
          </li>
          <li>
            Username :<input id="username"  v-model="user.user.userName" type="text" class="form-control" >
          </li>
          <li>
           FirstName : <input v-model="user.user.firstName" type="text" class="form-control" >
          </li>
          <li>
           LastName :<input  v-model="user.user.lastName" type="text" class="form-control" >
          </li>

          <li>
           BirthDate : <input  v-model="user.user.brithDay" type="date" class="form-control" >
          </li>
          <li>
            NewPassword : <input  v-model="password" type="Password" class="form-control" >
          </li>
          <li>
            Password : <input  v-model="oldPassword" type="Password" class="form-control" placeholder="Enter Your password">
          </li>
        </ul>
          <button class="trans_button" @click="save()">
            Save Changes
          </button>
    </div>
  </div>
  </div>
</template>

<script>
import HomeNavigation from "@/components/HomeNavigationBar.vue";
import { mapGetters } from "vuex";
export default {
  name: "UserPage",
  components: {
    HomeNavigation
  },
   data() {
    return {
        password: "",
        oldPassword:"",
    }}
    ,
   computed: {
    ...mapGetters({
      isLoggedIn: "Authorization/GetStatus",
      usertype:"Authorization/usertype",
      Username:"Authorization/Username",
      user:"Authorization/user",
    })
  },
  methods:
  {
     save()
    {
        const newdata = {
        userName: this.user.user.userName,
        oldPassword: this.oldPassword,
        firstName: this.user.user.firstName,
        lastName: this.user.user.lastName,
        brithDay:this.user.user.brithDay,
        password:this.password
      };
      console.log(newdata);
      this.$store.dispatch("Authorization/edite", newdata);
      alert("done")
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
}
ul li {
  margin-top: 2%;
  margin-bottom: 3%;
  border-bottom: 1px solid rgb(214, 214, 214);
}

.cont {
  background-color: rgb(37, 91, 122);
}
.home {
  
  background-repeat: no-repeat;
  width: 100%;
  height: 763px;
  background-position: center;
  background-size: 100% 100%;
  position:absolute;
  background-color: rgba(10, 10, 10, 0.267);
  color: black;
}
#edit_div
{
  width: 68.5%;
  height: 650px;
  padding-right: 5%;
  padding-bottom: 5%;
  position: relative;
  background-color: rgba(82, 145, 156, 0.178);
  border-radius: 30px;
  margin-top: 10px;
  text-align: center;
}

.trans_button {
  outline: none;
  height: 50px;
  width: 185px;
  background-color:  rgb(37, 91, 122);
  border-radius: 26px;
  border-color: gray;
  color: gray;
  font-size: 14px;
  font-weight: bold;
  margin-left: 5%;
  margin-top: 1px;
}
.trans_button:hover {
  height: 52px;
  width: 190px;
  border-color: black;
  color: black;
}
input
{
  width: 60%;
  border-radius: 10px;
  margin-right: 5%;
  margin-bottom: 2px;
  display:inline;
  background-color:transparent;
}
h2
{
  margin-top: 20px;
}
</style>
