<template>
  <div class="card rounded col-lg-20%">
    <div id="cardimg">
    </div>
    <div class="card-img-overlay">
      <h4 class="card-title" id="categoryname">{{ name }}</h4>
      <div>
        <router-link
          :to="{ path: '/CoursePage/' + CourseId }"
          class="stretched-link"
          id="carglink"
          testid="cardlink"
        ></router-link>
      </div>
    </div>
    description:<h4>{{description}}</h4>
    instructorInfo:<h4> {{instructorInfo}}</h4>
  </div>
</template>

<style scoped>
#cardimg
{
  background-image: url('../assets/backuse.jpg');
  background-size: cover;
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
  color: white;
  margin-bottom: 4px;
}
</style>

<script>
export default {
  name: "CourseCard",
  props: {
    description: {
      type: String
    },
    name: {
      type: String
    },
    CourseId: {
      type: String
    },
    instructorInfo: {
      type: String
    }
  }
};
</script>