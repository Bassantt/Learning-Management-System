<template>
  <div>
    <div class="cont">
      <HomeNavigation />
      <div>
        <form class="row  align-items-center">
          <div class="col-auto">
            <input
              type="text"
              v-model="Name"
              class="form-control"
              id="autoSizingInput"
              placeholder="Name"
            />
  
          <el-select
              class="form-control"
              v-model="UserType"
              placeholder="UserType"
            >
              <el-option
                id="opt"
                class="form-control"
                label="User"
                value="User"
              ></el-option>
              <el-option
                id="opt"
                class="form-control"
                label="Admin"
                value="Admin"
              ></el-option>
               <el-option
                id="opt"
                class="form-control"
                label="Developer"
                value="Developer"
              ></el-option>

            </el-select>
            <input
              type="text"
              v-model="Email"
              class="form-control"
              id="autoSizingInput"
              placeholder="Email"
            />
            <input
              type="number"
              v-model="Phone"
              class="form-control"
              id="autoSizingInput"
              placeholder="Phone"
            /><label class="visually-hidden">Password</label>
            <input
              type="password"
              v-model="Password"
              class="form-control"
              id="autoSizingInput"
              placeholder="Password"
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
      Name: "",
      Password: "",
      Email: "",
      UserType: "",
      Phone: "",
    };
  },
  methods: {
    AddMember(e) {
      const newMember = {
        Name: this.Name,
        Password: this.Password,
        Email: this.Email,
        UserType: this.UserType,
        Phone: this.Phone,
      };
      console.log(newMember);
      this.$store.dispatch("Authorization/signup", newMember);
      e.preventDefault();
      this.Name = "";
      this.Password = "";
      this.Email = "";
      this.Phone = "";
      this.UserType = "";
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
  background-color: rgba(107, 97, 84, 0.288);
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
  margin-top: 150px;
  padding: 10px;
}

</style>
