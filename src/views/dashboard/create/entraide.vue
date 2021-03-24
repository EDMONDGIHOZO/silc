<template>
  <div class="container">
    <div class="data-create-container">
      <v-form @submit.prevent="saveEntraide" ref="aideForm">
        <v-row wrap>
          <v-col cols="12" md="6">
            <div class="form-col">
              <div class="col-title">
                <p>
                  Valeur des entrées dans la caisse d’entraide au cours de la
                  période/mois (Frw)
                </p>
              </div>
              <div class="fields">
                <v-text-field
                  v-model="income"
                  label="entre le nombre"
                  :rules="[rules.required]"
                  clearable
                  type="number"
                  filled
                  dense
                  class="mx-2"
                ></v-text-field>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="form-col">
              <div class="col-title">
                <p>
                  Valeur des sorties dans la caisse d’entraide au cours de la
                  période/mois (Frw)
                </p>
              </div>
              <div class="fields">
                <v-text-field
                  v-model="outgoing"
                  label="entre le nombre"
                  :rules="[rules.required]"
                  clearable
                  type="number"
                  filled
                  dense
                  class="mx-2"
                ></v-text-field>
              </div>
            </div>
          </v-col>
          <v-col cols="12">
            <div class="form-col">
              <div class="col-title">
                <p>
                  Membres soutenus au cours de la période / mois
                </p>
              </div>
              <div class="fields">
                <v-text-field
                  v-model="soutenus"
                  label="Nombre"
                  :rules="[rules.required]"
                  clearable
                  type="number"
                  filled
                  dense
                  class="mx-2"
                ></v-text-field>
              </div>
            </div>
          </v-col>
          <v-col cols="12">
            <v-btn
              color="success"
              depressed
              rounded
              type="submit"
              @click="saveEntraide"
              >continuer</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import ActionsService from "@/services/actions.service";
import store from "@/store/index";
export default {
  name: "entraide",
  data: () => ({
    income: 0,
    outgoing: 0,
    soutenus: 0,
    rules: {
      required: (value) => !!value || "obligatoire!",
    },
  }),

  methods: {
    saveEntraide() {
      if (this.$refs.aideForm.validate()) {
        const formData = {
          collectionId: this.collection.id,
          income: this.income,
          outgoing: this.outgoing,
          soutenus: this.soutenus,
        };

        ActionsService.saveEntraide(formData).then((response) => {
          if (response.statusText === "OK") {
            this.$store.commit("updateSteps", 6);
          }
        });
      } else {
        alert("assurez-vous que, il n'y a pas de champ vide!");
      }
    },
    moveStep(stepy) {
      store.commit("updateSteps", stepy);
    },
  },

  computed: {
    collection() {
      return this.$store.state.collectionInfo;
    },
  },
};
</script>

<style lang="scss" scoped>
.data-create-container {
  padding: 5px;
  border-radius: 10px;
}
</style>
