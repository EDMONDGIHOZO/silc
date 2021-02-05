<template>
  <div class="container">
    <div class="data-create-container">
      <v-form @submit.prevent="saveInfo">
        <v-row wrap justify="center" align-content="center" class="ma-2">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="creditedGirls"
              rounded
              outlined
              dense
              type="number"
              label="(filles)Membres ayant contracté un crédit dans le groupe"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="creditedBoys"
              rounded
              outlined
              dense
              type="number"
              label="(Garçons)Membres ayant contracté un crédit dans le groupe"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="grantedCredit"
              rounded
              outlined
              dense
              type="number"
              label="Nombre total de crédits octroyés"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="grantedCapital"
              rounded
              outlined
              dense
              type="number"
              label="Valeur des crédits octroyés (capital)"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="interestForGrants"
              rounded
              outlined
              dense
              type="number"
              label="valeur des interets sur credit actroyes"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-btn color="success" depressed rounded @click="saveInfo(6)"
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
  name: "creditInterne",
  data: () => ({
    collectionId: null,
    creditedGirls: null,
    creditedBoys: null,
    grantedCredit: null,
    grantedCapital: null,
    interestForGrants: null,
  }),

  methods: {
    saveInfo(step) {
      const formData = {
        collectionId: localStorage.getItem("collectionId"),
        creditedGirls: this.creditedGirls,
        creditedBoys: this.creditedBoys,
        grantedCredit: this.grantedCredit,
        grantedCapital: this.grantedCapital,
        interestForGrants: this.interestForGrants,
      };

      ActionsService.saveCredits(formData).then((response) => {
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