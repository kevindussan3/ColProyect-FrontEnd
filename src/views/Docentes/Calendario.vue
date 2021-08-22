<template>
  <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
  <div  >
      
    </div>
     
  </base-header>
</template>

<script>

import { mapActions, mapState } from "vuex";




export default {

  data() {
    return {
      url: this.$store.state.url,
      data: [],
      value:"",
      
    };
  },
  methods: {
    ...mapActions(["obtenerToken", "datosUser"]),
    curso(){
      
    },
    async cursos() {
    },
    async refresh() {
    },
  },
  async created() {

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
