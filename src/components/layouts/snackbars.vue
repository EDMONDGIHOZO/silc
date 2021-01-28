<template>
  <div class="text-center">
    <v-snackbar
      :timeout="timeout"
      min-height="180"
      :color="alert.color"
      v-model="alert.status"
    >
      {{ alert.message }}

      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="closeAlert"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "snackbar",

  computed: mapState(["alert"]),

  methods: { 
    closeAlert() {
      this.$store.commit('closeAlert');
    }
     },

  data: () => ({
    timeout: 4000,
  }),
};
</script>