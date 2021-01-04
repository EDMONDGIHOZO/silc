<template>
  <div class="create-container">
    <v-row wrap full-width>
      <v-col cols="12">
        <div class="create-title">
          <p>collecte les donnees</p>
        </div>
      </v-col>
    </v-row>

    <v-stepper v-model="e1" id="stepper">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          Collecte de données générales
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">
          données financières
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">
          Relation avec Institution financiel
        </v-stepper-step>
        <v-stepper-step step="4"> terminé </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <GeneralData />
          <v-btn color="primary" depressed rounded @click="e1 = 2"> Continue </v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <FinancialData />
          <v-btn color="primary" depressed rounded @click="e1 = 3"> Continue </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="e1 = 4"> Continue </v-btn>

          <v-btn text> Cancel </v-btn>
        </v-stepper-content>
        <v-stepper-content step="4">
          <v-card class="mb-12" color="grey lighten-1" height="200px">
            <v-card-text>
              <h3>felicitations , data are collected succesfully!</h3>
            </v-card-text>
          </v-card>
          <v-btn text @click="close"> Close </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import GeneralData from "@/components/creation/generalData.vue";
import FinancialData from "@/components/creation/financialData.vue";
export default {
  data() {
    return {
      e1: 1,
    };
  },

  methods: {
    close() {
      return this.$router.push({ name: "home" });
    },
  },

  components: {
    GeneralData,
    FinancialData,
  },
};
</script>

<style lang="scss" scoped>
#stepper {
  min-width: 800px;
  box-shadow: 0;
  border-radius: 15px;
  background: #f3f2f2dc;
}
</style>