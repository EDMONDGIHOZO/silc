<template>
  <div class="container">
    <v-progress-circular
      size="70"
      width="7"
      centered
      v-if="showProgress"
      color="primary"
      indeterminate
    ></v-progress-circular>
    <v-alert :type="alertType" v-if="showAlert">{{ alertMessage }}</v-alert>
  </div>
</template>

<script>
export default {
  props: ["alertMessage", "alertType", "showProgress"],
};
</script>
