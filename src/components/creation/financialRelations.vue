<template>
  <div class="relation">
    <v-form v-model="valid" @submit.prevent>
      <v-row class="wrap my-4">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="accountsOpenend"
            :rules="commonRules"
            outlined
            dense
            rounded
            background-color="white"
            label="Membres ayant ouvert compte bancaire"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="membersCredited"
            :rules="commonRules"
            outlined
            dense
            rounded
            background-color="white"
            label="Membres ayant contracte un credit bancaire"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="creditedAmount"
            :rules="commonRules"
            outlined
            dense
            rounded
            background-color="white"
            label="valeurs des credits Bancaire"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-checkbox
            v-model="groupBankAccount"
            label="Groupe ayant ouvert un compte bancaire"
          ></v-checkbox>
        </v-col>
        <v-col cols="12">
          <v-checkbox
            v-model="groupBankCredit"
            label="Groupe ayant contracte un credit"
          ></v-checkbox>
        </v-col>
        <v-col cols="12">
          <v-btn
            color="primary"
            type="submit"
            :disabled="finished"
            depressed
            rounded
            @click="moveStep(4)"
          >
            Continue
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import store from "@/store/index";
export default {
  data: () => ({
    accountsOpenend: 0,
    membersCredited: 0,
    creditedAmount: 0,
    groupBankAccount: false,
    groupBankCredit: false,
  }),

  methods: {
    moveStep(stepy) {
      store.commit("updateSteps", stepy);
    },
  },
};
</script>

<style lang="scss" scoped>
// @use "@/assets/styles/base.scss";

.relation {
  padding: 20px;
  max-width: 100%;
  display: flex;
}
</style>
