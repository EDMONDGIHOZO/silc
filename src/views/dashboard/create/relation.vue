<template>
  <div class="container">
    <div class="complete" v-if="complete">
      <done-animation />
    </div>
    <div class="data-create-container" v-else>
      <v-form @submit.prevent="saveInfo" ref="relationForm">
        <v-row wrap>
          <v-col cols="12">
            <div class="form-col">
              <div class="col-title-main">
                <p>
                  Relations des membres des groupes avec les institutions
                  financières
                </p>
              </div>
              <div class="fields">
                <v-row wrap>
                  <v-col cols="12" md="6">
                    <div class="col-title">
                      <p>
                        Membres ayant ouvert un compte bancaire durant la
                        période/mois
                      </p>
                    </div>
                    <v-text-field
                      v-model="membersOpenedAccounts"
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
                        Membres ayant contracté un crédit bancaire au cours de
                        la période/mois
                      </p>
                    </div>
                    <v-text-field
                      v-model="membersCredited"
                      label="entre le nombre"
                      :rules="[rules.required]"
                      clearable
                      type="number"
                      filled
                      dense
                      class="mx-2"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12">
                    <div class="col-title">
                      <p>
                        Valeur des crédits bancaires contractés (capital +
                        intérêts) au cours de la période/mois (Frw)
                      </p>
                    </div>
                    <v-text-field
                      v-model="creditedAmount"
                      label="entre le nombre"
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
            </div>
          </v-col>
          <v-col cols="12">
            <div class="form-col">
              <div class="col-title-main">
                <p>
                  Relations des groupes avec les institutions financières
                </p>
              </div>
              <div class="fields">
                <v-row wrap>
                  <v-col cols="12" md="6">
                    <div class="col-title">
                      <p>
                        Groupes ayant ouvert un compte bancaire au cours de la
                        période/mois
                      </p>
                    </div>
                    <v-text-field
                      v-model="groupBankAccount"
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
                        Groupes ayant contracté un crédit bancaire au cours de
                        la période/mois
                      </p>
                    </div>
                    <v-text-field
                      v-model="groupBankCredit"
                      label="entre le nombre"
                      :rules="[rules.required]"
                      clearable
                      type="number"
                      filled
                      dense
                      class="mx-2"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="12">
                    <div class="col-title">
                      <p>
                        Montant des crédits bancaires contractés par les groupes
                        au cours de la période/mois (Frw)
                      </p>
                    </div>
                    <v-text-field
                      v-model="groupCreditAmount"
                      label="entre le nombre"
                      :rules="[rules.required]"
                      clearable
                      type="number"
                      filled
                      dense
                      class="mx-2"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      color="success"
                      depressed
                      rounded
                      @click="saveInfo()"
                      >continuer</v-btn
                    >
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import DoneAnimation from "@/components/helpers/doneAnimation.vue";
import ActionsService from "@/services/actions.service";
import store from "@/store/index";
export default {
  name: "relation",
  data: () => ({
    membersOpenedAccounts: 0,
    membersCredited: 0,
    creditedAmount: 0,
    groupBankAccount: 0,
    groupCreditAmount: 0,
    groupBankCredit: 0,
    complete: false,
    rules: {
      required: (value) => !!value || "obligatoire!",
    },
  }),

  components: {
    "done-animation": DoneAnimation,
  },

  methods: {
    saveInfo() {
      // show completion animation
      if (this.$refs.relationForm.validate()) {
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
            this.$store.commit("updateSteps", 5);
            this.complete = true;
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
