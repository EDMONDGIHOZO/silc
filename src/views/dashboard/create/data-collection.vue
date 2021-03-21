<template>
  <div class="create-container">
    <v-row wrap>
      <v-col cols="12">
        <div class="create-title">
          <p>collecte les donnees</p>
        </div>
      </v-col>
    </v-row>
    <!-- steping on creation of data -->
    <v-row wrap align-content="center" id="stepsContainer">
      <v-stepper v-model="step" vertical class="stepper">
        <v-stepper-step :complete="step > 1" step="1">
          collecte de données de base
          <small
            >ne rechargez pas cette page une fois cette étape terminée</small
          >
        </v-stepper-step>

        <v-stepper-content step="1">
          <GeneralData />
        </v-stepper-content>

        <v-stepper-step :complete="step > 2" step="2">
          Epargnes
        </v-stepper-step>
        <v-stepper-content step="2">
          <epargne />
        </v-stepper-content>

        <v-stepper-step :complete="step > 3" step="3">
          Crédits internes
        </v-stepper-step>
        <v-stepper-content step="3">
          <credit />
        </v-stepper-content>

        <v-stepper-step step="4" :complete="step > 4">
          Relations avec institutions financières
        </v-stepper-step>
        <v-stepper-content step="4">
          <relation />
        </v-stepper-content>

        <v-stepper-step :complete="step > 5" step="5">
          Caisse d’entraide
        </v-stepper-step>

        <v-stepper-content step="5">
          <entraide />
        </v-stepper-content>

        <v-stepper-step step="6" :complete="done">
          Pénalités / amandes
        </v-stepper-step>

        <v-stepper-content step="6">
          <penalites />
        </v-stepper-content>
      </v-stepper>
    </v-row>
    <!-- end of stepping -->
    <Snackbar :message="alert.message" :color="alert.color" />
  </div>
</template>

<script>
import GeneralData from "@/components/creation/generalData.vue";
import Penalites from "@/views/dashboard/create/penalites.vue";
import Entraide from "@/views/dashboard/create/entraide.vue";
import Epargne from "@/views/dashboard/create/epargne.vue";
import Credit from "@/views/dashboard/create/creditInterne.vue";
import Relation from "@/views/dashboard/create/relation.vue";
import Snackbar from "@/components/layouts/snackbars.vue";

import { mapState } from "vuex";

export default {
  name: "datacollection",
  data: () => ({
    valid: null,
    done: false,
  }),
  computed: mapState(["step", "alert"]),

  methods: {
    close() {
      return this.$router.push({ name: "home" });
    },
  },

  components: {
    GeneralData,
    penalites: Penalites,
    entraide: Entraide,
    epargne: Epargne,
    credit: Credit,
    relation: Relation,
    Snackbar,
  },
};
</script>

<style lang="scss" scoped>
#stepsContainer {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

#stepsContainer .stepper {
  min-width: 100%;
}
</style>
