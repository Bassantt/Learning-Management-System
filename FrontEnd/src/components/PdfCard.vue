<template>
  <div id="app">
      <h1>{{title}}</h1>
    <h2>{{link}}</h2>
    {{pdfodata}}
</div>
</template>


<script>
import { mapGetters } from "vuex";
export default {
  name: "PdfCard",
  props: {
    title: {
      type: String
    },
    link: {
      type: String
    }
  },
   created: function() {
    this.$store.dispatch(
      "Course/getPdf",
      this.link
    );},
      computed: {
    ...mapGetters({
      pdfodata: "Course/getpdfodata",
    })
  },
};
</script>

<style scoped>

</style>