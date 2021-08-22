<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Plataforma"
      title="Plataforma"
    >
      <template v-slot:links>
        <!--                                        Menu estudiante                        -->
        <div v-if="rol == 'estudiante'">
          <sidebar-item
            :link="{
              name: 'Notas',
              icon: 'ni ni-tv-2 text-primary',
              path: '/dashboard',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Actividades',
              icon: 'ni ni-planet text-blue',
              path: '/icons',
            }"
          /> 
          <sidebar-item
            :link="{
              name: 'Calendario',
              icon: 'ni ni-planet text-blue',
              path: '/icons',
            }"
          />  
          <sidebar-item
            :link="{
              name: 'Chat',
              icon: 'ni ni-planet text-blue',
              path: '/icons',
            }"
          />    <sidebar-item
            :link="{
              name: 'Certificados',
              icon: 'ni ni-planet text-blue',
              path: '/icons',
            }"
          />          
        </div>
        <!-- Menus Docentes -->
        <div v-if="rol == 'docente'">
          <sidebar-item
            :link="{
              name: 'Notas',
              icon: 'ni ni-tv-2 text-primary',
              path: '/GradoNotas',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Cursos',
              icon: 'fab fa-bandcamp text-primary',
              path: '/cursos',
            }"
          />
          
          <sidebar-item
            :link="{
              name: 'Actividades',
              icon: 'ni ni-planet text-blue',
              path: '/icons',
            }"
          />   <sidebar-item
            :link="{
              name: 'Asistencias',
              icon: 'ni ni-planet text-blue',
              path: '/asistencia',
            }"
          />   
          <sidebar-item
            :link="{
              name: 'Calendario',
              icon: 'ni ni-planet text-blue',
              path: '/calendario',
            }"
          />    
          <sidebar-item
            :link="{
              name: 'Chat',
              icon: 'ni ni-planet text-blue',
              path: '/icons',
            }"
          />         
        </div>  
       
       
        <!--                                        Menu Admin                        -->

        <div v-if="rol == 'admin'">
          <sidebar-item
            :link="{
              name: 'Usuarios',
              icon: 'ni ni-tv-2 text-primary',
              path: '/usuarios',
            }"
          />

          <sidebar-item
            :link="{
              name: 'Materias',
              icon: 'ni ni-planet text-blue',
              path: '/materias',
            }"
          />

          <sidebar-item
            :link="{
              name: 'Grados',
              icon: 'fa fa-square text-blue',
              path: '/grados',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Notas',
              icon: 'ni ni-pin-3 text-orange',
              path: '/maps',
            }"
          />
          <sidebar-item
            :link="{
              name: 'User Profile',
              icon: 'ni ni-single-02 text-yellow',
              path: '/profile',
            }"
          />
          <!-- <sidebar-item
            :link="{
              name: 'Tables',
              icon: 'ni ni-bullet-list-67 text-red',
              path: '/tables',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Login',
              icon: 'ni ni-key-25 text-info',
              path: '/login',
            }"
          />
          <sidebar-item
            :link="{
              name: 'Register',
              icon: 'ni ni-circle-08 text-pink',
              path: '/register',
            }"
          /> -->
        </div>

      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar :user="user"></dashboard-navbar>

      <div @click="toggleSidebar">
        <!-- your content here -->
        <router-view></router-view>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import { mapActions } from "vuex";
export default {
  components: {
    DashboardNavbar,
    ContentFooter,
  },
  data() {
    return {
      sidebarBackground: "vue", //vue|blue|orange|green|red|primary,
      user: {},
      rol: "",
    };
  },
  methods: {
    ...mapActions(["obtenerToken", "datosUser"]),
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
  created() {
    this.user = this.datosUser();
    this.user.then((value) => {
      (this.rol = value.roles[0].name), console.log(value.roles[0].name);
    });
    // this.convertir()
    // console.log(this.user)
    // console.log(this.user.Prom.nombres)
  },
};
</script>
<style lang="scss"></style>
