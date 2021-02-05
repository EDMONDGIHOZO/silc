<template>
  <div class="container">
    <div class="data-create-container">
      <v-form @submit.prevent="saveInfo">
        <v-row wrap>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="punishedMembers"
              rounded
              outlined
              dense
              type="number"
              label="Membres punis au cours de la période"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="amountPaid"
              rounded
              outlined
              dense
              type="number"
              label="Montant des pénalités payées (Frw)"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn color="success" depressed rounded @click="saveInfo(3)"
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
  name: "penalites",
  data: () => ({
    collectionId: null,
    punishedMembers: null,
    amountPaid: null,
  }),

  methods: {
    saveInfo(step) {
      const formData = {
        collectionId: localStorage.getItem("collectionId"),
        punishedMembers: this.punishedMembers,
        amountPaid: this.amountPaid,
      };

      ActionsService.savePenalty(formData).then((response) => {
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