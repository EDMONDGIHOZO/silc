<template>
  <div class="container">
    <div class="backer">
      <v-btn
        color="black"
        dark
        class="my-5"
        small
        depressed
        rounded
        @click="moveStep(2)"
      >
        <v-icon left>mdi-arrow-left-circle</v-icon> étape précédente</v-btn
      >
    </div>
    <div class="data-create-container">
      <v-form @submit.prevent="saveInfo" ref="creditForm">
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
                  label="Calcul automatique"
                  :rules="[rules.required]"
                  clearable
                  type="number"
                  prefix="FRW"
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
                  v-model="capitalInterest"
                  label="Calcul automatique"
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
                    prefix="FRW"
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
                    label="Calcul automatique"
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
                    v-model="interestRemainingCredit"
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
                    label="Calcul Automatique"
                    prefix="%"
                    right-prefic
                    :rules="[rules.required]"
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
            <v-btn color="success" depressed rounded @click="saveInfo(4)"
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
    grantedCapital: 0,
    interestForGrants: 0,
    totalCredited: 0,
    rules: {
      required: (value) => !!value || "obligatoire!",
    },
    // rebursement
    rebursedValueCapital: 0,
    rebursedInterestValue: 0,
    remainingCreditCapitalValue: 0,
    interestRemainingCredit: 0,
    capitalCreditRemaining: 0,
  }),

  methods: {
    saveInfo(step) {
      if (this.$refs.creditForm.validate()) {
        const formData = {
          collectionId: this.collection.id,
          creditedGirls: this.creditedGirls,
          creditedBoys: this.creditedBoys,
          grantedCredit: this.grantedCredit,
          grantedCapital: this.grantedCapital,
          interestForGrants: this.interestForGrants,
          moyenneAmountCredit: this.moyenneAmountCredit,
          rebursedValueCapital: this.rebursedValueCapital,
          rebursedInterestValue: this.rebursedInterestValue,
          rebursedCapitalInterest: this.rebursedCapitalInterest,
          remainingCreditCapitalValue: this.remainingCreditCapitalValue,
          interestRemainingCredit: this.interestRemainingCredit,
          creditCapitalInterestRemaining: this.creditCapitalInterestRemaining,
          capitalCreditRemaining: this.capitalCreditRemaining,
          risky: this.risky,
        };

        ActionsService.saveCredits(formData).then((response) => {
          if (response.statusText === "OK") {
            this.$store.commit("updateSteps", step);
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
    // get the current collection
    collection() {
      let col = this.$store.state.collectionInfo;
      return col;
    },

    // moyenne
    moyenneAmountCredit() {
      if (this.totalCredited > 0 && this.grantedCapital > 0) {
        let value = parseInt(this.grantedCapital);
        let nombre = parseInt(this.totalCredited);
        let res = value / nombre;
        return res.toFixed(2);
      } else {
        return 0;
      }
    },
    // Valeur totale des crédits (capital+ intérêts) au cours de la période/mois (Frw)
    capitalInterest() {
      if (this.interestForGrants > 0 && this.grantedCapital > 0) {
        let interest = parseInt(this.interestForGrants);
        let capital = parseInt(this.grantedCapital);
        let res = capital + interest;
        return res.toFixed(2);
      } else {
        return 0;
      }
    },
    // Valeur total des crédits remboursés (capital + intérêts) au cours de la période/mois (Frw)
    rebursedCapitalInterest() {
      if (this.rebursedValueCapital > 0 && this.rebursedInterestValue > 0) {
        let ifg = parseInt(this.rebursedInterestValue);
        let rvc = parseInt(this.rebursedValueCapital);
        let res = ifg + rvc;
        return res.toFixed(0);
      } else {
        return 0;
      }
    },
    creditCapitalInterestRemaining() {
      if (
        this.interestRemainingCredit > 0 &&
        this.remainingCreditCapitalValue > 0
      ) {
        let irc = parseInt(this.interestRemainingCredit);
        let rccv = parseInt(this.remainingCreditCapitalValue);
        let res = irc + rccv;
        return res.toFixed(0);
      } else {
        return 0;
      }
    },

    risky() {
      let retard = parseInt(this.creditCapitalInterestRemaining);
      let restant = parseInt(this.remainingCreditCapitalValue);

      if (restant > 0 && retard > 0) {
        const finalrest = (retard * 100) / restant;
        return finalrest.toFixed(1);
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
