<template>
  <div class="cont">
    <HomeNavigation />
    <div class="split" v-if="isLoggedIn =='success'">
    <div >
        <div id="icon_cont">
        <button class="tablink" @click="syllabus()" id="defaultOpen">syllabus</button>
        <button class="tablink" @click="Pdfmaterial()">Pdfmaterial</button>
        <button class="tablink" @click="Videos()">Videos</button>
        <button class="tablink" @click="QA()">QA</button>
        </div>
        <div class="conta ">
        <h1>{{course.course.name}}</h1>
        <h2>
          {{course.course.description}}
        </h2>
        <h2>
          {{course.course.instructor}}
        </h2>
      </div>
    <div class="d-flex justify-content-center h-100">
      <div  class="tabcontent" v-if="showsyllabus">
          <div class="row">
              <SyllabusCard
                class="col-lg-10% col-md-60% col-xs-6"
                v-for="(syllab,index) in course.course.syllabus"
                :key="index"
                :week="index"
                :description="syllab[0][0]"
              />
            </div>
      </div>

      <div  class="tabcontent" v-if="showPdfmaterial">
       <div id="activities" v-if=" user.user.type=='Admin'||user.user.role=='Instructor'">
       <h2>Add activities to a course</h2>
          <p>Add Pdfmaterial to a course</p>
          <input type="file" @change="onFileChange" />
          <button @click="onUploadFile" class="upload-button"
          :disabled="!this.selectedFile">Upload file</button>
       </div>
       <div class="row">
          <PdfCard
             class="col-lg-10% col-md-60% col-xs-6"
             v-for=" Pdf in course.course.activitiesAsPDF"
             :key="Pdf[0].title"
             :link="Pdf[0].link"
             :title="Pdf[0].title"
          />
        </div>
      </div>

      <div  class="tabcontent" v-if="showVideos">
      <div id="activities" v-if=" user.user.type=='Admin'||user.user.role=='Instructor'">
        <h2>Add activities to a course</h2>
        <p>Add Video to a course</p>
        <input
          type="text"
          v-model="title"
          class="form-control"
          id="autoSizingInput"
          placeholder="put a title"
         />
        <input
          type="text"
          v-model="link"
          class="form-control"
          id="autoSizingInput"
          placeholder="put a youtube_link"
      />
      <button @click="AddVideo" class="btn btn-primary">
      Add a Video
      </button>
    </div>
        <div class="row">
          <VideoCard
             class="col-lg-10% col-md-60% col-xs-6"
             v-for=" Video in course.course.activitiesAsVedio"
             :key="Video[0].title"
             :link="Video[0].link"
             :title="Video[0].title"
          />
        </div>
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
                v-for=" question in course.questions"
                :key="question._id"
                :id= "question._id"
                :question="question.question"
                :replies="question.replies"
                :course_id="question.course"
              />
            </div>
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
import VideoCard from  "@/components/VideoCard.vue";
import PdfCard from  "@/components/PdfCard.vue";
export default {
  name: "CoursePage",
  components: {
    HomeNavigation,
    SyllabusCard,
    QACard,
    VideoCard,
    PdfCard
  },
    data: function () {
    return {
      showsyllabus:true,
      showPdfmaterial:false,
      showVideos:false,
      showQA:false,
      question:"",
      link:"",
      title:"",
      selectedFile: "",
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
      const questiondata={
        _id : this.course.course._id,
        question : this.question
      }
      this.$store.dispatch("Course/makeaquestion", questiondata);
      this.question="";
    },
     AddVideo()
    {
      console.log(this.link);
      const Videodata={
        course_id : this.course.course._id,
        link : this.link,
        title:this.title
      }
      this.$store.dispatch("Course/AddVideo", Videodata);
      this.link="";
    },
     onFileChange(e) {
      const selectedFile = e.target.files[0]; // accessing file
      this.selectedFile = selectedFile;
    },
    onUploadFile() {
      const formData = new FormData();
      formData.append("file", this.selectedFile);  // appending file
      this.$store.dispatch("Course/Addpdf", [this.course.course._id,formData]);
      this.selectedFile=""
    } 
  },
  computed: {
    ...mapGetters({
      course: "Course/getCourse",
      user:"Authorization/user",
      isLoggedIn: "Authorization/GetStatus",
    })
  },
  
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css?family=Numans');


.cont{
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
  z-index: 10000;
}

.tablink:hover {
  background-color: #777;
}


.tabcontent {
  color: black;
  padding: 10px 20px;
  height: auto;
  width: 100%;
  background-color:transparent;
}
.con
{
  width: 100%;
  height: auto;
  border:1px solid rgb(37, 91, 122);
}
.conta
{ 
  background-image: url('../assets/course.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  color: black;
  font-size: 20px;
  float: left;
}
input
{
  text-align: center;
  width: 60%;
  margin-left: 20%;
  margin-bottom: 5px;
}
.split
{
  background-color: rgba(119, 119, 119, 0.103);
}
#activities
{
  float: left;
  margin-bottom: 100px;
}
</style>
