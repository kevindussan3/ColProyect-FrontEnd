<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4"><small>Registro</small></div>
          <form role="form" @submit.prevent="register(model)">
            <div class="form-group input-group input-group-alternative">
              <div class="input-group-prepend">
                <span class="input-group-text"
                  ><i class="ni ni-hat-3"></i
                ></span>
              </div>
              <input
                placeholder="Nombres"
                v-model="model.nombres"
                class="form-control"
                aria-describedby="addon-right addon-left"
              />
            </div>
            <div class="form-group input-group input-group-alternative">
              <div class="input-group-prepend">
                <span class="input-group-text"
                  ><i class="ni ni-hat-3"></i
                ></span>
              </div>
              <input
                placeholder="Apellidos"
                v-model="model.apellidos"
                class="form-control"
                aria-describedby="addon-right addon-left"
              />
            </div>
            <div class="form-group input-group input-group-alternative">
              <div class="input-group-prepend">
                <span class="input-group-text"
                  ><i class="ni ni-hat-3"></i
                ></span>
              </div>
              <input
                v-model="model.identificacion"
                type="number"
                placeholder="Identificación"
                class="form-control"
                aria-describedby="addon-right addon-left"
              />
            </div>
            <div class="form-group input-group input-group-alternative">
              <div class="input-group-prepend">
                <span class="input-group-text"
                  ><i class="ni ni-hat-3"></i
                ></span>
              </div>
              <input
                placeholder="Telefono"
                v-model="model.telefono"
                type="number"
                class="form-control"
                aria-describedby="addon-right addon-left"
              />
            </div>
            <div class="form-group input-group input-group-alternative">
              <div class="input-group-prepend">
                <span class="input-group-text"
                  ><i class="ni ni-email-83"></i
                ></span>
              </div>
              <input
                placeholder="Correo"
                v-model="model.email"
                type="email"
                class="form-control"
                aria-describedby="addon-right addon-left"
                focused=""
              />
            </div>
            <div class="form-group input-group input-group-alternative">
              <div class="input-group-prepend">
                <span class="input-group-text"
                  ><i class="ni ni-lock-circle-open"></i
                ></span>
              </div>
              <input
                placeholder="Password"
                v-model="model.password"
                type="password"
                class="form-control"
                aria-describedby="addon-right addon-left"
              />
            </div>
            <div class="text-muted font-italic">
              <small
                >password strength:
                <span class="text-success font-weight-700">strong</span></small
              >
            </div>
            <div class="row my-4">
              <div class="col-12">
                <div
                  class="custom-control custom-checkbox custom-control-alternative"
                >
                  <input
                    id="GFSbhTr"
                    class="custom-control-input"
                    type="checkbox"
                  /><label for="GFSbhTr" class="custom-control-label"
                    ><span class="text-muted"
                      >I agree with the
                      <a href="http://localhost:8080/register#!"
                        >Privacy Policy</a
                      ></span
                    ></label
                  >
                </div>
              </div>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary my-4">
                Create account
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="http://localhost:8080/register" class="text-light"
            ><small>Forgot password?</small></a
          >
        </div>
        <div class="col-6 text-right">
          <a href="http://localhost:8080/login" class="text-light"
            ><small>Login into your account</small></a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "register",
  data() {
    return {
      model: {
        nombres: "",
        apellidos: "",
        telefono: "",
        email: "",
        password: "",
        identificacion: "",
      },
    };
  },
  methods:{
    ...mapActions(['register'])
  }
};
</script>
<style></style>
