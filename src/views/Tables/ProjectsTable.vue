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
          <div class="input-group">
            <select
              class="custom-select"
              @change="usuarios"
              v-model="tipo"
              id="inputGroupSelect04"
            >
              <option selected value="/">Usuarios</option>
              <option value="/listar/docente">Docente</option>
              <option value="/listar/estudiante">Estudiante</option>
              <option value="/listar/acudiente">Acudiente</option>
            </select>
          </div>
        </div>
        <div class="col text-right">
          <button class="btn btn-primary btn-sm" @click="crearUsuario()">
            Crear Usuario
          </button>

          <button class="btn btn-primary btn-sm" @click="cambiarStado()">
            Change State
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
          <th>Correo</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Identificacion</th>
          <th>Telefono</th>

          <th>Acciones</th>
        </template>

        <template v-slot:default="row">
          <td>
            <div class="media-body">
              <span class="name mb-0 text-sm">{{ row.item.email }}</span>
            </div>
          </td>
          <td class="budget">
            {{ row.item.nombres }}
          </td>
          <td class="budget">
            {{ row.item.apellidos }}
          </td>
          <td class="budget">
            {{ row.item.identificacion }}
          </td>
          <td class="budget">
            {{ row.item.telefono }}
          </td>

          <td>
            <!-- Form editar -->
            <form role="form">
              <div v-if="showModal">
                <transition name="modal">
                  <div class="modal-mask">
                    <div class="modal-wrapper">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title">Editar Usuairo</h5>
                            <button
                              type="button"
                              class="close"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <span
                                aria-hidden="true"
                                @click="showModal = false"
                                >&times;</span
                              >
                            </button>
                          </div>
                          <div class="modal-body">
                            <div class="form-row">
                              <div class="form-group col-md-6">
                                <label for="inputName4">Nombres</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="inputName4"
                                  placeholder="nombres"
                                  v-model="model.nombres"
                                />
                              </div>
                              <div class="form-group col-md-6">
                                <label for="inputApellidos4">Apellidos</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="inputApellidos4"
                                  placeholder="Apellidos"
                                  v-model="model.apellidos"
                                />
                              </div>
                              <div class="form-group col-md-4">
                                <!-- <label for="inputState">Rol</label> -->
                                <select
                                  class="form-control"
                                  v-model="model.jornada"
                                >
                                  <option selected value="">
                                    Selecciona una joranada
                                  </option>
                                  <option value="Mañana">Mañana</option>
                                  <option value="Tarde">Tarde</option>
                                </select>
                              </div>
                              <div class="form-group col-md-6" v-if="model.roles === 'estudiante'">
                                <!-- <label for="inputTelefono4">Telefono</label> -->
                                <select
                                  class="form-control"
                                  v-model="modelCrear.grado"
                                  
                                >
                                  <option value="" selected disabled>
                                    Seleccione un grado
                                  </option>
                                  <option
                                    v-for="(item, index) in datagrados"
                                    :key="index"
                                    v-bind:value="{ _id: item._id }"
                                  >
                                    {{ item.numero_grado }}
                                  </option>
                                </select>
                              </div>
                              
                            </div>
                            <div class="form-row">
                              <div class="form-group col-md-6">
                                <label for="inputTelefono4">Telefono</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="inputTelefono4"
                                  placeholder="Telefono"
                                  v-model="model.telefono"
                                />
                              </div>
                              <div class="form-group col-md-6">
                                <label for="inputDireccion4">Dirección</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="inputDireccion4"
                                  placeholder="Dirección"
                                  v-model="model.direccion"
                                />
                              </div>
                            </div>

                            <div class="form-group">
                              <label for="inputEmail2">Email</label>
                              <input
                                type="email"
                                class="form-control"
                                id="inputEmail2"
                                placeholder="Email"
                                v-model="model.email"
                                disabled
                              />
                            </div>
                            <div class="form-row">
                              <div class="form-group col-md-6">
                                <label for="inputCity">Identificación</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="inputCity"
                                  placeholder="Identificación"
                                  v-model="model.identificacion"
                                />
                              </div>
                              <div class="form-group col-md-4">
                                <label for="inputState">Rol</label>
                                <select
                                  class="form-control"
                                  v-model="model.roles"
                                >
                                  <option selected disabled>
                                    {{ model.roles }}
                                  </option>
                                  <option
                                    v-for="(item, index) of ShowRoles"
                                    :key="index"
                                  >
                                    {{ item }}
                                  </option>
                                </select>
                              </div>
                              <div class="form-group col-md-2">
                                <label for="inputZip">RH</label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="inputZip"
                                  v-model="model.rh"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button
                              type="button"
                              class="btn btn-danger"
                              @click="showModal = false"
                            >
                              Cerrar
                            </button>
                            <button
                              type="button"
                              class="btn btn-primary"
                              @click="editar(id)"
                            >
                              Guardar Cambios
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </form>
            <!-- fin -->
            <!-- Form Crear -->
            <form role="form">
              <div v-if="showModalCreate">
                <transition name="modal">
                  <div class="modal-mask">
                    <div class="modal-wrapper">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title">Crear Usuario</h5>
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
                                  type="text"
                                  class="form-control"
                                  placeholder="nombres"
                                  v-model="modelCrear.nombres"
                                />
                              </div>
                              <div class="form-group col-md-6">
                                <!-- <label for="inputApellidos4">Apellidos</label> -->
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Apellidos"
                                  v-model="modelCrear.apellidos"
                                />
                              </div>
                            </div>

                            <div class="form-row">
                              <div class="form-group col-md-4">
                                <!-- <label for="inputState">Rol</label> -->
                                <select
                                  class="form-control"
                                  v-model="modelCrear.roles"
                                >
                                  <option selected disabled>
                                    {{ modelCrear.roles }}
                                  </option>
                                  <option
                                    v-for="(item, index) of ShowRoles"
                                    :key="index"
                                  >
                                    {{ item }}
                                  </option>
                                </select>
                              </div>
                            </div>

                            <div class="form-row">
                               <div class="form-group col-md-6">
                                <!-- <label for="inputTelefono4">Telefono</label> -->
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Telefono"
                                  v-model="modelCrear.telefono"
                                />
                              </div>
                              <div class="form-group col-md-6">
                                <!-- <label for="inputDireccion4">Dirección</label> -->
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Dirección"
                                  v-model="modelCrear.direccion"
                                />
                              </div>
                            </div>

                            <div class="form-row" v-if="modelCrear.roles == 'estudiante'">
                             
                              <div class="form-group col-md-6">
                                <!-- <label for="inputState">Rol</label> -->
                                <select
                                  class="form-control"
                                  v-model="modelCrear.jornada"
                                  @change="usuarios"
                                >
                                  <option selected value="">Joranada</option>
                                  <option value="Mañana">Mañana</option>
                                  <option value="Tarde">Tarde</option>
                                </select>
                              </div>
                              <div class="form-group col-md-6">
                                <!-- <label for="inputTelefono4">Telefono</label> -->
                                <select
                                  class="form-control"
                                  v-model="modelCrear.grado"
                                  requiredsss
                                >
                                  <option value="" selected disabled>
                                    Seleccione un grado
                                  </option>
                                  <option
                                    v-for="(item, index) in datagrados"
                                    :key="index"
                                    v-bind:value="{ _id: item._id }"
                                  >
                                    {{ item.numero_grado }}
                                  </option>
                                </select>
                              </div>
                            </div>


                            <div class="row">
                              <div class="form-group col-md-6">
                                <!-- <label for="inputEmail2">Email</label>  -->
                                <input
                                  type="email"
                                  class="form-control"
                                  placeholder="Email"
                                  v-model="modelCrear.email"
                                />
                              </div>
                              <div class="form-group col-md-6">
                                <!-- <label for="inputEmail2">Email</label>  -->
                                <input
                                  type="password"
                                  class="form-control"
                                  placeholder="Contraseña"
                                  v-model="modelCrear.password"
                                />
                              </div>
                            </div>


                            <div class="form-row">
                              <div class="form-group col-md-6">
                                <!-- <label for="inputCity">Identificación</label> -->
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Identificación"
                                  v-model="modelCrear.identificacion"
                                />
                              </div>
                              
                              <div class="form-group col-md-2">
                                <!-- <label for="inputZip">RH</label> -->
                                <input
                                  type="text"
                                  class="form-control"
                                  placeholder="Rh"
                                  v-model="modelCrear.rh"
                                />
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
                              @click="crearUser()"
                            >
                              Crear Usuario
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </form>
            <!-- fin -->

            <div class="row">
              <div
                class="btn btn-primary btn-sm"
                @click="verUsuario(row.item._id)"
              >
                <i class="fa fa-eye"></i>
              </div>
              <div class="btn btn-success btn-sm" @click="datosmodal(row)">
                <i class="fa fa-edit"></i>
              </div>
              <div
                class="btn btn-danger btn-sm"
                @click="eliminar(row.item._id)"
              >
                <i class="ni ni-fat-remove"></i>
              </div>
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
      tipo: "/",
      url: this.$store.state.url,
      tableData: [],
      loading: false,
      showModal: false,
      showModalCreate: false,
      id: "",
      notifications: [],
      model: {
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
      },
      modelCrear: {
        nombres: "",
        apellidos: "",
        telefono: "",
        email: "",
        identificacion: "",
        fechaNacimiento: "",
        direccion: "",
        password: "",
        rh: "",
        roles: "Rol",
        jornada: "",
        grado: "",
      },
      ShowRoles: ["estudiante", "admin", "docente", "acudiente"],
      rol: "",
      datagrados: [],
    };
  },
  components: {},
  methods: {
    async usuarios() {
      try {
        const res = await fetch(this.url + `api/admin${this.tipo}`, {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.toke,
          },
        });
        this.tableData = await res.json();

        const grados = await fetch(
          this.url + `api/admin/getGradeWorkingDay/${this.modelCrear.jornada}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": this.toke,
            },
          }
        ); 

        
        this.datagrados = await grados.json();
      } catch (error) {
        console.log(error);
      }
    },

    async refresh() {
      this.loading = true;
      this.usuarios();
      this.loading = false;
    },
    async crearUsuario() {
      this.showModalCreate = true;
    },
    datosmodal(index) {
      this.showModal = true;
      this.id = index.item._id;
      this.model.nombres = index.item.nombres;
      this.model.apellidos = index.item.apellidos;
      this.model.telefono = index.item.telefono;
      this.model.email = index.item.email;
      this.model.identificacion = index.item.identificacion;
      this.model.direccion = index.item.direccion;
      this.model.rh = index.item.rh;
      this.rol = index.item.roles[0]._id;
      console.log(index);
      console.log(index.item.roles[0].name);
      this.model.roles = index.item.roles[0].name;
      this.model.jornada = index.item.jornada;
    },
    async editar(index) {
      try {
        await fetch(this.url + `api/admin/${index}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.toke,
          },
          body: JSON.stringify(this.model),
        });
        this.showModal = false;
        alert("Se ha editado corretamente");
        this.refresh();
      } catch (error) {
        console.log(error);
      }
    },
    async eliminar(index) {
      try {
        await fetch(this.url + `api/admin/${index}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.toke,
          },
        });
        alert("Se ha eleminidado");

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
    async crearUser() {
      console.log(this.modelCrear);
      try {
        await fetch("http://localhost:4000/api/admin/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.modelCrear),
        });
        this.modelCrear.nombres = "";
        this.modelCrear.apellidos = "";
        this.modelCrear.identificacion = "";
        this.modelCrear.jornada = "";
        this.modelCrear.grado = "";
        this.modelCrear.direccion = "";
        this.modelCrear.password = "";
        this.modelCrear.rh = "";
        this.modelCrear.email = "";
        this.modelCrear.roles = "Rol";
        this.modelCrear.telefono = "";

        this.showModalCreate = false;
        alert("Se ha crado nuevo usuario");
        this.refresh();
      } catch (error) {
        console.log("error: ", error);
      }
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
