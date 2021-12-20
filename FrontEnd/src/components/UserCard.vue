<template>
  <div class="Ship-item" id="con">
    <tr>
      <td><img src="../assets/unnamed.png" /></td>
      <td></td>
      <td>
        <h3>Name: {{ Name }}</h3>
      </td>
      <td>
        <h3>Email: {{ Email }}</h3>
      </td>
      <td>
        <h3>Phone: {{ Phone }}</h3>
      </td>
      <td></td>
      <td></td>
      <td><button @click="Deleteuser" class="Delete">X</button></td>
    </tr>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    Id: {
      type: String,
    },
    Name: {
      type: String,
    },
    Email: {
      type: String,
    },
    Phone: {
      type: String,
    },
  },
  methods: {
    Deleteuser() {
      console.log("I will delete");
      console.log(this.Id);
      //will put dispatch here and send the ship id
      this.$store.dispatch("Authorization/deleteuser", this.Id);
    },
  },
};
</script>

<style scoped>
#con {
  background: rgb(37, 91, 122);
  padding: 10px;
  word-spacing: 5px;
  border-spacing: 20px;
  background-color: rgb(96, 155, 189);
  margin-bottom: 20px;
  border: solid black;
  width: 80%;
  margin-left: 10%;
  border-radius: 70px;
}
.Delete {
  background: #af0909;
  color: #fff;
  border: none;
  padding: 5px 9px;
  border-radius: 50%;
  cursor: pointer;
  float: right;
}
img{
    border-radius: 50%;
}
</style>