import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import EventPage from '../views/EventPage.vue'
import AddPage from '../views/AddPage.vue'
import CategoryPage from '../views/CategoryPage.vue'
import NotFound from '../views/NotFound.vue'

const history = createWebHistory("/sj1")
const routes = [{
        path: '/add-page',
        name: 'AddPage',
        component: AddPage,
    },
    {
        path: '/event-page',
        name: 'EventPage',
        component: EventPage
    }, {
        path: '/category-page',
        name: 'CategoryPage',
        component: CategoryPage
    }, {
        path: '/',
        name: 'HomePage',
        component: HomePage
    }, {
        path: '/:catchNotMatchPath(.*)',
        name: 'NotFound',
        component: NotFound
    }

]
const router = createRouter({ history, routes })
export default router