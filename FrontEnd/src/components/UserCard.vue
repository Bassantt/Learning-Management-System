<template>
  <div class="Ship-item" id="con">
    <tr>
      <td><img src="../assets/unnamed.png" /></td>
      <td></td>
      <td>
        <h3>userName: {{ userName }}</h3>
      </td>
      <td>
        <h3>email: {{ email }}</h3>
      </td>
      <td>
        <h3>type: {{ type }}</h3>
      </td>
      <td><button @click="changerole" class="Delete"> make as instractor</button></td>
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
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    type: {
      type: String,
    },
  },
  methods: {
    changerole() {
      console.log("I will changerole");
      console.log(this.Id);
      //will put dispatch here and send the ship id
      this.$store.dispatch("Authorization/changerole", this.Id);
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
  width: 90%;
  margin-left: 2%;
  border-radius: 70px;
}
.Delete {
  background: green;
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