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
    api:"Api-Key",
    loading:false,
    articals:{}
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
      state.api="Api-Key";
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
      axios.defaults.headers.common["x-access-token"] = token;
      commit("auth_request");
      axios
        .get("https://tendersobserver.herokuapp.com/profile")
        .then((response) => {
          console.log(response);
          const user = response.data;
          console.log(user);
          commit("auth_success", { token, user });
          localStorage.setItem("type", user.UserType);
          console.log(localStorage);
          if (flag) 
          {
            router.replace("/UserPage/"+user.ID);

        }
          
        })
        .catch((error) => {
          commit("auth_error", "user_err");
          localStorage.removeItem("access-token");
          console.log(error);
        });
    },
    signup({commit}, member) {
      axios.defaults.headers.common["x-access-token"] = localStorage.getItem("access-token");
      console.log(localStorage.getItem("access-token"));
      console.log(member);
      axios.post("https://tendersobserver.herokuapp.com/signup", {
        Name: member.Name,
        Password: member.Password,
        Email: member.Email,
        Phone: member.Phone,
        UserType: member.UserType,
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
        .post("https://tendersobserver.herokuapp.com/login", {
          Password: user.Password,
          Email: user.Email
        })
        .then((response) => {
          console.log(response);
          const token = response.data.access_token;
          console.log(token);
          localStorage.setItem("access-token", token);
          axios.defaults.headers.common["access-token"] = token;
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
        delete axios.defaults.headers.common["access-token"];
        console.log(localStorage);
        router.replace("/");
    },
    edite({commit},newdataa)
    {
      axios.defaults.headers.common["x-access-token"] = localStorage.getItem("access-token");
      console.log(localStorage.getItem("access-token"));
      console.log(newdataa);

      if(newdataa.Name!="")
      {
      axios.put("https://tendersobserver.herokuapp.com/profile", {
        Name: newdataa.Name,
        Password: newdataa.Password,
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
    if(newdataa.Email!="")
    { 
      axios.put("https://tendersobserver.herokuapp.com/profile", {
        Email: newdataa.Email,
        Password: newdataa.Password,
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
     if(newdataa.Phone!="")
    {
      axios.put("https://tendersobserver.herokuapp.com/profile", {
        Phone: newdataa.Phone,
        Password: newdataa.Password,
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
   if(newdataa.NewPassword!="")
    {  
      axios.put("https://tendersobserver.herokuapp.com/profile", {
        NewPassword: newdataa.NewPassword,
        Password: newdataa.Password,
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
     //////////////////Articals////////////////
     showarticals({commit})
     {
      axios
        .get("https://tendersobserver.herokuapp.com/show_all")
        .then((respons) => {
          console.log(respons);
          commit("setarticals",respons.data.Articles)
        })
        .catch((error) => {
          console.log(error);
        });
     },
     
     searchstart({commit,state},search_bar)
     {
      axios.defaults.headers.common["x-access-token"] = localStorage.getItem("access-token");
      axios
        .get("https://tendersobserver.herokuapp.com/search?apiKey="+state.User.apiKey+"&&year1="+search_bar.year1+"&&month1="+search_bar.month1+"&&day1="+search_bar.day1)
        .then((respons) => {
          console.log(respons);
          commit("setarticals",respons.data.Articles)
          alert("Search Done ^_^");
        })
        .catch((error) => {
          console.log(error);
        });
     },
     searchstartend({commit,state},search_bar)
     {
      axios.defaults.headers.common["x-access-token"] = localStorage.getItem("access-token");
      axios
        .get("https://tendersobserver.herokuapp.com/search?apiKey="+state.User.apiKey+"&&year1="+search_bar.year1+"&&month1="+search_bar.month1+"&&day1="+search_bar.day1
        +"&&year2="+search_bar.year2+"&&month2="+search_bar.month2+"&&day2="+search_bar.day2)
        .then((respons) => {
          console.log(respons);
          commit("setarticals",respons.data.Articles)
          alert("Search Done  ^_^");
        })
        .catch((error) => {
          console.log(error);
        });
     },
     ///////////////////////////////////////admin functions//////////////////////////////////////////////////////////////////////////////////
     showusers({commit})
     {
      axios.defaults.headers.common["x-access-token"] = localStorage.getItem("access-token");
      axios
        .get("https://tendersobserver.herokuapp.com/admin")
        .then((respons) => {
          console.log(respons);
          let result = respons.data.users;
          console.log(result);
          console.log(result[0]);
          commit("setusers", result);
        })
        .catch((error) => {
          console.log(error);
        });

     },
     deleteuser({commit},userid)
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
