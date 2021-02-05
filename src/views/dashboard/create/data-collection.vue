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
          Pénalités / amandes
        </v-stepper-step>

        <v-stepper-content step="2">
          <penalites />
        </v-stepper-content>

        <v-stepper-step :complete="step > 3" step="3">
          Caisse d’entraide
        </v-stepper-step>

        <v-stepper-content step="3">
          <entraide />
        </v-stepper-content>

        <v-stepper-step :complete="step > 4" step="4">
          Epargnes
        </v-stepper-step>
        <v-stepper-content step="4">
          <epargne />
        </v-stepper-content>
        <v-stepper-step :complete="step > 5" step="5">
          Crédits internes
        </v-stepper-step>
        <v-stepper-content step="5">
          <credit />
        </v-stepper-content>
        <v-stepper-step :complete="step > 6" step="6">
          Remboursement
        </v-stepper-step>
        <v-stepper-content step="6">
          <reburse />
        </v-stepper-content>

        <v-stepper-step step="7" :complete="done">
          Relations avec institutions financières
        </v-stepper-step>
        <v-stepper-content step="7">
          <relation />
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
import Reburse from "@/views/dashboard/create/rebursement.vue";
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
    reburse: Reburse,
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
