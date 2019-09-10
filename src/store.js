import Vue from "vue";
import Vuex from "vuex";
import userService from "./services/user.service";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		loggedInUser: userService.getLoggedInUser() 
	},

	mutations: {
		setUser(state, context) {
			state.loggedInUser = context.currUser;
		},

  },
  

	actions: {
		async login({ commit }, { user }) {
			let currUser;

			try {
        currUser = await userService.login(user);
        if (user){
          commit({ type: "setUser", currUser });
          return currUser;
        } 
        
			} catch (err) {
				console.log("Could Not Signup, error: ", err);
				throw err;
			}
		}
  },
  


	getters: {
		getUser({ loggedInUser }) {
			return loggedInUser;
		},

	}
});