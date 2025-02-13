import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        path: "/",
        redirect: { name: "inputsEtapa" },
        component: () => import("../views/inputsEtapa.vue")
    },
    {
        path: "/inputs",
        name: "inputsEtapa",
        component: () => import("../views/inputsEtapa.vue")
    },
    {
        path: "/primeira",
        name: "primeiraEtapa",
        component: () => import("../views/primeiraEtapa.vue")
    },
    {
        path: "/segunda",
        name: "segundaEtapa",
        component: () => import("../views/segundaEtapa.vue")
    },
    {
        path: "/resultados",
        name: "resultadosEtapa",
        component: () => import("../views/resultadosEtapa.vue")
    }

]

const router = createRouter({
    history: createWebHashHistory(),
    // mode: "history", // Use 'history' mode for cleaner URLs (requires server configuration)
    // base: "/escolha_acessos_v2/", // Specify your base URL here
    routes
})

export default router
