<template>
  <div class="cont">
    <HomeNavigation />
  <div class=" row justify-content-center home px-0 m-0">
     <div class="col-sm-70%" id="edit_div" >
        <h2>My Profile</h2>
        <p>Your Type is : {{user.Type}}</p>
        <ul>
          <li>
            Username :<input id="username"  v-model="user.Username" type="text" class="form-control" >
          </li>
          <li>
           FirstName : <input  v-model="user.FirstName" type="text" class="form-control" >
          </li>
          <li>
           LastName :<input  v-model="user.LastName" type="text" class="form-control" >
          </li>
          <li>
           Email :<input  v-model="user.Email" type="text" class="form-control" >
          </li>
          <li>
           BirthDate : <input  v-model="user.BirthDate" type="date" class="form-control" >
          </li>
          <li>
            NewPassword : <input  v-model="user.NewPassword" type="Password" class="form-control" >
          </li>
          <li>
            Password : <input  v-model="user.Password" type="Password" class="form-control" placeholder="Enter Your password">
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
        user:
      {
        id:"1",
        Username : "bosy",
        Password : "1111",
        FirstName : "mjjj",
        LastName : "plp",
        Email : "$c^",
        Type : "jj",
        BirthDate:"2021-05-30"
      },
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
     save()
    {
        const newdata = {
        Username: this.user.Username,
        Password: this.user.Password,
        FirstName: this.user.FirstName,
        LastName: this.user.LastName,
        Email: this.user.Email,
        Type: this.user.Type,
        BirthDate:this.user.BirthDate,
        NewPassword:this.user.NewPassword
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
