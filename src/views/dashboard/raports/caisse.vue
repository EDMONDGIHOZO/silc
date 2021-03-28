<template>
  <div class="container">
    <v-card v-if="savedAll" outlined>
      <v-card-text class="text-center pa-5">
        <span class="display-3"
          >félicitations, toutes les données sont enregistrées avec succès</span
        >
      </v-card-text>
      <v-card-actions class="text-center pa-4">
        <v-btn color="success" depressed rounded @click="goto"
          >aller à la page d'accueil</v-btn
        >
      </v-card-actions>
    </v-card>
    <div class="caisse" v-else>
      <div class="title-bar">
        <h1>Livre de caisse/Banque</h1>
      </div>

      <v-form @submit.prevent="saveCaisseInfo" ref="form">
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
                <td>
                  <v-text-field
                    label="entre le nombre"
                    dense
                    v-model="autreEntre"
                    :rules="[rules.required]"
                    type="number"
                  ></v-text-field>
                </td>
              </tr>
              <tr class="primary--text font-weight-bold">
                <td>
                  <strong>Total des entrées (Frw)</strong>
                </td>
                <td>{{ totalEntre }} RWF</td>
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
                  Sorties dans la caisse de solidarité au cours de la période
                  /mois ( (Frw)
                </td>
                <td>{{ sortieSolidalite }}</td>
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
                <td>{{ totalSortie }} RWF</td>
              </tr>
              <tr>
                <td>
                  <strong class="primary--text">
                    Solde de la période / mois (Frw)
                  </strong>
                </td>
                <td>{{ soldePeriode }} RWF</td>
              </tr>
              <tr>
                <td colspan="2">
                  <v-btn
                    color="success"
                    type="submit"
                    @click="saveCaisseInfo()"
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
      coldata: {},
      loaded: false,
      savedAll: false,
      // form data
      rapportSold: 0,
      epargneEntre: 0,
      creditRembourseCapitalInterest: 0,
      caisseSolidalite: 0,
      entrePenalite: 0,
      autreEntre: 0,
      sortieCreditActroye: 0,
      autreSortie: 0,
      sortieSolidalite: 0,
    };
  },
  mounted() {
    this.moveStep(1);
    // if (this.collection !== null) {
    //   this.fillem();
    // }
    this.fillem();
  },

  computed: {
    collection() {
      return this.$store.state.collectionInfo;
    },

    totalEntre() {
      if (this.loaded) {
        let solde = parseInt(this.rapportSold);
        let epargnes = parseInt(this.coldata.epargne.period_released_amount);
        let rebursed = parseInt(this.coldata.credit.rebursed_capital_interest);
        let solidalite = parseInt(this.coldata.entraide.valeur_entrees);
        let penalites = parseInt(
          this.coldata.penalites.Montant_des_penalites_payees
        );
        let autres = parseInt(this.autreEntre);
        return solde + epargnes + rebursed + solidalite + penalites + autres;
      } else {
        return 0;
      }
    },
    totalSortie() {
      if (this.loaded) {
        let co = parseInt(this.coldata.credit.granted_capital);
        let cs = parseInt(this.coldata.entraide.valeur_sorties);
        let autres = parseInt(this.autreSortie);
        return co + cs + autres;
      } else {
        return 0;
      }
    },

    soldePeriode() {
      if (this.totalEntre !== null && this.totalSortie !== null) {
        let x = parseInt(this.totalEntre);
        let y = parseInt(this.totalSortie);
        return x - y;
      } else {
        return 0;
      }
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
      let id = this.collection.id;
      if (id !== null) {
        // fetch full collection
        ActionsService.getCollection(id).then((response) => {
          if (response.statusText === "OK") {
            // get antres des epargnes
            const data = response.data.data;
            this.coldata = data;
            this.loaded = true;
            if (data.epargne !== null) {
              this.epargneEntre = data.epargne.period_released_amount;
            } else {
              this.epargneEntre = 0;
            }

            // find credit rembourse
            if (data.credit !== null) {
              this.creditRembourseCapitalInterest =
                data.credit.rebursed_capital_interest;

              this.sortieCreditActroye = data.credit.granted_capital;
            } else {
              this.creditRembourseCapitalInterest = 0;
              this.granted_credit = 0;
            }

            // Entrées de la caisse de solidarité au cours de la période /mois (Frw)
            if (data.entraide !== null) {
              this.caisseSolidalite = data.entraide.valeur_entrees;
              this.sortieSolidalite = data.entraide.valeur_sorties;
            } else {
              this.caisseSolidalite = 0;
              this.valeurSolidalite = 0;
            }
            // Entrées des pénalités au cours de la période /mois (Frw)
            if (data.penalites !== null) {
              this.entrePenalite = data.penalites.Montant_des_penalites_payees;
            } else {
              this.entrePenalite = 0;
            }
          }
        });
      } else {
        return 0;
      }
    },
    saveCaisseInfo() {
      if (this.$refs.form.validate()) {
        const formData = {
          collectionId: this.collection.id,
          grouId: this.collection.group_id,
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
          sortieSolidalite: this.sortieSolidalite,
        };
        // submit the data to the server
        ActionsService.saveCaisse(formData).then((response) => {
          if (response.statusText === "OK") {
            this.savedAll = true;
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
