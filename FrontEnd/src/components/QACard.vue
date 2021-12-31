<template>
  <div class="card rounded col-lg-20%">
    <div id="cardimg">
    </div>
    <div>
      <h4 class="card-title" id="categoryname">{{id}}</h4>
    </div>
    <h1>{{question.question}}</h1>
    <h4>{{question.replies[0][0].reply}}</h4>
    <h4>{{question.replies[1][0].reply}}</h4>
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
</template>


<script>
import { mapGetters } from "vuex";
export default {
  name: "QACard",
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      reply:"",
    };
  } ,
   created: function() {
     console.log(this.id);
    this.$store.dispatch(
      "Course/getquestion",
      this.id
    );},
  methods: {
    Addreply() {
       console.log(this.reply);
       const replydata={
        question_id : this.id,
        reply : this.reply
      }
       this.$store.dispatch("Course/Addreply", replydata);
       this.reply=""
    }
  },
  computed: {
    ...mapGetters({
      question: "Course/question",
    })
  },
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
  background: #13121256;
  width:400px;
  height: 300px;
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
</style>