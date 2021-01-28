<template>
  <div class="create-container">
    <v-row wrap>
      <v-col cols="12">
        <div class="create-title">
          <p>collecte les donnees</p>
        </div>
      </v-col>
    </v-row>

    <v-stepper v-model="steps" id="stepper">
      <v-stepper-header>
        <v-stepper-step :complete="steps > 1" step="1">
          Collecte de données générales
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="steps > 2" step="2">
          données financières
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3" :complete="steps > 3">
          Relation avec Institution financiel
        </v-stepper-step>
        <v-stepper-step step="4" complete> Done </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <GeneralData />
        </v-stepper-content>

        <v-stepper-content step="2">
          <FinancialData />
        </v-stepper-content>

        <v-stepper-content step="3">
          <FinancialRelations />
        </v-stepper-content>
        <v-stepper-content step="4">
          <DoneAnimation />
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
    <Snackbar :message="alert.message" :color="alert.color" />
  </div>
</template>

<script>
import GeneralData from "@/components/creation/generalData.vue";
import FinancialData from "@/components/creation/financialData.vue";
import FinancialRelations from "@/components/creation/financialRelations.vue";
import DoneAnimation from "@/components/helpers/doneAnimation.vue";
import Snackbar from "@/components/layouts/snackbars.vue";
import { mapState } from "vuex";

export default {
  name: "datacollection",
  data: () => ({
    valid: null,
  }),
  computed: mapState(["steps", "alert"]),

  methods: {
    close() {
      return this.$router.push({ name: "home" });
    },
  },

  components: {
    GeneralData,
    FinancialData,
    FinancialRelations,
    DoneAnimation,
    Snackbar,
  },
};
</script>

<style lang="scss" scoped>
#stepper {
  box-shadow: 0;
  border-radius: 15px;
  background: #f3f2f2dc;
}
</style>
