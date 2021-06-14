<template>
  <div>
    <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center">
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
          <div class="card card-profile shadow">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <img
                      src="img/theme/team-4-800x800.jpg"
                      class="rounded-circle"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div
              class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
            >
              <div class="d-flex justify-content-between">
                <!-- <base-button size="sm" type="info" class="mr-4"
                  >Connect</base-button
                >
                <base-button size="sm" type="default" class="float-right"
                  >Message</base-button
                > -->
              </div>
            </div>
            <div class="card-body pt-0 pt-md-4">
              <div class="row">
                <div class="col">
                  <div
                    class="card-profile-stats d-flex justify-content-center mt-md-5"
                  >
                    <!-- <div>
                      <span class="heading">22</span>
                      <span class="description">Friends</span>
                    </div>
                    <div>
                      <span class="heading">10</span>
                      <span class="description">Photos</span>
                    </div>
                    <div>
                      <span class="heading">89</span>
                      <span class="description">Comments</span>
                    </div> -->
                  </div>
                </div>
              </div>
              <div class="text-center">
                <h3>
                  Jessica Jones<span class="font-weight-light">, 27</span>
                </h3>
                <div class="h5 font-weight-300">
                  <i class="ni location_pin mr-2"></i>Bucharest, Romania
                </div>
                <div class="h5 mt-4">
                  <i class="ni business_briefcase-24 mr-2"></i>Solution Manager
                  - Creative Tim Officer
                </div>
                <div>
                  <i class="ni education_hat mr-2"></i>University of Computer
                  Science
                </div>
                <hr class="my-4" />
                <p>
                  Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick
                  Murphy — writes, performs and records all of his own music.
                </p>
                <a href="#">Show more</a>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-8 order-xl-1">
          <card shadow type="secondary">
            <template v-slot:header>
              <div class="bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">Usuario</h3>
                  </div>
                  <!-- <div class="col-4 text-right">
                    <a href="#!" class="btn btn-sm btn-primary">Settings</a>
                  </div> -->
                </div>
              </div>
            </template>

            <form>
              <h6 class="heading-small text-muted mb-4">
                Información del {{ roles }}
              </h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-lg-6">
                    <h5>Identificacion</h5>
                    <div class="h4 font-weight-300">{{ identificacion }}</div>
                  </div>
                  <div class="col-lg-6">
                    <h5>Correo Elctrónico</h5>
                    <div class="h4 font-weight-300">{{ email }}</div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                   <h5>Nombres</h5>
                   <div class="h4 font-weight-300">{{ nombres }}</div>
                  </div>
                  <div class="col-lg-6">
                    <h5>Apellidos</h5>
                    <div class="h4 font-weight-300">{{ apellidos }}</div>
                  </div>
                  <div class="col-lg-6">
                    <h5>Grupo sanguineo</h5>
                    <div class="h4 font-weight-300">{{ rh }}</div>
                  </div>
                  <div class="col-lg-6">
                    <h5>Jornada</h5>
                    <div class="h4 font-weight-300">{{ jornada }}</div>
                  </div>
                </div>
              </div>
              <hr class="my-4" />
              <!-- Address -->
              <h6 class="heading-small text-muted mb-4">
                Información de contacto
              </h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-md-12">
                   <h5>Dirección</h5>
                    <div class="h4 font-weight-300">{{ direccion }}</div>
                     <h5>Telefono</h5>
                    <div class="h4 font-weight-300">{{ telefono }}</div>
                  </div>
                </div>
                <div class="row">
                  <!-- <div class="col-lg-4">
                     <base-input
                      alternative=""
                      label="Telefono"
                      placeholder="Telefono"
                      input-classes="form-control-alternative"
                      v-model="model.telefono"
                    />
                  </div> -->
                  <!-- <div class="col-lg-4">
                    <base-input
                      alternative=""
                      label="Country"
                      placeholder="Country"
                      input-classes="form-control-alternative"
                      v-model="model.country"
                    />
                  </div>
                  <div class="col-lg-4">
                    <base-input
                      alternative=""
                      label="Postal code"
                      placeholder="Postal code"
                      input-classes="form-control-alternative"
                      v-model="model.zipCode"
                    />
                  </div> -->
                </div>
              </div>
              <hr class="my-4" />
              <!-- Description -->
              <!-- <h6 class="heading-small text-muted mb-4">About me</h6>
              <div class="pl-lg-4">
                <div class="form-group">
                  <base-input alternative="" label="About Me">
                    <textarea
                      rows="4"
                      class="form-control form-control-alternative"
                      placeholder="A few words about you ..."
                    >
A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</textarea
                    >
                  </base-input>
                </div>
              </div> -->
            </form>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "user-profile",
  data() {
    return {
      url: this.$store.state.url,
      nombres: "",
      apellidos: "",
      telefono: "",
      email: "",
      identificacion: "",
      fechaNacimiento: "",
      direccion: "",
      rh: "",
      roles: "",
      jornada: "",
      user: [],
      id: this.$route.params.id,
    };
  },
  methods: {
    async getUser() {
      console.log(this.id);
      try {
        const res = await fetch(this.url+`api/admin/${this.id}`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.toke,
          },
        });

        this.user = res.json();
        this.user.then((value) => {
          console.log(value.nombres);
          this.nombres = value.nombres;
          this.apellidos = value.apellidos;
          this.telefono = value.telefono;
          this.email = value.email;
          this.identificacion = value.identificacion;
          this.fechaNacimiento = value.fechaNacimiento;
          this.direccion = value.direccion;
          this.rh = value.rh;
          this.roles = value.roles[0].name;
          this.jornada = value.jornada;
        });
        console.log(this.user);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getUser();
  },
};
</script>
<style></style>
