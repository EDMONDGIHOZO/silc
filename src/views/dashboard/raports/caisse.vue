<template>
  <div class="container">
    <div class="caisse">
      <div class="title-bar">
        <h1>Livre de caisse/Banque</h1>
      </div>

      <v-form @submit.prevent="saveCollection">
        <v-simple-table dark width="400" class="caisse-table">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  title
                </th>
                <th class="text-left">
                  contenu
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Report du solde de la période /mois passé (Frw)</td>
                <td>
                  <v-text-field
                    label="entre le nombre"
                    dense
                    v-model="rapportSold"
                    :rules="[rules.required]"
                    type="number"
                  ></v-text-field>
                </td>
              </tr>
              <tr>
                <td>Entrées des épargnes au cours de la période /mois (Frw)</td>
                <td>{{ epargneEntre }}</td>
              </tr>
              <tr>
                <td>
                  Entrées des crédits remboursés (capital + intérêts) au cours
                  de la période /mois (Frw)
                </td>
                <td>{{ creditRembourseCapitalInterest }}</td>
              </tr>
              <tr>
                <td>
                  Entrées de la caisse de solidarité au cours de la période
                  /mois (Frw)
                </td>
                <td>{{ caisseSolidalite }}</td>
              </tr>
              <tr>
                <td>
                  Entrées des pénalités au cours de la période /mois (Frw)
                </td>
                <td>{{ entrePenalite }}</td>
              </tr>
              <tr>
                <td>
                  Autres entrées (crédit bancaire, autre) au cours de la période
                  /mois (Frw)
                </td>
                <td>{{ autreEntre }}</td>
              </tr>
              <tr>
                <td>
                  <strong class="primary--text">Total des entrées (Frw)</strong>
                </td>
                <td>{{ totalEntre }}</td>
              </tr>
              <tr>
                <td>
                  Sorties pour crédits octroyés au cours de la période /mois
                  (Frw)
                </td>
                <td>{{ sortieCreditActroye }}</td>
              </tr>
              <tr>
                <td>
                  Autres sorties (frais bancaires, autres) au cours de la
                  période /mois ((Frw)
                </td>
                <td>
                  <v-text-field
                    label="entre le nombre"
                    dense
                    v-model="autreSortie"
                    :rules="[rules.required]"
                    type="number"
                  ></v-text-field>
                </td>
              </tr>
              <tr>
                <td>
                  <strong class="primary--text"
                    >Total des sorties (Frw)
                  </strong>
                </td>
                <td>{{ totalSortie }}</td>
              </tr>
              <tr>
                <td>
                  <strong class="primary--text">
                    Solde de la période / mois (Frw)
                  </strong>
                </td>
                <td>{{ soldePeriode }}</td>
              </tr>
              <tr>
                <td colspan="2">
                  <v-btn
                    color="success"
                    type="submit"
                    @click="saveInfo"
                    class="my-4"
                    rounded
                    block
                    >collecte de données complète</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-form>
    </div>
  </div>
</template>

<script>
import store from "@/store/index";
import ActionsService from "@/services/actions.service";
export default {
  name: "verification",
  data() {
    return {
      rules: {
        required: (value) => !!value || "obligatoire!",
      },

      // form data
      rapportSold: 0,
      epargneEntre: 0,
      creditRembourseCapitalInterest: 0,
      caisseSolidalite: 0,
      entrePenalite: 0,
      autreEntre: 0,
      totalEntre: 0,
      sortieCreditActroye: 0,
      autreSortie: 0,
      totalSortie: 0,
      soldePeriode: 0,
    };
  },
  mounted() {
    this.moveStep(1);
    if (this.collection !== null) {
      this.fillem();
    }
  },

  computed: {
    collection() {
      return this.$store.state.collectionInfo;
    },
  },
  methods: {
    moveStep(stepy) {
      store.commit("updateSteps", stepy);
    },

    goto() {
      this.$router.push({ name: "home" });
    },

    fillem() {
      const info = this.collection;
      console.log(info);
    },

    saveInfo() {
      if (this.$refs.form.validate()) {
        const formData = {
          collectionId: this.collection.id,
          rapportSold: this.rapportSold,
          epargneEntre: this.epargneEntre,
          creditRembourseCapitalInterest: this.creditRembourseCapitalInterest,
          caisseSolidalite: this.caisseSolidalite,
          entrePenalite: this.entrePenalite,
          autreEntre: this.autreEntre,
          totalEntre: this.totalEntre,
          sortieCreditActroye: this.sortieCreditActroye,
          autreSortie: this.autreSortie,
          totalSortie: this.totalSortie,
          soldePeriode: this.soldePeriode,
        };
        // submit the data to the server
        ActionsService.SaveEpargne(formData).then((response) => {
          if (response.statusText === "OK") {
            console.log(response.data);
          }
        });
      } else {
        alert("assurez-vous que, il n'y a pas de champ vide!");
      }
    },
  },
};
</script>

<style scoped>
.caisse {
  padding: 25px;
}
.caisse .title-bar {
  margin-bottom: 20px;
}

.caisse-table :is(tr) {
  height: 70px;
}
</style>
