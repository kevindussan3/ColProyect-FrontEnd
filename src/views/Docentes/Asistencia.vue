<template>
  <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
  <div  >
      <BaseCard v-for="(item, index) in data" :key="index"  @click="curso(item._id)"> {{item.numero_grado}} </BaseCard>
    </div>
     
  </base-header>
</template>

<script>

import { mapActions, mapState } from "vuex";
import BaseCard from "../../components/BaseButton.vue";
import router from "../../router";


export default {
components: { BaseCard },
  data() {
    return {
      url: this.$store.state.url,
      data: [],
      value:"",
      materia:""
    };
  },
  methods: {
    ...mapActions(["obtenerToken", "datosUser"]),
    curso(id){
      router.push(`/asistencia/${id}`);
    },
    async cursos() {
      const res = await fetch(this.url + `api/docente/cursos/`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.toke,
        },
      });
      const rep = await res.json();
      console.log(rep)
      rep.map((value) => {
        for(let i = 0; i < value.grado.length; i++) {
          this.data = value.grado
          this.materia = value.nombre_materia
        }
      })      
    },
    async refresh() {
      this.loading = true;
      this.cursos();
      this.loading = false;
    },
  },
  async created() {
    this.refresh();
  },
   computed: {
    ...mapState(["toke"]),
  },
  mounted() {},
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
