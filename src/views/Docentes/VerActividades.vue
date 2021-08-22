<template>
  <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
    <div class="card" v-for="(item, index) in data" :key="index">
      <div class="card-header">{{ item.titulo }}</div>
      <div class="card-body">
        <h5 class="card-title">Descripción</h5>
        <p class="card-text">
          {{ item.descripcion }}
        </p>
        <a
          :href="item.url"
          @click.prevent="downloadItem(item.urlArchivo, item.name)"
        >
          Descargar Archivo {{ item.name }}
          <i class="fa fa-download"></i>
        </a>
        <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
      </div>
    </div>
  </base-header>
</template>

<script>
import { mapState } from "vuex";


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
      id: this.$route.params.id,
      data: [],
      loading: false,
      errors: [],
      link: {
        urlDownload: "",
        name: "",
      },
    };
  },
  components: {},
  methods: {
    async getActividad() {
      const res = await fetch(
        this.url + `api/docente/obternerActividad/${this.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.toke,
          },
        }
      );
      this.data = await res.json();

      this.data.map((value) => {
        this.link.urlDownload = value.urlArchivo;
        this.link.name = value.name;
      });
    },
    async downloadItem(){
      
      // await fetch(url, {"responseType":"blob"}).then(response => {
      //   console.log(response.blob)
      //   const blob = new Blob([response.data], )
      //   const link = document.createElement('a')
      //   link.href = URL.createObjectURL(blob)
      //   link.download = name
      //   link.click()
      //   URL.revokeObjectURL(link.href)
      // }).catch(console.error);
    },
    // async download(url) {
    //   const response = await fetch(url, {
    //     method: "GET",
    //     responseType: 'blob',

    //     // headers: {
    //     //   "Content-Type": "application/json",
    //     //   // "x-access-token": this.toke,
    //     // },
    //     // body: JSON.stringify(this.link),
    //   }).then((response) =>{
    //     var fileUrl = window.URL.createObjectURL(new Blob([response.data]));
    //     var fileLink = document.createElement('a');
    //     fileLink.href = fileUrl;
    //     fileLink.setAttribute('download', 'file.png')
    //     document.body.appendChild(fileLink);
    //     fileLink.click();
    //   });
    //   // console.log(response.blob);

    // },
    async refresh() {
      this.loading = true;
      this.getActividad();
      this.loading = false;
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
