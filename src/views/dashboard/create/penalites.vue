<template>
  <div class="container">
    <div class="data-create-container">
      <v-form @submit.prevent="saveInfo" ref="penForm">
        <v-row wrap>
          <v-col cols="12" md="5">
            <div class="form-col">
              <div class="col-title">
                <p>
                  Membres punis au cours de la période / mois
                </p>
              </div>
              <div class="fields">
                <v-text-field
                  v-model="punishedMembers"
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
          <v-col cols="12" md="7">
            <div class="form-col">
              <div class="col-title">
                <p>
                  Montant des pénalités payées (Frw) au cours de la période /
                  mois
                </p>
              </div>
              <div class="fields">
                <v-text-field
                  v-model="amountPaid"
                  label="Nombres"
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
            <v-btn color="success" depressed rounded @click="saveInfo"
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
export default {
  name: "penalites",
  data: () => ({
    punishedMembers: 0,
    amountPaid: 0,
    rules: {
      required: (value) => !!value || "obligatoire!",
    },
  }),

  methods: {
    saveInfo(step) {
      if (this.$refs.penForm.validate()) {
        const formData = {
          collectionId: this.collection.id,
          punishedMembers: this.punishedMembers,
          amountPaid: this.amountPaid,
        };

        ActionsService.savePenalty(formData).then((response) => {
          if (response.statusText === "OK") {
            this.$store.commit("updateSteps", step);
            this.$router.push({ name: "caisseBanquee" });
          }
        });
      } else {
        alert("assurez-vous que, il n'y a pas de champ vide!");
      }
    },

    // verification() {
    //   this.$router.push({ name: "caisseBanquee" });
    // },
  },

  mounted() {
    this.collectionId = localStorage.getItem("collectionId");
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
