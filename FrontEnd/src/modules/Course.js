import axios from "axios";
import store from "../store";

export default {
  namespaced: true,
  state: {
    Courses: [],
    myCourses: [],
    done:false,
    Course:{},
    question:{},
  },
  mutations: {
    setCourses(state, resCourses) {
      state.Courses = resCourses;
    },
    setmyCourses(state, resCourses) {
      state.myCourses = resCourses;
    },
    createst(state,st)
    {
      state.done=st;
    },
    setCourse(state,res)
    {
      state.Course=res;
    },setquestion(state,res)
    {
      state.question=res;
    },
    
  },
  actions: {
    showCourses({ commit,state }) {
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
          state.Courses= [];
          state.myCourses= [];
        });
    },
    showmyCourses({ commit,state }) {
      const token = localStorage.getItem("access-token");
      console.log(token);
      axios.defaults.headers.common["Authorization"] = token;
    axios
      .get("http://localhost:3000/me/courses")
      .then(respons => {
        let resCourses = respons.data.courses;
        console.log(resCourses)
        commit("setmyCourses", resCourses);
      })
      .catch(error => {
        console.log(error);
        state.Courses= [];
        state.myCourses= [];
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
    getCourse({ commit},CourseId) {
      const token = localStorage.getItem("access-token");
      console.log(token);
      console.log("hooo",CourseId);
      axios.defaults.headers.common["Authorization"] = token;
    axios
      .get("http://localhost:3000/courses/"+CourseId)
      .then(respons => {
        let resCourse = respons.data;
        console.log("hhhh",resCourse)
        commit("setCourse", resCourse);
      })
      .catch(error => {
        console.log(error);
      });
  },///getquestion
  getquestion({ commit},questionId) {
    const token = localStorage.getItem("access-token");
    console.log(token);
    console.log("hooo",questionId);
    axios.defaults.headers.common["Authorization"] = token;
  axios
    .get("http://localhost:3000/Questions/"+questionId)
    .then(respons => {
      let resquestion= respons.data;
      console.log("hhhh",resquestion)
      commit("setquestion", resquestion);
    })
    .catch(error => {
      console.log(error);
    });
},
  /////
  makeaquestion({ commit},course) {
    axios.defaults.headers.common["Authorization"] = localStorage.getItem("access-token");
    console.log(localStorage.getItem("access-token"));
    console.log(course);
    axios.post("http://localhost:3000/courses/"+course._id, {
      question:course.question
    })
    .then((response) => {
      console.log(response);
      alert("Done Add");
      commit("createst",true);
    })
    .catch(err=> {
      console.log(err);
      alert("Some Thing wrong , Please try to fix");
      commit("createst",false);
    });
    store.dispatch("Course/getCourse", course._id); 
},
/////////////
Addreply({ commit},replydata) {
  axios.defaults.headers.common["Authorization"] = localStorage.getItem("access-token");
  console.log(localStorage.getItem("access-token"));
  console.log(replydata);
  axios.post("http://localhost:3000/Questions/"+replydata.question_id, {
    reply:replydata.reply
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
  store.dispatch("Course/getquestion", replydata.question_id); 
},
////////
AddVideo({ commit },course) {
  axios.defaults.headers.common["Authorization"] = localStorage.getItem("access-token");
  console.log(localStorage.getItem("access-token"));
  console.log(course);
  axios.post("http://localhost:3000/", {
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
///
Addpdf({ commit },course) {
  axios.defaults.headers.common["Authorization"] = localStorage.getItem("access-token");
  console.log(localStorage.getItem("access-token"));
  console.log(course);
  axios.post("http://localhost:3000/", {
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
}
  },
  getters: {
    getCourses: state => state.Courses,
    getmyCourses: state => state.myCourses,
    getCourse: state => state.Course,
    question: state => state.question,
  }
};