<template>
  <table class="table tablesorter" :class="tableClass">
    <thead :class="theadClasses">
      <tr>
        <slot name="columns" :columns="columns">
          <th v-for="column in columns" :key="column">{{ column }}</th>
        </slot>
      </tr>
    </thead>
    <tbody :class="tbodyClasses">
      <tr v-for="(item, index) in data" :key="index">
        <slot :item="item">
          <td v-for="column in columns" :key="column">
            <template v-if="hasValue(item, column)">
              {{ itemValue(item, column) }}
            </template>
          </td>
        </slot>
        <!-- <td class="text-right p-2">
          <div class="btn btn-success btn-sm" @click="editar(index)">
            Editar
          </div>
          <div class="btn btn-danger btn-sm" @click="eliminar(index)">
            Eliminar
          </div>
        </td> -->
      </tr>
    </tbody>
  </table>
</template>
<script>
// import router from "../router";

export default {
  name: "base-table",
  props: {
    columns: {
      type: Array,
      default: () => [],
      description: "Table columns",
    },
    data: {
      type: Array,
      default: () => [],
      description: "Table data",
    },
    type: {
      type: String, // striped | hover
      default: "",
      description: "Whether table is striped or hover type",
    },
    theadClasses: {
      type: String,
      default: "",
      description: "<thead> css classes",
    },
    tbodyClasses: {
      type: String,
      default: "",
      description: "<tbody> css classes",
    },
  },
  computed: {
    tableClass() {
      return this.type && `table-${this.type}`;
    },
    colsWithValue() {
      return (row) => {
        return this.columns.filter((column) => this.hasValue(row, column));
      };
    },
  },
  methods: {
    hasValue(item, column) {
      return item[column.toLowerCase()] !== "undefined";
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    },
    editar(index) {
      console.log(index)
    },
    async eliminar(index) {
      console.log(index);
      try {
        // const res = await fetch(
        //   `http://localhost:4000/api/admin/${this.data[index]._id}`,
        //   {
        //     method: "DELETE",
        //     headers: {
        //       "Content-Type": "application/json",
        //       "x-access-token": this.toke,
        //     },
        //   }
        // );
        // router.replace("/usuarios");
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {

  },
};
</script>
<style></style>
