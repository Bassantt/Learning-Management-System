<template>
  <div class="Ship-item" id="con">
    <tr>
      <td><img src="../assets/shutterstock_1131981236-768x432.png" /></td>
      <td>
        <h3>userName: {{ userName }}</h3>
        <br/>
        <h3>email: {{ email }}</h3>
        <br/>
        <h3>role: {{ role }}</h3>
        <br/>
      <button @click="changerole" class="change"> make as instractor</button>
      </td>
    </tr>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    Id: {
      role: String,
    },
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  methods: {
    changerole() {
      console.log("I will changerole");
      console.log(this.Id);
      //will put dispatch here and send the ship id
      this.$store.dispatch("Authorization/changerole", {_id:this.Id,userName:this.userName});
    },
  },
};
</script>

<style scoped>
#con {
  background: rgb(37, 91, 122);
  padding: 2px;
  word-spacing: 5px;
  border-spacing: 20px;
  background-color: rgb(96, 155, 189);
  margin-bottom: 20px;
  border: solid black;
  width: auto;
  margin-left: 2%;
  border-radius: 70px;
}
.change {
  background: green;
  color: #fff;
  border: none;
  padding: 10px 10px;
  border-radius: 50%;
  cursor: pointer;
  float: right;
}
img{
    border-radius: 50%;
}
</style>