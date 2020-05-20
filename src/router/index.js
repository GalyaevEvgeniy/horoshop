import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/pages/Home.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "https://galyaevevgeniy.github.io/horoshop/dist/",
		name: "Home",
		component: Home
	},
	{
		path: "https://galyaevevgeniy.github.io/horoshop/dist/add-or-edit-layout/:id?",
		name: "addOrEditLayout",
		component: () => import("../views/pages/AddOrEditLayout.vue")
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
