<template>
  <div class="container">
    <h4>groupes</h4>
    <h2>{{ groups }}</h2>
  </div>
</template>

<script>
import ActionsService from "@/services/actions.service";
export default {
  name: "groups",
  data: () => ({
    groups: [],
  }),

  created() {
    ActionsService.getGroups().then((response) => {
      this.groups = response.data;
    });
  },
};
</script>
