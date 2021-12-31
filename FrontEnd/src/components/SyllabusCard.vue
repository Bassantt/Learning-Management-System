<template>
  <div class="card rounded col-lg-20%">
    <div id="cardimg">
    </div>
    <div class="card-img-overlay">
      <h4 class="card-title" id="categoryname">Week{{week}}</h4>
    </div>
    <h4>{{description}}</h4>
  </div>
</template>

<style scoped>
#cardimg
{
  background-image: url('../assets/SyllabusCard.jpg');
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
  color: black;
  margin-bottom: 4px;
}
</style>

<script>
export default {
  name: "SyllabusCard",
  props: {
    week: {
      type: Number
    },
    description: {
      type: String
    }
  }
};
</script>