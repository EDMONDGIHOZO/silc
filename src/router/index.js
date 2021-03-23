import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/dashboard-holder.vue";
import Auth from "../views/auth/AuthHolder.vue";
import Creator from "../components/helpers/create.vue";
import Paroisse from "../views/dashboard/raports/singleParoisse.vue";
import SingleGroup from "../views/dashboard/raports/singleGroup.vue";
import Collection from "../views/dashboard/raports/singleCollection.vue";
import CollectionEdit from "../views/dashboard/editing/CollectionEdit.vue";

Vue.use(VueRouter);

const routes = [
  /** normal pages holder */
  {
    path: "/",
    component: Home,
    redirect: "home",
    children: [
      /** dashboarders */
      {
        path: "home",
        name: "home",
        component: () =>
          import(
            /* webpackChunkName: 'home' */
            "../views/dashboard/home.vue"
          ),
      },

      /** content creation */
      {
        path: "/create",
        component: Creator,
        children: [
          {
            path: "data-collection",
            name: "data-collection",
            component: () =>
              import(
                /* webpackChunkName: 'data-collection' */
                "../views/dashboard/create/data-collection.vue"
              ),
          },
          {
            path: "groupe",
            name: "create-group",
            component: () =>
              import(
                /* webpackChunkName: 'create-group' */
                "../views/dashboard/create/group.vue"
              ),
          },
          {
            path: "paroisse",
            name: "create-paroisse",
            component: () =>
              import(
                /* webpackChunkName: 'create-paroisse' */
                "../views/dashboard/create/paroisse.vue"
              ),
          },
          {
            path: "diocese",
            name: "create-diocese",
            component: () =>
              import(
                /* webpackChunkName: 'create-diocese' */
                "../views/dashboard/create/diocese.vue"
              ),
          },
          {
            path: "user",
            name: "create-user",
            component: () =>
              import(
                /* webpackChunkName: 'create-user' */
                "../views/dashboard/create/user.vue"
              ),
          },
        ],
      },

      {
        path: "dioceses",
        name: "all-dioceses",
        component: () =>
          import(
            /* webpackChunkName: 'all-dioceses' */
            "../views/dashboard/raports/dioceses.vue"
          ),
      },
      {
        path: "paroisses",
        name: "all-paroisses",
        component: () =>
          import(
            /* webpackChunkName: 'all-paroisses' */
            "../views/dashboard/raports/paroisses.vue"
          ),
      },
      {
        path: "caisse",
        name: "caisseBanquee",
        component: () =>
          import(
            /* webpackChunkName: 'caisse' */
            "../views/dashboard/raports/caisse.vue"
          ),
      },
      {
        path: "/groupes",
        name: "groups",
        component: () =>
          import(
            /* webpackChunkName: 'groups' */
            "../views/dashboard/raports/groups.vue"
          ),
      },
      {
        path: "/users",
        name: "users",
        component: () =>
          import(
            /* webpackChunkName: 'users' */
            "../views/dashboard/users.vue"
          ),
      },
      {
        path: "/help",
        name: "help",
        component: () =>
          import(
            /* webpackChunkName: 'help' */
            "../views/dashboard/help.vue"
          ),
      },

      // singles
      {
        path: "paroisses/:parid",
        component: Paroisse,
        name: "paroisse",
        props: true,
      },
      {
        path: "collections/:colid",
        component: Collection,
        name: "single-collection",
        props: true,
      },
      {
        path: "groupes/:groupId",
        component: SingleGroup,
        name: "group-view",
        props: true,
      },
      {
        path: "collection/edit/:colid",
        component: CollectionEdit,
        name: "collection-edit",
        props: true,
      },
    ],
  },
  /*** user authentication routes  */
  {
    path: "/auth",
    name: "user-auth",
    component: Auth,
    redirect: "auth/login",
    children: [
      {
        path: "login",
        name: "login",
        component: () =>
          import(
            /* webpackChunkName: 'login' */
            "../components/login.vue"
          ),
      },
    ],
  },
  // 404 page
  {
    path: "*",
    name: "notFound",
    component: () =>
      import(
        /* webpackChunkName: "notfound" */
        "../views/dashboard/404.vue"
      ),
    meta: {
      title: "Page not found ",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/auth/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("currentUser");
  if (authRequired && !loggedIn) {
    next("/auth/login");
  } else {
    next();
  }
});

export default router;
