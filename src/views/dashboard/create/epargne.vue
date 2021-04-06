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
        @click="moveStep(1)"
        > <v-icon left>mdi-arrow-left-circle</v-icon> étape précédente</v-btn
      >
    </div>
    <div class="data-create-container">
      <v-form @submit.prevent="saveInfo" ref="form">
        <v-row wrap class="main-form">
          <v-col cols="12" md="6" lg="4">
            <label class="label">Montant minimum épargné chaque mois dans le groupe (Frw)</label>
            <v-text-field
              v-model="monthlyMinAmount"
              :rules="[rules.required]"
              dense
              filled
              type="number"
              label="entre le nombre"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" lg="4">
            <label class="label">Montant maximal épargné chaque mois dans le groupe (Frw)</label>
            <v-text-field
              v-model="monthlyMaxAmount"
              :rules="[rules.required]"
              dense
              filled
              type="number"
              label="entre le nombre"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" lg="4">
            <label class="label">Valeur totale de l’épargne réalisée au cours de la période/mois (Frw)</label>
            <v-text-field
              v-model="periodReleasedAmount"
              :rules="[rules.required]"
              dense
              filled
              type="number"
              label="entre le nombre"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" lg="4">
            <v-text-field
              :value="moyenne"
              disabled
              dense
              filled
              type="number"
              label="Moyenne de l’épargne par membre (Frw)"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn color="success" depressed rounded @click="saveInfo(3)"
              >continuer</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
import store from "@/store/index";
import ActionsService from "@/services/actions.service";
export default {
  name: "epargne",
  data: () => ({
    rules: {
      required: (value) => !!value || "obligatoire!",
    },
    // info for submission
    periodReleasedAmount: 0,
    monthlyMinAmount: 0,
    monthlyMaxAmount: 0,
    epargnePerMember: 0,
  }),

  methods: {
    saveInfo(step) {
      if (this.$refs.form.validate()) {
        const formData = {
          collectionId: this.collection.id,
          monthlyMinAmount: this.monthlyMinAmount,
          periodReleasedAmount: this.periodReleasedAmount,
          monthlyMaxAmount: this.monthlyMaxAmount,
          epargnePerMember: this.moyenne,
        };
        // submit the data to the server
        ActionsService.SaveEpargne(formData).then((response) => {
          if (response.statusText === "OK") {
            console.log(response.data);
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
    collection() {
      return this.$store.state.collectionInfo;
    },

    moyenne() {
      // get members actuels inscrits
      if (this.collection !== null) {
        let x = parseInt(this.collection.actual_girls);
        let y = parseInt(this.collection.actual_boys);
        const membresActuelInscrit = x + y;
        // calculate moyenne
        const moyenne = this.periodReleasedAmount / membresActuelInscrit;
        return moyenne.toFixed(1);
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
