<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
            {{ title }}
          </h3>
        </div>
        <div class="col text-right">
          <button class="btn btn-primary btn-sm" @click="crearGrado()">
            Crear Materia
          </button>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <base-table
        class="table align-items-center table-flush"
        :class="type === 'dark' ? 'table-dark' : ''"
        :thead-classes="type === 'dark' ? 'thead-dark' : 'thead-light'"
        tbody-classes="list"
        :data="tableData"
      >
        <template v-slot:columns>
          <th>Grado</th>
          <th>Jornada</th>
          <th>Acciones</th>
        </template>

        <template v-slot:default="row">
          <td>
            <div class="media-body">
              <span class="name mb-0 text-sm">{{ row.item.numero_grado }}</span>
            </div>
          </td>
          <td class="budget">
            {{ row.item.jornada }}
          </td>
          <td>
            <!-- Form Crear -->
            <form role="form">
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
                              <span
                                aria-hidden="true"
                                @click="showModalCreate = false"
                                >&times;</span
                              >
                            </button>
                          </div>
                          <div class="modal-body">
                            <div class="form-row">
                              <div class="form-group col-md-6">
                                <!-- <label for="inputName4">Nombres</label> -->
                                <input
                                  type="number"
                                  class="form-control"
                                  placeholder="Nombre de la materia"
                                  v-model="modelCrear.numero_grado"
                                  required
                                />
                              </div>
                              <div class="form-group col-md-6">
                                <!-- <label for="inputTelefono4">Telefono</label> -->
                                <select
                                  class="form-control"
                                  v-model="modelCrear.jornada"
                                >
                                  <option selected value="">
                                    Selecciona una joranada
                                  </option>
                                  <option value="mañana">Mañana</option>
                                  <option value="tarde">Tarde</option>
                                </select>
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
                            <button
                              type="button"
                              class="btn btn-primary"
                              @click="guardarGrado()"
                            >
                              Crear Grado
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </form>

            <div class="row">
              <button
                class="btn btn-danger btn-sm"
                @click="eliminar(row.item._id)"
              >
                Eliminar
              </button>
            </div>
          </td>
        </template>
      </base-table>
    </div>

    <div
      class="card-footer d-flex justify-content-end"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <base-pagination total="30"></base-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import router from "../../router";
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
      showModalCreate: false,
      modelCrear: {
        numero_grado: "",
        jornada: "",
      },
    };
  },
  components: {},
  methods: {
    async grado() {
      try {
        const res = await fetch(this.url + "api/admin/getGrade", {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.toke,
          },
        });
        this.tableData = await res.json();
      } catch (error) {
        console.log(error);
      }
    },
    async guardarGrado() {
      console.log(this.modelCrear);
      try {
        await fetch("http://localhost:4000/api/admin/createGrade", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.toke,
          },
          body: JSON.stringify(this.modelCrear),
        });
        this.showModalCreate = false;
        alert("Se ha crado el grado");
        this.refresh();
      } catch (error) {
        alert('Ha pasado algo')
      }
    },
    async refresh() {
      this.loading = true;
      this.grado();
      this.loading = false;
    },
    async crearGrado() {
      this.showModalCreate = true;
    },

    // async editar(index) {
    //   try {
    //     // await fetch(this.url + `api/admin/${index}`, {
    //     //   method: "PUT",
    //     //   headers: {
    //     //     "Content-Type": "application/json",
    //     //     "x-access-token": this.toke,
    //     //   },
    //     //   body: JSON.stringify(this.model),
    //     // });

    //     // this.showModal = false;
    //     // this.refresh();
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async eliminar(index) {
      console.log(index);
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
      // console.log(index)
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
