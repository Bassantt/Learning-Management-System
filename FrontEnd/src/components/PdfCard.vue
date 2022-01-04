<template>
  <div id="app">
    <a :download=this.link :href=this.link target="_blank" > {{title}}</a>  
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

</script>

<style scoped>
a{
  color: rgb(37, 91, 122);
  font-size: 30PX;
}

#app
{
  background-color: rgba(238, 247, 247, 0.404);
  border: 1px solid rgba(34, 38, 39, 0.322);
  padding: 5px 5px;
  width: 80%;
  margin-left: 10%;
}

</style>