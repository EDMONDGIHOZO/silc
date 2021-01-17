import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/dashboard-holder.vue'
import Auth from '../views/auth/AuthHolder.vue'
import Creator from '../components/helpers/create.vue'

Vue.use(VueRouter)

const routes = [
    /** normal pages holder */
    {
        path: '/',
        component: Home,
        redirect: 'home',
        children: [
            /** dashboarders */
            {
                path: 'home',
                name: 'home',
                component: () =>
                    import (
                        /* webpackChunkName: 'home' */
                        '../views/dashboard/home.vue'
                    ),
            },

            /** content creation */
            {
                path: '/create',
                component: Creator,
                children: [{
                        path: 'data-collection',
                        name: 'data-collection',
                        component: () =>
                            import (
                                /* webpackChunkName: 'data-collection' */
                                '../views/dashboard/create/data-collection.vue'
                            ),
                    },
                    {
                        path: 'groupe',
                        name: 'create-group',
                        component: () =>
                            import (
                                /* webpackChunkName: 'create-group' */
                                '../views/dashboard/create/group.vue'
                            ),
                    },
                    {
                        path: 'paroisse',
                        name: 'create-paroisse',
                        component: () =>
                            import (
                                /* webpackChunkName: 'create-paroisse' */
                                '../views/dashboard/create/paroisse.vue'
                            ),
                    },
                    {
                        path: 'diocese',
                        name: 'create-diocese',
                        component: () =>
                            import (
                                /* webpackChunkName: 'create-diocese' */
                                '../views/dashboard/create/diocese.vue'
                            ),
                    },
                    {
                        path: 'user',
                        name: 'create-user',
                        component: () =>
                            import (
                                /* webpackChunkName: 'create-user' */
                                '../views/dashboard/create/user.vue'
                            ),
                    },
                ],
            },
            //raports
            {
                path: '/groupes',
                name: 'groups',
                component: () =>
                    import (
                        /* webpackChunkName: 'groups' */
                        '../views/dashboard/raports/groups.vue'
                    ),
            },
        ],
    },
    /*** user authentication routes  */
    {
        path: '/auth',
        name: 'user-auth',
        component: Auth,
        redirect: 'auth/login',
        children: [{
            path: 'login',
            name: 'login',
            component: () =>
                import (
                    /* webpackChunkName: 'login' */
                    '../components/login.vue'
                ),
        }, ],
    },
    // 404 page
    {
        path: '*',
        name: 'notFound',
        component: () =>
            import (
                /* webpackChunkName: "notfound" */
                '../views/dashboard/404.vue'
            ),
        meta: {
            title: 'Page not found ',
        },
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/auth/login']
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = localStorage.getItem('currentUser')
    if (authRequired && !loggedIn) {
        next('/auth/login')
    } else {
        next()
    }
})

export default router