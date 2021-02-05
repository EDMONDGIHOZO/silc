<template>
  <div class="container">
    <div class="data-create-container">
      <v-form @submit.prevent="saveInfo">
        <v-row wrap justify="center" align-content="center">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="valeurCreditRebursedCapital"
              rounded
              outlined
              type="number"
              label="Valeur des crédits remboursés (capital) "
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="valeurInteretsCreditRebursed"
              rounded
              outlined
              type="number"
              label="Valeur des intérêts sur les crédits remboursés  "
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="valeurCreditCapitalRestantRebursedFin"
              rounded
              outlined
              type="number"
              label="Valeur des crédits (capital) restant à rembourser à la fin de la période  "
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="valeurInteretsCreditRestantRebursed"
              rounded
              outlined
              type="number"
              label="Valeur des intérêts aux crédits restant à rembourser à la fin de la période "
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="valeurCreditRetard"
              rounded
              outlined
              type="number"
              label="Valeur des crédits en retard (capital + intérêts) (Frw)"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-btn color="success" depressed rounded @click="saveInfo(7)"
              >save & continue</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import ActionsService from "@/services/actions.service";
export default {
  name: "rebursement",
  data: () => ({
    collectionId: null,
    valeurCreditRebursedCapital: null,
    valeurInteretsCreditRebursed: null,
    valeurCreditCapitalRestantRebursedFin: null,
    valeurInteretsCreditRestantRebursed: null,
    valeurCreditRetard: null,
  }),

  methods: {
    saveInfo(step) {
      const formData = {
        collectionId: localStorage.getItem("collectionId"),
        valeurCreditRebursedCapital: this.valeurCreditRebursedCapital,
        valeurInteretsCreditRebursed: this.valeurInteretsCreditRebursed,
        valeurCreditCapitalRestantRebursedFin: this
          .valeurCreditCapitalRestantRebursedFin,
        valeurInteretsCreditRestantRebursed: this
          .valeurInteretsCreditRestantRebursed,
        valeurCreditRetard: this.valeurCreditRetard,
      };

      ActionsService.saveRebursement(formData).then((response) => {
        if (response.statusText === "OK") {
          this.$store.commit("updateSteps", step);
        }
      });
    },
  },

  mounted() {
    this.collectionId = localStorage.getItem("collectionId");
  },
};
</script>

<style lang="scss" scoped>
.data-create-container {
  padding: 5px;
  border-radius: 10px;
}
</style>