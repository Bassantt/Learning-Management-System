import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import UserPage from "../views/UserPage.vue";
import Admin from "../views/Admin.vue";
import Courses from "../views/Courses.vue";
import CoursePage from "../views/CoursePage.vue";
import AddCourse from "../views/AddCourse.vue";
import InstructorCourses from "../views/InstructorCourses.vue";
import Element from 'element-ui'

Vue.use(Element)

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Register",
    name: "Register",
    component: Register,
  },
  {
    path: "/UserPage/:ID",
    name: "UserPage",
    component: UserPage,
  },
  {
    path: "/Admin/:ID",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/Courses/:ID",
    name: "Courses",
    component: Courses,
  },
  {
    path: "/InstructorCourses/:ID",
    name: "InstructorCourses",
    component: InstructorCourses,
  },
  {
    path: "/CoursePage/:ID",
    name: "CoursePage",
    component: CoursePage,
  }
  ,
  {
    path: "/AddCourse/:ID",
    name: "AddCourse",
    component: AddCourse,
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  store,
});


router.beforeEach((to, from, next) => {
  console.log(store.getters["Authorization/GetStatus"]);
  if (to.matched.some((record) => record.meta.isLogged)) {
    if (store.getters["Authorization/GetStatus"] == "success") {
      next("/");
      return;
    }
  } else {
    next();
  }
});


export default router;