<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5"> </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <projects-table title="Materias"></projects-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ProjectsTable from "../materias/ProjectsTableMatters.vue";
export default {
  name: "tables",
  components: {
    ProjectsTable,
  },
};
</script>
<style></style>
