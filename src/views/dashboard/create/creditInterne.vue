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
                <span>Total : {{ totalCredited }}</span>
              </div>
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
                  v-model="totalCredited"
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
                  Valeur des crédits octroyés (capital) au cours de la
                  période/mois (Frw)
                </p>
              </div>
              <div class="fields">
                <v-text-field
                  v-model="grantedCapital"
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
                  Moyenne du montant par crédit contracté (Frw)
                </p>
              </div>
              <div class="fields">
                <v-text-field
                  v-model="moyenneAmountCredit"
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
                  Valeur des intérêts sur les crédits octroyés au cours de la
                  période/mois (Frw
                </p>
              </div>
              <div class="fields">
                <v-text-field
                  v-model="interestForGrants"
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
                  Valeur totale des crédits (capital+ intérêts) au cours de la
                  période/mois (Frw)
                </p>
              </div>
              <div class="fields">
                <v-text-field
                  v-model="grantedCredit"
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
          <v-col cols="12" md="12">
            <div class="form-col">
              <div class="col-title-main">
                <p>
                  Remboursement des crédits au cours de la période/mois
                </p>
              </div>
              <v-row wrap>
                <v-col cols="12" md="6">
                  <div class="col-title">
                    <p>
                      Valeur des crédits remboursés (capital) au cours de la
                      période/mois (Frw)
                    </p>
                  </div>
                  <v-text-field
                    v-model="rebursedValueCapital"
                    label="entre le nombre"
                    :rules="[rules.required]"
                    clearable
                    type="number"
                    filled
                    dense
                    class="mx-2"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="col-title">
                    <p>
                      Valeur des intérêts sur les crédits remboursés au cours de
                      la période/mois (Frw)
                    </p>
                  </div>
                  <v-text-field
                    v-model="rebursedInterestValue"
                    label="entre le nombre"
                    :rules="[rules.required]"
                    clearable
                    type="number"
                    filled
                    dense
                    class="mx-2"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <div class="col-title">
                    <p>
                      Valeur total des crédits remboursés (capital + intérêts)
                      au cours de la période/mois (Frw)
                    </p>
                  </div>
                  <v-text-field
                    v-model="rebursedCapitalInterest"
                    label="entre le nombre"
                    :rules="[rules.required]"
                    clearable
                    type="number"
                    filled
                    dense
                    class="mx-2"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <div class="col-title">
                    <p>
                      Valeur des crédits (capital) restant à rembourser à la fin
                      de la période/mois (Frw)
                    </p>
                  </div>
                  <v-text-field
                    v-model="remainingCreditCapitalValue"
                    label="entre le nombre"
                    :rules="[rules.required]"
                    clearable
                    type="number"
                    filled
                    dense
                    class="mx-2"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <div class="col-title">
                    <p>
                      Valeur des intérêts aux crédits restant à rembourser à la
                      fin de la période/mois (Frw)
                    </p>
                  </div>
                  <v-text-field
                    v-model="ginterestRemainingCredit"
                    label="entre le nombre"
                    :rules="[rules.required]"
                    clearable
                    type="number"
                    filled
                    dense
                    class="mx-2"
                  ></v-text-field>
                </v-col>


                <v-col cols="12" md="6">
                  <div class="col-title">
                    <p>
                      Valeur total des crédits (capital + intérêts) restant à
                      rembourser à la fin de la période/mois (Frw)
                    </p>
                  </div>
                  <v-text-field
                    v-model="creditCapitalInterestRemaining"
                    label="entre le nombre"
                    :rules="[rules.required]"
                    clearable
                    type="number"
                    filled
                    dense
                    class="mx-2"
                  ></v-text-field>
                </v-col>


                <v-col cols="12" md="6">
                  <div class="col-title">
                    <p>
                      Valeur des crédits en retard (capital + intérêts) (Frw)
                    </p>
                  </div>
                  <v-text-field
                    v-model="capitalCreditRemaining"
                    label="entre le nombre"
                    :rules="[rules.required]"
                    clearable
                    type="number"
                    filled
                    dense
                    class="mx-2"
                  ></v-text-field>
                </v-col>


                <v-col cols="12" md="6">
                  <div class="col-title">
                    <p>
                      Portefeuille à risque (%)
                    </p>
                  </div>
                  <v-text-field
                    v-model="risky"
                    label="%"
                    :rules="[rules.required]"
                    clearable
                    type="number"
                    filled
                    dense
                    class="mx-2"
                  ></v-text-field>
                </v-col>

              </v-row>
            </div>
          </v-col>

          <v-col cols="12">
            <v-btn color="success" depressed rounded @click="moveStep(4)"
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
  name: "creditInterne",
  data: () => ({
    creditedGirls: 0,
    creditedBoys: 0,
    grantedCredit: 0,
    grantedCapital:0,
    interestForGrants: 0,
    moyenneAmountCredit: 0,
    capitalInterest: 0,
    rules: {
      required: (value) => !!value || "obligatoire!",
    },
    // rebursement
    rebursedValueCapital: 0,
    rebursedInterestValue: 0,
    rebursedCapitalInterest: 0,
    remainingCreditCapitalValue: 0,
    interestRemainingCredit: 0,
    creditCapitalInterestRemaining: 0,
    capitalCreditRemaining: 0,
    risky: 0


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
     moveStep(stepy) {
      store.commit("updateSteps", stepy);
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
