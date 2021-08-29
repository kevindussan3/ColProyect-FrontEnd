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
            Crear Grado
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
        v-if="tableData.length != 0"
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

      <div v-else class="text-center"><h1>No hay datos crea uno</h1></div>
      <!-- Form Crear -->

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
                    <form action="" @submit="checkForm">
                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <!-- <label for="inputName4">Nombres</label> -->
                          <input
                            type="number"
                            class="form-control"
                            placeholder="Numero de grado"
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
                            <option value="Mañana">Mañana</option>
                            <option value="Tarde">Tarde</option>
                          </select>
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
      errors: [],
      showModalCreate: false,
      modelCrear: {
        numero_grado: "",
        jornada: "",
      },
    };
  },
  components: {},
  methods: {
    checkForm: function (e) {
      e.preventDefault();

      this.errors = [];

      if (this.modelCrear.numero_grado === "") {
        this.errors.push("El numero grado del producto es obligatorio.");
      } else if (this.modelCrear.jornada == "") {
        this.errors.push("El jornada del producto es obligatorio.");
      } else {
        fetch(this.url + "api/admin/createGrade", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.toke,
          },
          body: JSON.stringify(this.modelCrear),
        })
          .then((res) =>  res.json())
          .then((res) => {
            if (res.message) {
              alert(res.message)
            } else {
              this.modelCrear.numero_grado = "";
              this.modelCrear.jornada = "";
              this.showModalCreate = false;
              alert("Se ha crado el grado");
              this.refresh();
            }
          });
      }
    },
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
      try {
        await fetch(this.url + "api/admin/createGrade", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.toke,
          },
          body: JSON.stringify(this.modelCrear),
        });
        this.modelCrear.numero_grado = "";
        this.modelCrear.jornada = "";

        this.showModalCreate = false;
        alert("Se ha crado el grado");
        this.refresh();
      } catch (error) {
        console.log(error);
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
