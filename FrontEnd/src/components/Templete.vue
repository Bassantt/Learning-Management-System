<template>
  <div class="content col-lg-50%" style="box-shadow:0 1px 4px rgba(0,0,0,0.1)">
    <div class="flex  justify-around">
        <div class="flex justify-start w-10">
            <button class="black-20 flex  pointer pt2 pr2 pb2 pl3-l bg-white prev" style="border: none; display: none;"><i class="material-icons">arrow_back</i></button>
        </div>
        <div class="gs lh-copy w-70 w-80-l" style="margin-top:30px;">All articles , sorted by popular publishers first</div>
        <div class="flex justify-end w-10">
            <button class="black-20 flex  pointer pt2 pr3-l pb2 pl2 bg-white next" style="border:none;"></button>
        </div>
        <hr  style="width:100%">
    </div>
    <div class="flex  bb bt b--black-10 bg-na-grey-1 row">
        <div class="col-3">
            <span class="label label-primary http-method" style="color:green;font-weight: 700;">GET</span>
        </div>
        <div class="pa3 lh-copy bl b--black-10 col-9"><span class="http-url">https://newsapi.org/v2/everything?<strong>sortBy=popularity</strong><br/>&amp;apiKey={{api}}</span></div>
         <hr style="width:90%;margin-left:3%;">
    </div>
    <div>
       <p>success: true </p>
       <p v-if="Id != null"> articleID: {{Id}} </p>
        <p v-if="author != null"> author: {{author}} </p>
         <p v-if="closingDate != null">closingDate: {{closingDate}} </p>
        <p v-if="content != null"> content: {{content}} <p>
        <p v-if="description != null"> description: {{description}} </p>
       <p v-if="name != null">  name: {{name}} </p>
        <p v-if="publishDate != null"> publishDate: {{publishDate}} </p>
       <p v-if="publishedAt != null">  publishedAt: {{publishedAt}} </p>
       <p v-if="title != null">  title: {{title}} </p>
       <p v-if="url != null" >  url: {{url}} </p>
       <p v-if="urlToImage != null">  urlToImage: {{urlToImage}} </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Templete",
  props: {
    Id: {
      type: String,
    },
    author: {
      type: String,
    },
     name: {
      type: String,
    },
    closingDate: {
      type: String,
    },
    content: {
      type: String,
    },
     description: {
      type: String,
    },
    publishDate: {
      type: String,
    },
    publishedAt: {
      type: String,
    },
        title: {
      type: String,
    },
     url: {
      type: String,
    },
    urlToImage: {
      type: String,
    }
  },
 computed: {
    ...mapGetters({
       api:"Authorization/api",
    })
  }
};
</script>

<style scoped>
.content
{
    margin-top: 60px;
    display: inline-block;
    width: 40%;
    margin-left: 95px;
}
p
{
  color: rgba(53, 53, 114, 0.938);
  font-weight: 400;
  display: block;
}
</style>