<template>
  <div>
    <div class="cont">
      <HomeNavigation />
      <div>
        <form class="row  align-items-center">
          <div class="col-auto">
            <label class="visually-hidden">Username</label>
            <input
              type="text"
              v-model="Username"
              class="form-control"
              id="autoSizingInput"
              placeholder="Username"
            />
            <input
              type="password"
              v-model="Password"
              class="form-control"
              id="autoSizingInput"
              placeholder="Password"
            />
            <input
              type="text"
              v-model="FirstName"
              class="form-control"
              id="autoSizingInput"
              placeholder="FirstName"
            />
            <input
              type="text"
              v-model="LastName"
              class="form-control"
              id="autoSizingInput"
              placeholder="LastName"
            />
            <input
              type="text"
              v-model="Email"
              class="form-control"
              id="autoSizingInput"
              placeholder="Email"
            />
            <p >BirthDate</p>
            <input
              type="date"
              v-model="BirthDate"
              class="form-control"
              id="autoSizingInput"
              placeholder="BirthDate"
            />
            <button @click="AddMember" type="submit" class="btn btn-primary">
              Sgin Up
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import HomeNavigation from "@/components/HomeNavigationBar.vue";
import { mapGetters } from "vuex";
export default {
  name: "Register",
  components: {
    HomeNavigation,
  },
  data() {
    return {
      Username:"",
      Password: "",
      FirstName: "",
      LastName: "",
      Email: "",
      Type: "",
      BirthDate:"",
    };
  },
  methods: {
    AddMember(e) {
      const newMember = {
        Username: this.Username,
        Password: this.Password,
        FirstName: this.FirstName,
        LastName: this.LastName,
        Email: this.Email,
        BirthDate:this.BirthDate
      };
      console.log(newMember);
      this.$store.dispatch("Authorization/signup", newMember);
      e.preventDefault();
      this.Username = "";
      this.Password = "";
      this.FirstName = "";
      this.LastName = "";
      this.Email = "";
    },
  },
   computed: {
    ...mapGetters({
      msg: "Authorization/msg"
    })
  }
};
</script>

<style scoped>
.cont {
  height: 753px;
  background-image: url('../assets/Learning-Management@2x-1024x760.png');
  background-size: cover;
}
.col-auto {
  margin: 20px auto;
}
#opt {
  cursor: pointer;
   margin-bottom: 0px;
}
button {
  margin-top: 20px;
}
input,.form-control
{
  margin-bottom: 10px;
}
.row
{
  background-color: rgba(15, 11, 11, 0.452);
  width: 30%;
  border-radius: 10px;
  margin-left: 35%;
  margin-top: 110px;
  padding: 10px;
}
p
{
  color: white;
}

</style>
