<template>
  <div class="container">
    <div class="complete" v-if="complete">
      <done-animation />
    </div>
    <div class="data-create-container" v-else>
      <v-form @submit.prevent="saveInfo">
        <v-row wrap>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="membersOpenedAccounts"
              outlined
              dense
              rounded
              background-color="white"
              label="Membres ayant ouvert un compte bancaire durant la périod"
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
              label="Montant des crédits bancaires contractés par les groupe"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-checkbox
              v-model="groupBankAccount"
              label="ce groupe a-t-il un compte bancaire?"
            ></v-checkbox>
          </v-col>
          <v-col cols="12">
            <v-checkbox
              v-model="groupBankCredit"
              hint=" N.B: Un groupe avec plusieurs crédits est compté une seule fois"
              label="Groupes ayant contracté un crédit bancaire au cours de la période/mois"
              persistent-hint
            ></v-checkbox>
          </v-col>

          <v-col cols="12">
            <v-btn color="success" depressed rounded @click="saveInfo"
              >terminer et fermer</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import DoneAnimation from "@/components/helpers/doneAnimation.vue";
import ActionsService from "@/services/actions.service";
export default {
  name: "relation",
  data: () => ({
    membersOpenedAccounts: null,
    membersCredited: null,
    creditedAmount: null,
    groupBankAccount: false,
    groupBankCredit: false,
    complete: false,
  }),

  components: {
    "done-animation": DoneAnimation,
  },

  methods: {
    saveInfo() {
      // show completion animation
      const formData = {
        collectionId: this.collection.id,
        membersOpenedAccounts: this.membersOpenedAccounts,
        membersCredited: this.membersCredited,
        creditedAmount: this.creditedAmount,
        groupBankAccount: this.groupBankAccount,
        groupBankCredit: this.groupBankCredit,
      };

      ActionsService.SaveRelations(formData).then((response) => {
        if (response.statusText === "OK") {
          this.$store.commit("updateSteps", 8);
          this.complete = true;
        }
      });
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
