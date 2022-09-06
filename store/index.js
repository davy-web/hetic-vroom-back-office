import Vuex from "vuex";

import global from "./global";

const storeApp = () => {
  return new Vuex.Store({
    state: {
      token: null,
    },
    mutations: {
      setToken(state, token) {
        state.token = token;
      },
    },
    actions: {
      nuxtServerInit(vuexContext, context) {},
      authenticateUser(vuexContext, authData) {
        let authURL =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
          process.env.fbAPIKey;
        if (!authData.isLogin) {
          authURL =
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key= " +
            process.env.fbAPIKey;
        }
        return this.$axios
          .$post(authURL, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true,
          })
          .then((result) => {
            //       //Perform Success Action
            console.log("result", result);
            vuexContext.commit("setToken", result.idToken);

            //       this.status = "res";
            //       this.$router.push("/");
            //       this.success = true;
          })
          .catch((error) => {
            //       // error.response.status Check status code
            console.log("error", error);
            //       this.status = "error";
            //       this.success = true;
          });
      },
    },
    getters: {},
    namespaced: true,
    modules: {
      global,
    },
  });
};

// export const getters = {
//   loggedInUser(state) {
//     return state.auth.user;
//   },
// };

export default storeApp;
