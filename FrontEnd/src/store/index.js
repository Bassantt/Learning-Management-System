import Vue from "vue";
import Vuex from "vuex";
import Authorization from "../modules/Authorization";
import Course from "../modules/Course"
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Authorization,
    Course
  },
});