<template>
  <div id="app">
    <!-- <a  target="_blank"  href="file:///C:/Users/ali73/OneDrive/Desktop/Learning-Management-System/uploads/Consultation_Project_Requirements-ee47.pdf"
    >Home</a>
    <a  target="_blank"  href="../uploads/Consultation_Project_Requirements-ee47.pdf"
    >Home</a> -->
    <h1>{{title}}</h1>
    <!-- <h2>{{link}}</h2> -->
    <!-- 
     <router-link :to="{ path: 'http://localhost:3000/courses/file/'+ this.link }"  tag="li">
          <a target="_blank"> view pdf </a>
      </router-link>
       -->
    <a :download=this.link :href=this.link target="_blank" > view a pdf</a>
   
    <!-- <link rel="icon" :href=this.link>  -->
    <!-- {{pdfodata}} -->
    <!-- <button @click="show">click</button>  -->
    <!-- <vue-pdf-embed :src=link> show a pdf</vue-pdf-embed> -->
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
  //  created: function() {
  //   this.$store.dispatch(
  //     "Course/getPdf",
  //     this.link
  //   );},
      computed: {
    ...mapGetters({
      pdfodata: "Course/getpdfodata",
    })
  },
  methods:
  {
    show(){
    let url = new URL(this.link);  
    window.open(url); 
    }   
  }
};
// /path/to/chrome_binary –allow-file-access-from-files -disable-web-security
</script>

<style scoped>
a{
  color: black;
  float: right;
}
h1 
{
  float: left;
}
#app
{
  background-color: rgba(238, 247, 247, 0.404);
  border: 1px solid rgba(34, 38, 39, 0.322);
  padding: 5px 5px;
}

</style>