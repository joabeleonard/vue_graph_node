import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import DomainList from "./components/DomainList";
import DomainView from "./components/DomainView";


Vue.use(VueRouter);

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
	render: h => h(App),
}).$mount("#app");