<template>
  <div class="financials">
    <!-- make row for the collection informations -->

    <!-- make row for epargne -->
    <v-row wrap v-if="epargne">
      <v-col cols="12">
        <h2 class="ma-1">Epargne</h2>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="amount"
          outlined
          dense
          rounded
          type="number"
          background-color="white"
          label="montant"
          required
          :disabled="!epargneBtn"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <h1 class="right grey--text">{{ amount }} - FRW</h1>
      </v-col>
      <div class="saveArea">
        <v-btn
          color="success"
          class="my-3"
          width="180"
          outlined
          @click="saveEpargne"
          rounded
          :disabled="!epargneBtn"
          >Save</v-btn
        >
      </div>
    </v-row>

    <!-- row for credits -->

    <v-row wrap v-if="credits">
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
      <v-col cols="12">
        <h2 class="ma-1">Credits Interne</h2>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="creditedGirls"
          outlined
          :disabled="creditsBtn"
          dense
          rounded
          background-color="white"
          label="filles créditées"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="creditedBoys"
          outlined
          :disabled="creditsBtn"
          dense
          rounded
          background-color="white"
          label="garçons crédités"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="creditsActroyes"
          outlined
          :disabled="creditsBtn"
          dense
          rounded
          background-color="white"
          label="Credits Actroyes"
          required
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="grantedCapital"
          outlined
          :disabled="creditsBtn"
          dense
          type="number"
          rounded
          background-color="white"
          label="Credits Actroyes (capital)"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="interestForGrants"
          outlined
          :disabled="creditsBtn"
          dense
          rounded
          background-color="white"
          label="Interets sur les credit"
          required
        ></v-text-field>
      </v-col>
      <div class="saveArea">
        <v-btn
          color="orange"
          class="my-3"
          :disabled="creditsBtn"
          width="180"
          outlined
          @click="saveCredits"
          type="number"
          rounded
          >Save</v-btn
        >
      </div>
    </v-row>

    <!-- row for rebursement -->
    <v-row wrap v-if="rebursement">
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
      <v-col cols="12">
        <h2 class="ma-1">Remboursement des credits</h2>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="valeurCreditRebursedCapital"
          outlined
          dense
          rounded
          type="number"
          :disabled="rebursementBtn"
          background-color="white"
          label="crédits remboursés (capital)"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="valeurInteretsCreditRebursed"
          outlined
          :disabled="rebursementBtn"
          dense
          rounded
          background-color="white"
          label="intérêts sur les crédits remboursés"
          type="number"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="valeurCreditCapitalRestantRebursedFin"
          outlined
          :disabled="rebursementBtn"
          dense
          rounded
          background-color="white"
          label="crédits (capital) restant à rembourser"
          type="number"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="valeurInteretsCreditRestantRebursed"
          outlined
          :disabled="rebursementBtn"
          dense
          rounded
          background-color="white"
          label="intérêts aux crédits restant à rembourser"
          type="number"
          required
        ></v-text-field>
      </v-col>

      <div class="saveArea">
        <v-btn
          color="info"
          class="my-3"
          width="180"
          @click="reburse"
          outlined
          type="number"
          :disabled="rebursementBtn"
          rounded
          >Save</v-btn
        >
      </div>
    </v-row>
    <v-btn
      color="primary"
      type="submit"
      :disabled="finished"
      depressed
      rounded
      @click="moveStep(3)"
    >
      Continue
    </v-btn>
  </div>
</template>

<script>
import ActionsService from "@/services/actions.service";
import store from "@/store/index";
export default {
  data: () => ({
    stepy: 3,
    // views
    epargne: true,
    epargneBtn: true,
    creditsBtn: false,
    rebursementBtn: false,
    credits: false,
    rebursement: false,
    currency: false,
    finished: true,
    collectionId: null,
    // les donnees d'epargne
    amount: null,
    // donnees de credit interne
    creditedGirls: "",
    creditedBoys: "",
    creditsActroyes: "",
    grantedCapital: "",
    interetsSurCredit: "",
    interestForGrants: "",
    // donnees de rebursement
    valeurCreditRebursedCapital: null,
    valeurInteretsCreditRebursed: null,
    valeurCreditCapitalRestantRebursedFin: null,
    valeurInteretsCreditRestantRebursed: null,

    // views
    color: "",
    status: true,
    message: "",
  }),

  methods: {
    /** ----------------- epargnes ---------------- */
    saveEpargne() {
      //save data to the server
      const formData = {
        collectionId: localStorage.getItem("collectionId"),
        amount: this.amount,
      };
      ActionsService.SaveEpargne(formData).then((response) => {
        const payload = response.data;
        if (response.statusText === "OK") {
          this.$store.commit("alerter", payload);
          this.credits = true;
          this.epargneBtn = false;
        } else {
          alert("someting is wrong");
        }
      });
    },

    /** ----------------- credits ---------------- */
    saveCredits() {
      // gather the inputs
      const formData = {
        collectionId: localStorage.getItem("collectionId"),
        creditedGirls: this.creditedGirls,
        creditedBoys: this.creditedBoys,
        grantedCredit: this.creditsActroyes,
        grantedCapital: this.grantedCapital,
        interestForGrants: this.interestForGrants,
      };
      // use the collected data
      ActionsService.SaveCredits(formData).then((response) => {
        if (response.statusText === "OK") {
          const payload = response.data;
          this.$store.commit("alerter", payload);
          this.rebursement = true;
          this.creditsBtn = true;
          localStorage.setItem("step", JSON.stringify(2));
        } else {
          alert("an error occured please try again later");
        }
      });
    },

    /** ----------------- rebursements ---------------- */

    reburse() {
      // get the inputs
      const formData = {
        collectionId: localStorage.getItem("collectionId"),
        valeurCreditRebursedCapital: this.valeurCreditRebursedCapital,
        valeurInteretsCreditRebursed: this.valeurInteretsCreditRebursed,
        valeurCreditCapitalRestantRebursedFin: this
          .valeurCreditCapitalRestantRebursedFin,
        valeurInteretsCreditRestantRebursed: this
          .valeurInteretsCreditRestantRebursed,
        valeurCreditRetard:
          this.valeurCreditCapitalRestantRebursedFin +
          this.valeurInteretsCreditRestantRebursed,
      };
      // save to the server
      ActionsService.saveRebursement(formData).then((response) => {
        const payload = response.data;
        this.$store.commit("alerter", payload);
        // return the response and
        this.rebursementBtn = true;
        this.finished = false;
        localStorage.setItem("step", JSON.stringify(3));
      });
    },

    moveStep(stepy) {
      store.commit("updateSteps", stepy);
    },

    showCurrency() {
      this.currency = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.saveArea {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  margin-top: -20px;
}
</style>
