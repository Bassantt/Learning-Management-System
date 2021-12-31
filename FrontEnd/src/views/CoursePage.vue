<template>
  <div class="cont">
    <HomeNavigation />
    <div class="container">
      {{course[0]}}
      <h1>{{course[0].name}}</h1>
      <h2>
        {{course[0].description}}
      </h2>
      <h2>
        {{course[0].instructor}}
      </h2>
       {{course[0].syllabus[0]}}
    </div>
  <div class="con">
    <div>
      <button class="tablink" @click="syllabus()" id="defaultOpen">syllabus</button>
      <button class="tablink" @click="Pdfmaterial()">Pdfmaterial</button>
      <button class="tablink" @click="Videos()">Videos</button>
      <button class="tablink" @click="QA()">QA</button>
    </div>
	<div class="d-flex justify-content-center h-100">
    <div  class="tabcontent" v-if="showsyllabus">
        <div class="row">
            <SyllabusCard
              class="col-lg-10% col-md-60% col-xs-6"
              v-for="(syllab,index) in course[0].syllabus"
              :key="index"
              :week="index"
              :description="syllab[0][index]"
            />
          </div>
    </div>

    <div  class="tabcontent" v-if="showPdfmaterial">
    <h3>News</h3>
    <p>Some news this fine day!</p> 
    </div>

    <div  class="tabcontent" v-if="showVideos">
    <h3>Contact</h3>
    <p>Get in touch, or swing by for a cup of coffee.</p>
    </div>

    <div  class="tabcontent" v-if="showQA">
    <input
        type="text"
        v-model="question"
        class="form-control"
        id="autoSizingInput"
        placeholder="ask a question"
    />
    <button @click="Addquestion" class="btn btn-primary">
    Post
    </button>

      <div class="row">
          <QACard
              class="col-lg-10% col-md-60% col-xs-6"
              v-for="(questions,index) in course[0].questions"
              :key="index"
              :question= "questions[index]"
              :replies="questions[index][replies]"
            />
          </div>
    </div>
	</div>
</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HomeNavigation from "@/components/HomeNavigationBar.vue";
import SyllabusCard from "@/components/SyllabusCard.vue";
import QACard from "@/components/QACard.vue";
export default {
  name: "CoursePage",
  components: {
    HomeNavigation,
    SyllabusCard,
    QACard
  },
    data: function () {
    return {
      showsyllabus:true,
      showPdfmaterial:false,
      showVideos:false,
      showQA:false,
      question:"",
    };
  } ,
   created: function() {
    this.$store.dispatch(
      "Course/getCourse",
      this.$route.params.ID
    );},
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
    },
    Addquestion()
    {
      console.log(this.question);
      this.$store.dispatch("Course/makeaquestion", this.question);
    }
 
  },
  computed: {
    ...mapGetters({
      course: "Course/getCourse"
    })
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

.tablink {
  background-color: #555;
  color: white;
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


.tabcontent {
  color: black;
  padding: 10px 20px;
  height: auto;
  width: 100%;
  background-color:rgba(119, 119, 119, 0.103);
}
.con
{
  width: 100%;
  height: calc(85vh);
}
.container
{ 
  color: rgb(37, 91, 122);
  font-size: 20px;
}
input
{
  text-align: center;
  width: 60%;
  margin-left: 20%;
  margin-bottom: 5px;
}

</style>
