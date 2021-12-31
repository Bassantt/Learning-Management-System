<template>
  <div id="app">
    <video-embed :src=link></video-embed>
</div>
</template>


<script>
export default {
  name: "VideoCard",
  props: {
    link: {
      type: String
    }
  },
};
</script>

<style scoped>

</style>