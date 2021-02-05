<template>
  <div class="container">
    <div class="data-create-container">
      <v-form @submit.prevent="saveInfo">
        <v-row wrap>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="income"
              rounded
              outlined
              type="number"
              label="Valeur des entrées dans la caisse d’entraide"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="outgoing"
              rounded
              outlined
              type="number"
              label="Valeur des sorties dans la caisse d’entraide"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="soutenus"
              rounded
              outlined
              type="number"
              label="Membres soutenus au cours de la période "
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn color="success" depressed rounded @click="saveInfo(4)"
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
  name: "entraide",
  data: () => ({
    collectionId: null,
    income: null,
    outgoing: null,
    soutenus: null,
  }),

  methods: {
    saveInfo(step) {
      const formData = {
        collectionId: localStorage.getItem("collectionId"),
        income: this.income,
        outgoing: this.outgoing,
        soutenus: this.soutenus
      };

      ActionsService.saveEntraide(formData).then((response) => {
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