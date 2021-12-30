import axios from "axios";
import store from "../store";
import router from "../router/index";
export default {
  namespaced: true,
  state: {
    status: "",
    token: localStorage.getItem("access-token") || "",
    resendtoken: localStorage.getItem("X-token") || "",
    User: {},
    msg:"",
    users:[],
    loading:false
  },
  mutations: {
    auth(state,res) {
      state.msg=res;
    },
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, { token, user }) {
      state.status = "success";
      state.token = token;
      state.User = user;
      state.api=user.apiKey;
    },
    auth_error(state, err_msg) {
      state.status = err_msg;
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.User = {};
    },
    setusers(state,res)
    {
   state.users=res;
    },
    delete(done)
    {
      console.log(done);
    },
    setloading(state,res)
    {
      state.loading=res;
    },
    setarticals(state,response)
    {
      state.articals=response;
    }
  },
  actions: {
    get_user({ commit }, flag) {
      const token = localStorage.getItem("access-token");
      console.log(token);
      axios.defaults.headers.common["Authorization"] = token;
      commit("auth_request");
      axios
        .get("http://localhost:3000/me")
        .then((response) => {
          console.log(response);
          const user = response.data;
          console.log(user);

          commit("auth_success", { token, user });
          localStorage.setItem("type", user.type);
          console.log(localStorage);
          if (flag) 
          {
            router.replace("/UserPage/"+user.user._id);

        }
          
        })
        .catch((error) => {
          commit("auth_error", "user_err");
          localStorage.removeItem("access-token");
          console.log(error);
        });
    },
    signup({commit}, member) {
      axios.defaults.headers.common["Authorization"] = localStorage.getItem("access-token");
      console.log(localStorage.getItem("access-token"));
      console.log(member);
      axios.post("http://localhost:3000/sign-up", {
        userName: member.Username,
        password: member.Password,
        firstName: member.FirstName,
        lastName: member.LastName,
        email: member.Email,
        type: member.Type,
        brithDay:member.BirthDate,
        role:member.Type
      })
      .then((response) => {
        console.log(response);
        commit("auth","success");
        router.replace("/Login");
      })
      .catch(err=> {
        console.log(err);
        commit("auth","Some Thing wrong , Please try other user Name and all fied check is it not empty");
      });
  },
    login({ commit }, user) {
      console.log("hi iam in log in");
      console.log(user);
      commit("auth_request");
      axios
        .post("http://localhost:3000/login", {
          password: user.Password,
          identifier: user.Username
        })
        .then((response) => {
          console.log(response);
          const token = response.data.token;
          console.log(token);
          localStorage.setItem("access-token", token);
          axios.defaults.headers.common["Authorization"] = token;
          store.dispatch("Authorization/get_user", true);
        })
        .catch((error) => {
          console.log(error);
          commit("auth_error", "not user by this email");
          localStorage.removeItem("access-token");
        });
    },
    logout({ commit }) {
      commit("logout");
        localStorage.removeItem("access-token");
        delete axios.defaults.headers.common["Authorization"];
        console.log(localStorage);
        router.replace("/");
    },
    edite({commit},newdataa)
    {
      axios.defaults.headers.common["Authorization"] = localStorage.getItem("access-token");
      console.log(localStorage.getItem("access-token"));
      console.log(newdataa);

      if(newdataa.oldPassword!="" && newdataa.password!="")
      {
      axios.put("http://localhost:3000/me",{
        userName: newdataa.userName,
        oldPassword: newdataa.oldPassword,
        firstName: newdataa.firstName,
        lastName: newdataa.lastName,
        // email: this.user.email,
        brithDay:newdataa.brithDay,
        password:newdataa.password
      })
      .then((response) => {
        console.log(response);
        commit("auth","success");
      })
      .catch(err=> {
        console.log(err);
        commit("auth","Some Thing wrong , Please try other user Name and all fied check is it not empty");
      }); 
       }
       ////not change in password
       else
       {
        axios.put("http://localhost:3000/me",{
          userName: newdataa.userName,
          oldPassword: newdataa.oldPassword,
          firstName: newdataa.firstName,
          lastName: newdataa.lastName,
          // email: this.user.email,
          brithDay:newdataa.brithDay
        })
        .then((response) => {
          console.log(response);
          commit("auth","success");
        })
        .catch(err=> {
          console.log(err);
          commit("auth","Some Thing wrong , Please try other user Name and all fied check is it not empty");
        }); 
       }
    store.dispatch("Authorization/get_user", false);
     },
     ///////////////////////////////////////admin functions//////////////////////////////////////////////////////////////////////////////////
     showusers({commit})
     {
      axios.defaults.headers.common["x-access-token"] = localStorage.getItem("access-token");
      axios
        .get("http://localhost:3000/users")
        .then((respons) => {
          console.log(respons);
          let result = respons.data;
          console.log(result);
          console.log(result[0]);
          commit("setusers", result);
        })
        .catch((error) => {
          console.log(error);
        });

     },
     changerole({commit},userid)
     {
      axios.defaults.headers.common["x-access-token"] = localStorage.getItem("access-token");
      console.log("on delete request");
      console.log(userid);
      axios
        .delete("https://tendersobserver.herokuapp.com/admin" ,{data: {ID : userid}})
        .then((respons) => {
          commit("delete",true)
          console.log(respons.data.message);
          store.dispatch("Authorization/showusers");
        })
        .catch((error) => {
          commit("delete",false)
          console.log(error);
        });
     },
     UpdateArticals({commit})
     {
      commit("setloading",true)
      axios.defaults.headers.common["x-access-token"] = localStorage.getItem("access-token");
      axios
        .delete("https://tendersobserver.herokuapp.com/articles")
        .then((respons) => {
          console.log(respons);
          alert(respons.data.message);
          store.dispatch("Authorization/Scrabing");
        })
        .catch((error) => {
          console.log(error);
        });
     },
     ClearArticals({commit})
     {
      commit("setloading",true)
      axios.defaults.headers.common["x-access-token"] = localStorage.getItem("access-token");
      axios
        .delete("https://tendersobserver.herokuapp.com/articles")
        .then((respons) => {
          commit("setloading",false)
          console.log(respons);
          alert(respons.data.message);
        })
        .catch((error) => {
          console.log(error);
        });
     },
     Scrabing({commit})
     {
      commit("setloading",true)
      axios.defaults.headers.common["x-access-token"] = localStorage.getItem("access-token");
      /////1///
      axios
        .get("https://tendersobserver.herokuapp.com/kwf")
        .then((respons) => {
          console.log(respons);
          alert(respons.data.message);
          commit("setloading",true)
                    /////2///  
          axios
          .get("https://tendersobserver.herokuapp.com/mofgov")
          .then((respons) => {
            console.log(respons);
            alert(respons.data.message);
            commit("setloading",true)
                //////3//
      axios
      .get("https://tendersobserver.herokuapp.com/undp")
      .then((respons) => {
        console.log(respons);
        alert(respons.data.message);
        commit("setloading",true);
              //////4//
      axios
      .get("https://tendersobserver.herokuapp.com/islamic")
      .then((respons) => {
        console.log(respons);
        alert(respons.data.message);
        commit("setloading",true);
                  /////5//
          axios
          .get("https://tendersobserver.herokuapp.com/sermoid")
          .then((respons) => {
            console.log(respons);
            alert(respons.data.message+"  Done ^_^");
            commit("setloading",false);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
      })
      .catch((error) => {
        console.log(error);
      });

          })
          .catch((error) => {
            console.log(error);
          });
        })
        .catch((error) => {
          console.log(error);
        });
     },
     
  },
  getters: {
    Username: (state) => state.User.Name,
    GetStatus: (state) => state.status,
    user: (state) => state.User,
    userid: (state) => state.User.ID,
    usertype: (state) => state.User.UserType,
    msg:(state) => state.msg,
    users: (state) => state.users,
    api: (state) => state.api,
    getloading:(state) => state.loading,
    getarticals:(state) => state.articals,
  },
};
