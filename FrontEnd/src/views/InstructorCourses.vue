 <template>
  <div class="cont" v-if="isLoggedIn =='success'">
      <HomeNavigation />
    <div>
      <div class="contaner" >
        <div class="all scroll">
          <h2>show All</h2>
          <div class="row">
            <CourseCard
              class="col-lg-10% col-md-60% col-xs-6"
              v-for="Course in mycourses"
              :key="Course._id"
              :name="Course.name"
              :CourseId="Course._id"
              :description="Course.description"
              :ins="Course.instructor"
            />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.last {
  margin-bottom: 200px;
}
.img-card {
  width: 100%;
  height: 80px;
}
.card-top {
  background-color: #313030;
  padding: 20px;
  height: 250px;
}
*:focus {
  outline: none;
}
.cont {
  margin-bottom: 25px; 
  height: 100vh;
}
.scroll {
  height: 100%;
  overflow-x: visible;
  overflow-y: auto;
}
.all {
  width: 100%;
}
.margin {
  margin: 20px;
}
.row {
  margin-bottom: 15px;
  width: 95%;
}
h2 {
  font-size: 28px;
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
  float: left;
}
.container {
  margin-left: 15px;
  height: 100vh;
  width: 100%;
}

</style>

<script>
import CourseCard from "@/components/CourseCard.vue";
import HomeNavigation from "@/components/HomeNavigationBar.vue";
import { mapGetters } from "vuex";
export default {
  name: "InstructorCourses",
  components: {
    CourseCard,
    HomeNavigation
  },
  mounted() {
    this.$store.dispatch("Course/showmyCourses");
  },
  computed: {
    ...mapGetters({
      mycourses: "Course/getmyCourses",
      isLoggedIn: "Authorization/GetStatus",
    })
  }
};
</script>
