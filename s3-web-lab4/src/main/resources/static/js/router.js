
import MainPage from './mainPage.js'; // Import your mainPage.js component
import StartPage from './startPage.js'; // Import your mainPage.js component

Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/start' }, // Redirect root URL to the start page
    { path: '/start', component: StartPage }, // Route for the start page
    { path: '/main', component: MainPage }, // Route for the main page
];

const router = new VueRouter({
    routes
});

export default router;
