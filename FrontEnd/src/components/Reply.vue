<template>
  <div class="row" id="reply">
    <h4 class="col-2">{{userName}}</h4>
    <h1 class="col-10">{{reply}}</h1>
  </div>
</template>


<script>
export default {
  name: "Reply",
  props: {
    reply: {
      type: String
    },
    userName: {
      type: String
    }  
  }
};
</script>

<style scoped>
#reply
{
    background-color:rgba(96, 155, 189, 0.623);
    border-bottom: 1px solid black;
    width: 100%;
    margin: 0;
}
</style>