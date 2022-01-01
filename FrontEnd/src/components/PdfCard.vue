<template>
  <div id="app">
    <a  download target="_blank"  href="file:///C:/Users/ali73/OneDrive/Desktop/Learning-Management-System/uploads/Consultation_Project_Requirements-ee47.pdf"
    >Home</a>
    <h1>{{title}}</h1>
    <h2>{{link}}</h2>
    <!-- {{pdfodata}} -->
    <button @click="show">clik</button>
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
  methods:
  {
    show(){
    let url = new URL("file://C:/Users/ali73/OneDrive/Desktop/Learning-Management-System/uploads/Consultation_Project_Requirements-ee47.pdf");  
    window.open(url, "_blank"); 
    }   
  }
};
// /path/to/chrome_binary –allow-file-access-from-files -disable-web-security
</script>

<style scoped>
a{
  color: black;
}

</style>