<template>
  <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    <div class="col text-right p-3">
      <button class="btn btn-primary btn-sm" @click="crearGrado()">
        Crear Actividad
      </button>
    </div>

    <div class="row">
      <div class="col-sm-4" v-for="(item, index) in data" :key="index">
        <div class="card shadow p-3 mb-5 bg-white rounded">
          <div class="card-body">
            <h5 class="card-title">{{ item.titulo }}</h5>
            <p class="card-text">
              {{ item.descripcion }}              
            </p>
            <h5>Puntos: {{ item.puntos }}</h5>
            <a class="btn btn-primary" @click="verGrado(item._id)">Ver Actividad</a>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModalCreate">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Crear Grado</h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true" @click="showModalCreate = false"
                      >&times;</span
                    >
                  </button>
                </div>
                <div class="modal-body">
                  <form
                    action=""
                    @submit.prevent="checkForm"
                    enctype="multipart/form-data"
                  >
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Titulo"
                          v-model="modelCrear.titulo"
                          required
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Descripcion"
                          v-model="modelCrear.descripcion"
                          required
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <input
                          type="number"
                          class="form-control"
                          placeholder="puntos"
                          v-model="modelCrear.puntos"
                          required
                        />
                      </div>
                      <div class="field">
                        <div class="file is-boxed is-primary">
                          <label class="file-label">
                            <input type="file" @change="onFileUpload" />
                            <span class="file-cta">
                              <span class="file-icon">
                                <i class="fa fa-upload"></i>
                              </span>
                              <span class="file-label"> Elige un archivo </span>
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-danger"
                        @click="showModalCreate = false"
                      >
                        Cerrar
                      </button>
                      <button type="submit" class="btn btn-primary">
                        Crear Grado
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </base-header>
</template>

<script>
import { mapState } from "vuex";
import router from "../../router";
// import axios from "axios";

export default {
  name: "projects-table",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  data() {
    return {
      url: this.$store.state.url,
      tableData: [],
      loading: false,
      errors: [],
      showModalCreate: false,
      file: null,
      modelCrear: {
        titulo: "",
        descripcion: "",
        puntos: "",
        file: null,
        name: ""
      },
      data: [],
      id: this.$route.params.id,
      materia: this.$route.params.materia,
    };
  },
  components: {},
  methods: {
    onFileUpload(event) {
      this.modelCrear.file = event.target.files[0];       
    },
    verGrado(id) {
      router.push(`/verActividad/${id}`)
    },

    checkForm: async function (e) {
      e.preventDefault();
      
      const formData = new FormData();
      formData.append("titulo", this.modelCrear.titulo);
      formData.append("descripcion", this.modelCrear.descripcion);
      formData.append("puntos", this.modelCrear.puntos);
      formData.append("file", this.modelCrear.file);
      formData.append("name", this.modelCrear.file.name)
      this.errors = [];
      

      if (this.modelCrear.titulo === "") {
        this.errors.push("El titulo es obligatorio.");
      } else if (this.modelCrear.descripcion == "") {
        this.errors.push("La descripcion es obligatorio.");
      } else {

      await fetch(
        `http://localhost:4000/api/actividad/${this.id}&${this.materia}`,
        {
          mode: "cors",
          method: "POST",
          headers: {
            // "Content-Type":
            //   "multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL",
            // "Access-Control-Allow-Origin": "*",
            "x-access-token": this.toke,
          },
          body: formData,
        }
      )
        .then((res) => {
          this.showModalCreate = false;
          alert("Se ha crado el grado");
          this.refresh();
          res.json();
        })
        .then((res) => {
          alert(res.message);
          // if (res.message) {
          //   alert(res.message);
          // } else {
          //   console.log(res.message);
          //   // this.modelCrear.numero_grado = "";
          //   // this.modelCrear.jornada = "";
          //   this.showModalCreate = false;
          //   alert("Se ha crado el grado");
          //   this.refresh();
          // }
        })
        .catch((e) => console.log(e));
      }
    },
    async getActivitys() {
      const res = await fetch(
        this.url + `api/actividad/${this.id}&${this.materia}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.toke,
          },
        }
      );
      const rep = await res.json();
      this.data = rep;
      console.log(this.data);
    },
    async guardarGrado() {
      try {
        await fetch(
          `http://localhost:4000/api/actividad/${this.id}&${this.materia}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "multipart/form-data",
              "x-access-token": this.toke,
            },
            body: JSON.stringify(this.modelCrear),
          }
        );
        // this.modelCrear.numero_grado = "";
        // this.modelCrear.jornada = "";

        this.showModalCreate = false;
        alert("Se ha crado el grado");
        this.refresh();
      } catch (error) {
        console.log(error);
      }
    },
    async refresh() {
      this.loading = true;
      this.getActivitys();
      this.loading = false;
    },
    async crearGrado() {
      this.showModalCreate = true;
    },
    async eliminar(index) {
      try {
        await fetch(this.url + `api/admin/deleteGradeId/${index}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.toke,
          },
        });

        this.refresh();
      } catch (error) {
        console.log(error);
      }
    },
    makeToast(titulo, texto, tipo) {
      this.toastCount++;
      this.$bvToast.toast(texto, {
        title: titulo,
        variant: tipo,
        autoHideDelay: 5000,
        appendToast: true,
      });
    },
    verUsuario(index) {
      router.push(`/verUsuario/${index}`);
    },
  },
  computed: {
    ...mapState(["toke"]),
  },
  async created() {
    this.refresh();
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
<style  scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
