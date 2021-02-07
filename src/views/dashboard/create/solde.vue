<template>
  <div class="container">
    <div class="data-create-container">
      <v-form @submit.prevent="saveInfo">
        <v-row wrap>
          <v-col cols="12">
            <v-text-field
              v-model="montantSolde"
              rounded
              outlined
              type="number"
              label="Montant du solde"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn color="success" depressed rounded @click="saveInfo(1)"
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
  name: "solde",
  data: () => ({
    montantSolde: null,
    collectionId: null,
  }),

  methods: {
    goHome() {
      return this.$router.push({ name: "home" });
    },
    saveInfo(step) {
      const formData = {
        collectionId: localStorage.getItem("collectionId"),
        montantSolde: this.montantSolde,
      };

      ActionsService.SaveSolde(formData).then((response) => {
        if (response.statusText === "OK") {
          localStorage.removeItem("collectionId");
          this.$store.commit("updateSteps", step);
          setTimeout(this.goHome, 4500);
        }
      });
    },
  },

  mounted() {
    this.collectionId = localStorage.getItem("collectionId");
  },
};
</script>