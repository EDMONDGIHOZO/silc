<template>
  <div class="container">
    <div class="data-create-container">
      <v-form @submit.prevent="saveInfo">
        <v-row wrap>
          <v-col cols="12">
            <v-text-field
              v-model="amount"
              rounded
              outlined
              type="number"
              label="Valeur totale de l’épargne réalisée au cours de la période/mois (Frw)"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn color="success" depressed rounded @click="saveInfo(5)"
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
  name: "epargne",
  data: () => ({
    amount: null,
    collectionId: null,
  }),

  methods: {
    saveInfo(step) {
      const formData = {
        collectionId: localStorage.getItem("collectionId"),
        amount: this.amount,
      };

      ActionsService.SaveEpargne(formData).then((response) => {
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