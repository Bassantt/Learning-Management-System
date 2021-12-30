<template>
  <div class="cont">
    <HomeNavigation />
    <div class="container">
	<div class="d-flex justify-content-center h-100">
		
    <button class="tablink" @click="syllabus()" id="defaultOpen">syllabus</button>
    <button class="tablink" @click="Pdfmaterial()">Pdfmaterial</button>
    <button class="tablink" @click="Videos()">Videos</button>
    <button class="tablink" @click="QA()">QA</button>
    
    <br/>
    
    <div id="Home" class="tabcontent" v-if="showsyllabus">
    <h3>Home</h3>
    <p>Home is where the heart is..</p>
    </div>

    <div id="News" class="tabcontent" v-if="showPdfmaterial">
    <h3>News</h3>
    <p>Some news this fine day!</p> 
    </div>

    <div id="Contact" class="tabcontent" v-if="showVideos">
    <h3>Contact</h3>
    <p>Get in touch, or swing by for a cup of coffee.</p>
    </div>

    <div id="About" class="tabcontent" v-if="showQA">
    <h3>About</h3>
    <p>Who we are and what we do.</p>
    </div>
	</div>
</div>
  </div>
</template>

<script>
import HomeNavigation from "@/components/HomeNavigationBar.vue";
export default {
  name: "CoursePage",
  components: {
    HomeNavigation
  },
    data: function () {
    return {
      showsyllabus:true,
      showPdfmaterial:false,
      showVideos:false,
      showQA:false,
    };
  },
  methods: {
    syllabus()
    {
      this.showsyllabus=true;
      this.showPdfmaterial=false;
      this.showVideos=false;
      this.showQA=false;
    },
    Pdfmaterial()
    {
      this.showsyllabus=false;
      this.showPdfmaterial=true;
      this.showVideos=false;
      this.showQA=false;
    },
    Videos()
    {
      this.showsyllabus=false;
      this.showPdfmaterial=false;
      this.showVideos=true;
      this.showQA=false;
    },
    QA()
    {
      this.showsyllabus=false;
      this.showPdfmaterial=false;
      this.showVideos=false;
      this.showQA=true;
    }
 
  },
  
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css?family=Numans');


.cont{
/* background-image: url('../assets/odgservices_lifestyle4.png');
background-size: cover;
background-repeat: no-repeat; */
height: 100%;
font-family: 'Numans', sans-serif;
height: calc(100vh);
align-content: center;
}

* {box-sizing: border-box}

/* Set height of body and the document to 100% */
body, html {
  height: 100%;
  margin: 0;
  font-family: Arial;
}

/* Style tab links */
.tablink {
  background-color: #555;
  color: white;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  font-size: 17px;
  width: 25%;
}

.tablink:hover {
  background-color: #777;
}

/* Style the tab content (and add height:100% for full page content) */
.tabcontent {
  color: black;
  padding: 100px 20px;
  height: 100%;
}

#Home {background-color: red;}
#News {background-color: green;}
#Contact {background-color: blue;}
#About {background-color: orange;}
</style>
