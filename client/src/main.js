import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import DomainList from "./components/DomainList";
import DomainView from "./components/DomainView";
import Vuex from "vuex";
import axios from "axios/dist/axios";


Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store({
	state:{
		items: {
			prefix: [],
			suffix: []
		},
		domains: []
	},
	actions:{
		async addItem(context, payload){
			const item = payload;
			axios({
				url: "http://localhost:4000",
				method: "post",
				data: {
					query: `
						mutation ($item: ItemInput) {
							newItem: saveItem(item: $item) {
								id
								type
								description
							}
						}
					`,
					variables: {
						item
					}
				}
			}).then(response => {
				const query = response.data;
				const newItem = query.data.newItem;
				context.state.items[item.type].push(newItem);
				context.dispatch("generateDomains");
			});
		},
		async removeItem(context, payload){
			const item =payload;
			axios({
				url: "http://localhost:4000",
				method: "post",
				data: {
					query: `
						mutation ($id: Int) {
							deleted: deleteItem(id: $id)
						}
					`,
					variables: {
						id: item.id
					}
				}
			}).then(() => {
				context.state.items[item.type].splice(context.states.items[item.type].indexOf(item), 1);
				context.dispatch("generateDomains");
			});
		},
		async getItem(context, payload){
			const type = payload;
			return axios({
				url: "http://localhost:4000",
				method: "post",
				data: {
					query: `
						query ($type: String) {
							items: items (type: $type) {
								id
								type
								description
							}
						}
					`,
					variables: {
						type
					}
				}
			}).then(response => {
				const query = response.data;
				context.state.items[type] = query.data.items;
			});
		},
		async generateDomains(context){
			axios({
				url: "http://localhost:4000",
				method: "post",
				data: {
					query: `
						mutation {
							domains: generateDomains {
								name
								checkout
								available
							}
						}
					`
				}
			}).then((response) => {
				const query = response.data;
				context.state.domains = query.data.domains;
			});
		}
	}
});

const router = new VueRouter({
	router:[
		{
			path:"/domains",
			component: DomainList
		},{
			path: "/domains/:domains",
			component:DomainView
		},
		{
			path: "/",
			redirect: "/domains"
		}
	]
});
Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount("#app");