import { createRouter, createWebHistory } from "vue-router";
import store from '../store'


import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";
import VerUsuario from "@/views/Dashboard/VerUsuario.vue";

import Dashboard from "../views/Dashboard.vue";
import Icons from "../views/Icons.vue";
import Maps from "../views/Maps.vue";
import Profile from "../views/UserProfile.vue";
import Tables from "../views/Tables.vue";
import Usuarios from "../views/Usuarios.vue";
import Materia from "../views/materias/view_matters.vue";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

const routes = [

    {
        path: "/dashboard",
        redirect: "/dashboard",
        name: 'Plataform',
        component: DashboardLayout,
        meta: { requireAuth: true },
        children: [{
                path: "/usuarios",
                name: "usuarios",
                components: { default: Usuarios },
            },
            {
                path: "/materias",
                name: "materia",
                components: { default: Materia },
            },
            {
                path: "/dashboard",
                name: "Dashboard",
                components: { default: Dashboard },
            },
            {
                path: "/icons",
                name: "icons",
                components: { default: Icons },
            },
            {
                path: "/maps",
                name: "maps",
                components: { default: Maps },
            },
            {
                path: "/profile",
                name: "profile",
                components: { default: Profile },
            },
            {
                path: "/tables",
                name: "tables",
                components: { default: Tables },
            },
            {
                path: "/verUsuario/:id",
                name: "verUsuario",
                components: { default: VerUsuario },
            },

        ],

    },

    {
        path: "/",
        redirect: "login",
        component: AuthLayout,
        children: [{
                path: "/login",
                name: "login",
                components: { default: Login },
            },
            {
                path: "/register",
                name: "registro",
                components: { default: Register },
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});


router.beforeEach((to, from, next) => {
    const rutaProtegida = to.matched.some(record => record.meta.requireAuth);
    console.log(rutaProtegida)
    if (rutaProtegida && store.state.toke === null) {
        // ruta protegida es true
        // token es nulo true, por ende redirigimos al inicio
        next({ name: 'login' })
    } else {
        // En caso contrario sigue...
        // console.log("aqui pasa")

        next()
    }

})






export default router;