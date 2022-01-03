<template>
  <div class="row" id="reply">
    <h4 class="col-2">{{userName}}</h4>:
    <h4 class="col-8">{{reply}}</h4>
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
    border-bottom: 1px solid black;
    width: 100%;
    margin: 0;
}
</style>