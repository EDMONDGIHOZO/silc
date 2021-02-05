<template>
  <div class="relation">
    <v-form v-model="valid" @submit.prevent>
      <v-row class="wrap my-4">
        <v-col cols="12" md="6">
          <v-text-field
            v-model="accountsOpenend"
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
            @click="saveRelations"
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
import ActionsService from "@/services/actions.service";
export default {
  data: () => ({
    
    accountsOpenend: null,
    membersCredited: null,
    creditedAmount: null,
    groupBankAccount: false,
    groupBankCredit: false,

    finished: false,
    valid: false,
  }),

  methods: {
    // save the relations informations
    saveRelations() {
      const formData = {
        collectionId: localStorage.getItem("collectionId"),
        membersOpenedAccounts: this.accountsOpenend,
        membersCredited: this.membersCredited,
        creditedAmount: this.creditedAmount,
        groupBankAccount: this.groupBankAccount,
        groupBankCredit: this.groupBankAccount,
      };
      // save to the server
      ActionsService.SaveRelations(formData).then((response) => {
        const payload = response.data;
        this.$store.commit("alerter", payload);
        // this.credits = true;
        // this.epargneBtn = false;
        store.commit("updateSteps", 4);
      });
    },
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
