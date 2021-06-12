<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Ingresar a la plataforma</small>
          </div>

        

          

          <form class="signin-form card-body" @submit.prevent="login(usuario)">
            <div class="form-group input-group input-group-alternative mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text"
                  ><i class="ni ni-email-83"></i
                ></span>
              </div>
              <input
                placeholder="Correo / Identificación"
                v-model="usuario.email"
                class="form-control"
                aria-describedby="addon-right addon-left"
                required
              />
            </div>
            <div class="form-group input-group input-group-alternative mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text"
                  ><i class="ni ni-lock-circle-open"></i
                ></span>
              </div>
              <input
                placeholder="Contraseña"
                type="password"
                v-model="usuario.password"
                class="form-control"
                aria-describedby="addon-right addon-left"
                required
              />
            </div>
            <div
              class="custom-control custom-checkbox custom-control-alternative"
            >
              <input
                id="vULJSPm"
                class="custom-control-input"
                type="checkbox"
              /><label for="vULJSPm" class="custom-control-label"
                ><span class="text-muted">Recordar</span></label
              >
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary my-4">
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="#" class="text-light"
            ><small>¿Olvidaste tu Contraseña?</small></a
          >
        </div>
        <div class="col-6 text-right">
          <router-link to="/register" class="text-light"
            ><small>Crear nueva cuenta</small></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";


export default {
  
  data() {
    return {
      usuario: {
        email: "",
        password: "",
      },
      notificaciones: []
    };
  },
  methods: {
    ...mapActions(["login", "obtenerToken"]),
  },
  created() {
    // console.log(this.obtenerToken)
    // console.log(this.obtenerToken())
    if (this.obtenerToken()) {
      this.$router.push({ name: "Plataform" }).catch(() => {});
    } else {
      this.$router.push({ name: "login" }).catch(() => {});
    }
  },
};
</script>
<style></style>


