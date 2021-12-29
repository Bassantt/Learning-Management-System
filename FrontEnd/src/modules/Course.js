import axios from "axios";

export default {
  namespaced: true,
  state: {
    Courses: [],

  },
  mutations: {
    setCourses(state, resCourses) {
      state.Courses = resCourses;
    },
  },
  actions: {
    showCourses({ commit }) {
        const token = localStorage.getItem("access-token");
        console.log(token);
        axios.defaults.headers.common["Authorization"] = token;
      axios
        .get("http://localhost:3000/me/courses")
        .then(respons => {
          let resCourses = respons.data;
          console.log(resCourses)
          commit("setCourses", resCourses);
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  getters: {
    getCourses: state => state.Courses,
  }
};