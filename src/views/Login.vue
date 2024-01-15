<template >
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-5">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Ingresar a la plataforma</small>
          </div>
          <form @submit.prevent="submitLogin()" @input="clearError" class="signin-form card-body">
            <div v-for="field in formFields" :key="field.name"
              class="form-group input-group input-group-alternative mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text"><i :class="field.iconClass"></i></span>
              </div>
              <input v-model="usuario[field.name]" :placeholder="field.placeholder" class="form-control"
                :type="field.type" :required="field.required" />
            </div>
            <div class="custom-control custom-checkbox custom-control-alternative">
              <input id="vULJSPm" class="custom-control-input" type="checkbox" />
              <label for="vULJSPm" class="custom-control-label"><span class="text-muted">Recordar</span></label>
            </div>
            <div class="text-center">
              <button :disabled="isLoading" type="submit" class="btn btn-primary my-4">
                {{ isLoading ? 'Ingresando...' : 'Ingresar' }}
              </button>
            </div>
            <div class="text-danger" v-if="error">{{ error }}</div>
            <div class="text-danger" v-if="errorMessage">{{ errorMessage }}</div>
            <div class="text-success" v-if="successMessage">{{ successMessage }}</div>

          </form>
        </div>
        <div class="row mt-5">
          <div class="col-6">
            <a href="#" class="text-light"><small>¿Olvidaste tu Contraseña?</small></a>
          </div>
          <div class="col-6 text-right">
            <router-link to="/register" class="text-light"><small>Crear nueva cuenta</small></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      usuario: {
        email: "",
        password: "",
      },
      formFields: [
        { name: "email", placeholder: "Correo / Identificación", type: "text", iconClass: "ni ni-email-83", required: true },
        { name: "password", placeholder: "Contraseña", type: "password", iconClass: "ni ni-lock-circle-open", required: true },
      ],
      error: null,
      isLoading: false,
    };
  },
  computed: {
    ...mapState(["errorMessage"]),
  },
  methods: {
    ...mapActions(["login", "obtenerToken"]),
    async submitLogin() {
      try {
        this.isLoading = true;
        await this.login(this.usuario);
      } catch (error) {
        console.log('error XXXX');
        console.log(error);
        this.error = "Credenciales incorrectas. Por favor, verifica tu correo y contraseña.";
      } finally {
        this.isLoading = false;
      }
    },
    clearError() {
      this.error = null;
    },

  }


};
</script>

<style scoped>
/* Estilos específicos del componente */
</style>
