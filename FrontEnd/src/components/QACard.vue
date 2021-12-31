<template>
  <div class=" container card rounded col-lg-20%">
    <h1>{{question}}</h1>
            <div class="row">
            <Reply
                class="col-lg-10% col-md-60% col-xs-6"
                v-for=" (reply,index) in replies"
                :key="index"
                :reply="reply[0].reply"
                :userName="reply[0].userName"
                :course_id="course_id"
              />
            </div>
        <div>     
            <input
                type="text"
                v-model="reply"
                class="form-control"
                id="autoSizingInput"
                placeholder="reply"
            />
            <button @click="Addreply" class="btn btn-primary">
            reply
            </button>
        </div>     
  </div>
</template>


<script>
import Reply from  "@/components/Reply.vue";
export default {
  name: "QACard",
    components: {
    Reply
  },
  props: {
    id: {
      type: String
    },
    question: {
      type: String
    },
    replies: {
      type: Array
    },
    course_id: {
      type: String
    },
    
  },
  data() {
    return {
      reply:"",
    };
  },
  methods: {
    Addreply() {
       console.log(this.reply);
       const replydata={
        question_id : this.id,
        reply : this.reply,
        course_id:this.course_id
      }
       this.$store.dispatch("Course/Addreply", replydata);
       this.reply=""
    }
  }
};
</script>

<style scoped>
#cardimg
{
  /* background-image: url('../assets/SyllabusCard.jpg');
  background-size: cover; */
  width:100%;
}
.round {
  border-radius: 10px;
  background-color: rgb(110, 106, 106);
}
.card {
  background-color: #1312122c;
  width:80%;
  height:auto;
  margin-left: 50px;
  margin-right: 20px;
  margin-top: 18px;
  border-radius: 10px;
}
#cardimg {
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
}
h4 {
  font-size: 22px;
  font-weight: 790;
  color: black;
  margin-bottom: 4px;
}
.btn
{
  margin-bottom: 4px;
}
input
{
  width:100%;
  margin-top : 4px;
  margin-bottom : 4px;
}
h1
{
  background-color: rgba(37, 91, 122, 0.664);
  border-radius: 1px;
}
</style>