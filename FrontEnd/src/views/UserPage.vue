<template>
  <div class="cont">
    <HomeNavigation />
  <div class=" row justify-content-center home px-0 m-0">
    <ul id="api">
      API Key
      <br/>
      {{user.apiKey}}
    </ul>
    <div class="col-sm-70%" id="white_div" v-if="editemode==true">
        <h1>Account overview</h1>
        <ul>
          <li>
            <span class="p1">Name : </span>
            <span class="p2">{{ user.Name }}</span>
          </li>
          <li>
            <span class="p1">Email : </span>
            <span class="p3">{{ user.Email }}</span>
          </li>
          <li>
            <span class="p1">Phone : </span>
            <span class="p5">{{ user.Phone }}</span>
          </li>
        </ul>
          <button class="trans_button" @click="edite()">
            EDITE PROFILE
          </button>
    </div>
     <div class="col-sm-70%" id="edit_div" v-if="editemode!=true">
        <h1>Account Edite</h1>
        <ul>
          <li>
            <span class="p1">Name : </span>
             <span class="p2">{{ user.Name }}</span>
            <input  v-model="Name" type="text" class="form-control" placeholder="Enter what you want">
          </li>
          <li>
            <span class="p1">Email : </span>
            <span class="p3">{{ user.Email }}</span>
            <input  v-model="Email" type="text" class="form-control" placeholder="Enter what you want">
          </li>
          <li>
            <span class="p1">Phone : </span>
            <span class="p5">{{ user.Phone }}</span>
             <input  v-model="Phone" type="text" class="form-control" placeholder="Enter what you want">
          </li>
          <li>
            <span class="p1">New Password if you want change the current</span>
             <input  v-model="NewPassword" type="Password" class="form-control" placeholder="Enter Your Password">
          </li>
            <li>
            <span class="p1">Please Enter your Password to save change/s</span>
             <input  v-model="Password" type="Password" class="form-control" placeholder="Enter Your Password">
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
  data(){
      return{
          api_key:"",
          editemode:true,
          Name:"",
          Email:"",
          Phone:"",
          Password:"",
          NewPassword:""
  }
  },
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
    edite()
    {
      this.editemode=false;
    },
     save()
    {
        const newdata = {
        Name: this.Name,
        Password: this.Password,
        Email: this.Email,
        Phone: this.Phone,
        NewPassword:this.NewPassword
      };
      console.log(newdata);
      this.$store.dispatch("Authorization/edite", newdata);
      this.Name = "";
      this.Password = "";
      this.Email = "";
      this.Phone = "";
      this.NewPassword="";
      this.editemode=true;
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
#api
{
  background-color: rgba(82, 145, 156, 0.185);
  border-radius: 30px;
  margin-top: 80px;
  margin-top: 40px;
  width: 68.5%;
}
.cont {
  background-color: rgb(37, 91, 122);
}
.home {
  
  background-repeat: no-repeat;
  width: 100%;
  height: 802px;
  background-position: center;
  background-size: 100% 100%;
  position:absolute;
   background-color: rgba(107, 97, 84, 0.288);
    color: black;
}
#edit_div
{
  width: 68.5%;
  height: 650px;
  padding-right: 5%;
  padding-bottom: 5%;
  position: relative;
  background-color: rgba(82, 145, 156, 0.308);
  border-radius: 30px;
  margin-bottom: 500px;
  text-align: center;
}
#white_div {
  width: 68.5%;
  height: 50%;
  padding-right: 5%;
  padding-bottom: 5%;
  position: relative;
  background-color: rgba(82, 145, 156, 0.308);
  border-radius: 30px;
  margin-bottom: 500px;
  text-align: center;
}
@media screen and (max-width: 1000px) {
  h1 {
    font-size: 55px;
    font-weight: 750;
    letter-spacing: -0.04em;
    line-height: 1.15;
    margin-top: 0;
    text-align: center;
    width: 100%;
  }
  h4 {
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    width: 100%;
  }
}

.api
{
background-color: rgba(15, 11, 11, 0.452);
  border-radius: 10px;
  margin-top: 100px;
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
  margin-top: 1%;
  margin-bottom: 10%;
}
.trans_button:hover {
  height: 52px;
  width: 190px;
  border-color: black;
  color: black;
}
input
{
  width: 50%;
  border-radius: 10px;
  margin-left: 25%;
  margin-bottom: 2px;
}

</style>
