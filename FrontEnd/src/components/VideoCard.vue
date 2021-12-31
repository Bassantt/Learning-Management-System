<template>
  <div id="app">
      <h1>{{title}}</h1>
    <video-embed :src=link></video-embed>
</div>
</template>


<script>
export default {
  name: "VideoCard",
  props: {
    title: {
      type: String
    },
    link: {
      type: String
    }
  },
};
</script>

<style scoped>

</style>