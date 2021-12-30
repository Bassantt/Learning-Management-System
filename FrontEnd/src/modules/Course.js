import axios from "axios";

export default {
  namespaced: true,
  state: {
    Courses: [],
     done:false
  },
  mutations: {
    setCourses(state, resCourses) {
      state.Courses = resCourses;
    },
    createst(state,st)
    {
      state.done=st
    }
  },
  actions: {
    showCourses({ commit }) {
        const token = localStorage.getItem("access-token");
        console.log(token);
        axios.defaults.headers.common["Authorization"] = token;
      axios
        .get("http://localhost:3000/courses")
        .then(respons => {
          let resCourses = respons.data;
          console.log(resCourses)
          commit("setCourses", resCourses);
        })
        .catch(error => {
          console.log(error);
        });
    },
    create({ commit },course) {
      axios.defaults.headers.common["Authorization"] = localStorage.getItem("access-token");
      console.log(localStorage.getItem("access-token"));
      console.log(course);
      axios.post("http://localhost:3000/me/courses", {
        name:course.name,
        description:course.description,
        instructor:course.instructor,
        syllabus:course.syllabus
      })
      .then((response) => {
        console.log(response);
        alert("Done Create");
        commit("createst",true);
      })
      .catch(err=> {
        console.log(err);
        alert("Some Thing wrong , Please try to fix");
        commit("createst",false);
      });
  },
  },
  getters: {
    getCourses: state => state.Courses,
  }
};