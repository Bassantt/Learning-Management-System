<template>
  <div class="cont">
    <HomeNavigation />
    <div class="container">
	<div class="d-flex justify-content-center h-100">
		<div class="card">
			<div class="card-header">
				<h3>Login</h3>
			</div>
			<div class="card-body">
				
					<div class="input-group form-group">
						<input  v-model="Username" type="text" class="form-control" placeholder="Username">
						
					</div>
					<div class="input-group form-group">
						<input  v-model="Password" type="password" class="form-control" placeholder="Password">
					</div>
					<div class="row align-items-center remember">
						<input type="checkbox">Remember Me
					</div>
					<div class="form-group">
						<Button class="btn float-right login_btn" @click="login()">Login</Button>
					</div>
				
			</div>
		</div>
	</div>
</div>
  </div>
</template>

<script>
import HomeNavigation from "@/components/HomeNavigationBar.vue";
export default {
  name: "Login",
  components: {
    HomeNavigation
  },
    data: function () {
    return {
      Username: "",
      Password: "",
      //validation
      trigger_validation: false,
      can_submit: true,
    };
  },
  methods: {
    login() {
      console.log(this.Username);
      console.log(this.Password);
      this.trigger_validation = true;
      this.can_submit = true;
      this.req_username;
      this.req_password;
      setTimeout(() => {
        if (this.can_submit) {
          let user = {
            Username: this.Username,
            Password: this.Password
          };
          this.$store.dispatch("Authorization/login", user);
        }
      }, 200);
    },
  },
  
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css?family=Numans');


.cont{
background-image: url('../assets/odgservices_lifestyle4.png');
background-size: cover;
background-repeat: no-repeat;
height: 100%;
font-family: 'Numans', sans-serif;
height: calc(100vh);
align-content: center;
}

.card{
height: 370px;
margin-top: 140px;
margin-bottom: auto;
width: 400px;
background-color: rgba(0,0,0,0.5) !important;
}


.card-header h3{
color: white;
}

input:focus{
outline: 0 0 0 0  !important;
box-shadow: 0 0 0 0 !important;

}

.form-control
{
  margin: 15px 0px;
}

.remember ,h4{
color: white;
margin-bottom: 25px;
}

.remember input
{
width: 20px;
height: 20px;
margin-left: 15px;
margin-right: 5px;
}

.login_btn{
color: black;
background-color: rgb(107, 180, 185);
width: 100px;
}

.login_btn:hover{
color: black;
background-color: rgb(37, 91, 122);
}
select{
  width: 150px;
  color: black;
  margin-bottom: 10px;
}

</style>
