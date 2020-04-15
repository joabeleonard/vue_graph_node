import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import DomainList from "./components/DomainList";
import DomainView from "./components/DomainView";
import Vuex from "vuex";


Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store({

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