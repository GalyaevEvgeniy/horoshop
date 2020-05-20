import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		layouts: null
	},
	mutations: {
		loadLayoutsFromLocalStorage(state){
			state.layouts = localStorage.getItem("layouts") ? JSON.parse(localStorage.getItem("layouts")) : {};
		},
		addOrEditLayout(state, newLayout){
			let result = Object.assign({}, state.layouts);

			result[newLayout.id] = newLayout;
			localStorage.setItem("layouts", JSON.stringify(result));
			state.layouts = result;
		},
		deleteLayout(state, id){
			if (state.layouts[id]){
				delete state.layouts[id];
				localStorage.setItem("layouts", JSON.stringify(Object.assign({}, state.layouts)));
			}
		}
	},
	actions: {}
});
