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
          :rules="commonRules"
          outlined
          dense
          rounded
          type="number"
          background-color="white"
          label="montant"
          required
          :disabled = "!epargneBtn"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <h1 class="right grey--text">{{ amount }} - RWF</h1>
      </v-col>
      <div class="saveArea">
        <v-btn
          color="success"
          class="my-3"
          width="180"
          outlined
          @click="saveEpargne"
          rounded
          :disabled = "!epargneBtn"
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
          :rules="commonRules"
          outlined
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
          :rules="commonRules"
          outlined
          dense
          rounded
          background-color="white"
          label="garçons crédités"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="grantedCredits"
          :rules="commonRules"
          outlined
          dense
          rounded
          background-color="white"
          label="Credits Actroyes"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="grantedCapital"
          :rules="commonRules"
          outlined
          dense
          rounded
          background-color="white"
          label="Credits Actroyes (capital)"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="interestForGrants"
          :rules="commonRules"
          outlined
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
          width="180"
          outlined
          @click="saveCredits"
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
          v-model="rebursedCapital"
          :rules="commonRules"
          outlined
          dense
          rounded
          background-color="white"
          label="credits Rembourses (capital)"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="RebursedInterest"
          :rules="commonRules"
          outlined
          dense
          rounded
          background-color="white"
          label="intérêts remboursés"
          required
        ></v-text-field>
      </v-col>
      <div class="saveArea">
        <v-btn
          color="info"
          class="my-3"
          width="180"
          @click="rebursement"
          outlined
          rounded
          >Save</v-btn
        >
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    amount: null,
    // views
    epargne: true,
    epargneBtn:true,
    credits: false,
    rebursement: false,
    currency: false,
  }),

  methods: {
    saveEpargne() {
      this.credits = true;
      this.epargneBtn = false
    },
    saveCredits() {
      this.rebursement = true;
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