<template>
  <div class="container">
    <div class="data-create-container">
      <v-form @submit.prevent="saveInfo">
        <v-row wrap justify="center" align-content="center" class="ma-2">
          <v-col cols="12" md="6">
            <div class="form-col">
              <div class="col-title">
                <p>
                  Membres ayant contracté un crédit dans le groupe au cours de
                  la période/mois
                </p>
              </div>
              <div class="fields">
                <v-text-field
                  v-model="creditedBoys"
                  label="Garçons"
                  :rules="[rules.required]"
                  clearable
                  type="number"
                  filled
                  dense
                  class="mx-2"
                ></v-text-field>
                <v-text-field
                  v-model="creditedGirls"
                  label="Filles"
                  clearable
                  :rules="[rules.required]"
                  filled
                  type="number"
                  dense
                  class="mx-2"
                ></v-text-field>
              </div>
              <v-chip color="black" class="my-3" dark
                >Total : {{ totalCredited }}
              </v-chip>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="form-col">
              <div class="col-title">
                <p>
                  Nombre total de crédits octroyés au cours de la période/mois
                </p>
              </div>
              <div class="fields">
                <v-text-field
                  v-model="grantedCredit"
                  label="crédits"
                  :rules="[rules.required]"
                  clearable
                  type="number"
                  filled
                  dense
                  class="mx-2"
                ></v-text-field>
                <v-text-field
                  v-model="grantedCapital"
                  label="capital"
                  :rules="[rules.required]"
                  clearable
                  type="number"
                  filled
                  dense
                  class="mx-2"
                ></v-text-field>
              </div>
              <!-- <v-text-field
                v-model="moyenne"
                label="Moyenne du montant par crédit contracté (Frw)"
                :rules="[rules.required]"
                clearable
                type="number"
                filled
                dense
                class="mx-2"
              ></v-text-field> -->
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="interestForGrants"
              filled
              :rules="[rules.required]"
              type="number"
              label="Valeur des intérêts sur les crédits octroyés au cours de la période/mois (Frw)"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              :value="totalCredAmount"
              filled
              :rules="[rules.required]"
              disabled
              type="number"
              label="Valeur totale des crédits (capital+ intérêts) au cours de la période/mois (Frw)"
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
    creditedGirls: null,
    creditedBoys: null,
    grantedCredit: null,
    grantedCapital: null,
    interestForGrants: null,
    rules: {
      required: (value) => !!value || "obligatoire!",
    },
  }),

  methods: {
    saveInfo(step) {
      const formData = {
        collectionId: this.collection.id,
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

  computed: {
    // get the current collection
    collection() {
      let col = this.$store.state.collectionInfo;
      return col;
    },

    totalCredAmount() {
      if (this.grantedCapital > 0 && this.interestForGrants > 0) {
        let x = parseInt(this.grantedCapital);
        let y = parseInt(this.interestForGrants);

        const tot = x + y;
        return tot;
      } else {
        return 0;
      }
    },

    totalCredited() {
      if (this.creditedGirls > 0 && this.creditedBoys > 0) {
        let x = parseInt(this.creditedGirls);
        let y = parseInt(this.creditedBoys);
        const total = x + y;
        return parseInt(total);
      } else {
        return 0;
      }
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
