import axios from "axios";
import store from "../store";

export default {
  namespaced: true,
  state: {
    Courses: [],
    myCourses: [],
    done:false,
    Course:{},
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
    }
    
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
  },
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
  store.dispatch("Course/getCourse", replydata.course_id); 
},
////////
AddVideo({ commit },Videodata) {
  axios.defaults.headers.common["Authorization"] = localStorage.getItem("access-token");
  console.log(localStorage.getItem("access-token"));
  console.log(Videodata);
  axios.put("http://localhost:3000/me/courses/"+Videodata.course_id+"/video", {
    title:Videodata.title,
    link:Videodata.link
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
  store.dispatch("Course/getCourse", Videodata.course_id); 
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
  }
};