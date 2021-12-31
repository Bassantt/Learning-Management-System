<template>
  <div id="#app">
      <video-embed :src=link></video-embed>
  <video-embed src="https://www.youtube.com/watch?v=s4ObxcdXoFE"></video-embed>
  <video-embed src="https://vimeo.com/362754811"></video-embed>
  <video-embed src="https://dai.ly/x7n7y06"></video-embed>

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