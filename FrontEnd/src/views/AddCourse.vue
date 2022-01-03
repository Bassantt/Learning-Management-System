<template>
  <div class="cont" v-if="isLoggedIn =='success'">
    <HomeNavigation />    
    <div class="container">
       <form class="row">
          <div class="col-auto">
            <label class="visually-hidden">coursename</label>
            <input
              type="text"
              v-model="name"
              class="form-control"
              id="autoSizingInput"
              placeholder="coursename"
            />
            <label class="visually-hidden">description</label>
            <input
              type="text"
              v-model="description"
              class="form-control"
              id="autoSizingInput"
              placeholder="description"
            />
            <input
              type="text"
              v-model="instructor"
              class="form-control"
              id="autoSizingInput"
              placeholder="info about you"
            />
           <button @click="Addsyllabus" id="add" class="btn btn-primary">
              +
            </button>
            <h2>week {{(this.syllabus).length +1}}</h2>
            <p>write week description</p>
            <input
              type="text"
              class="form-control"
              id="autoSizingInput"
              placeholder="syllabus description"
              v-model="syllab"
            />
            <!-- <input type="file" ref="file" multiple="multiple" @change="print"> -->
            
            <button @click="Create" type="submit" class="btn btn-primary">
              Create
            </button>
          </div>
        </form>
    </div>
</div>
</template>

<script>
import HomeNavigation from "@/components/HomeNavigationBar.vue";
import { mapGetters } from "vuex";
export default {
  name: "AddCourse",
  components: {
    HomeNavigation
  },
    data() {
    return {
      name:"",
      description:"",
      instructor:"",
      syllabus:[],
      syllab:"",
    //   pdffiles:{},
    //   videos:{},
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "Authorization/GetStatus",
    }),
  },
   methods: {
    // selectFile() {
    //  this.file=this.$refs.file.files[0];
    // },
    // Add() {
    // let formData = new FormData();
    // for( var i = 0; i < this.$refs.file.files.length; i++ ){
    //     let file = this.$refs.file.files[i];
    //     formData.append('files[' + i + ']', file);
    // }
    // console.log(formData);
    // },
    // print()
    // {
    // let formData = new FormData();
    // for( var i = 0; i < this.$refs.file.files.length; i++ ){
    //     let file = this.$refs.file.files[i];
    //     formData.append('files[' + i + ']', file);
    // }
    // console.log(formData);
    // },
    Create(e)
    {
    const newcourse = {
      name:this.name,
      description:this.description,
      instructor:this.instructor,
      syllabus:this.syllabus
      };
      console.log(newcourse);
      this.$store.dispatch("Course/create", newcourse);
      e.preventDefault();
      this.name="";
      this.description="";
      this.instructor="";
      this.syllabus=[];
    },
    Addsyllabus(e)
    {  e.preventDefault();
        if(this.syllab!="") 
       {
           var ob={};
           ob[(this.syllabus).length]=this.syllab;
           this.syllabus.push(ob);
           console.log(this.syllabus);
           this.syllab = "";
       }
       else
       {
           alert("type a syllab ")
       }
    }
  },
  
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css?family=Numans');

.cont{
background-image: url('../assets/template.jpg');
background-size: cover;
background-repeat: no-repeat;
font-family: 'Numans', sans-serif;
height: calc(100vh);
align-content: center;
}
.con
{
  width: 100%;
}
.row
{
  background-color: rgba(15, 11, 11, 0.452);
  width: 40%;
  border-radius: 10px;
  margin-left: 10%;
  margin-top: 110px;
  padding: 10px;
}

input
{
    width: 90%;
    margin-bottom: 10px;
}
h2,p
{
    color:white
}
#add
{
    float:right;
}
</style>
