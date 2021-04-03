<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-dialog transition="dialog-bottom-transition" max-width="950">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            rounded
            v-bind="attrs"
            v-on="on"
            depressed
            light
          >
            <v-icon left>mdi-book-open-page-variant</v-icon>
            Livre de caisse</v-btn
          >
        </template>
        <template v-slot:default="dialog">
          <v-sheet>
            <v-toolbar color="primary" dark>
              <v-toolbar-title> Livre de caisse/Banque </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="dialog.value = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <table class="bank-container">
              <thead>
                <tr>
                  <th><h1>Title</h1></th>
                  <th><h1>Montant (FRW)</h1></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Report du solde de la période /mois passé</td>
                  <td v-if="data.solde !== null">
                    {{ data.solde.montant_solde | num }} FRW
                  </td>
                </tr>
                <tr>
                  <td>Entrées des épargnes au cours de la période /mois</td>
                  <td v-if="data.epargne !== null">
                    {{ data.epargne.valeur_total_epargne_realise_mois | num }}
                    FRW
                  </td>
                  <td v-else>no data</td>
                </tr>
                <tr>
                  <td>
                    Entrées des crédits remboursés (capital + intérêts) au cours
                    de la période /mois
                  </td>
                  <td v-if="data.rebursed !== null">
                    {{ data.rebursed.valeur_de_credit_rembourse_capital | num }}
                    FRW
                  </td>
                </tr>
                <tr>
                  <td>
                    Entrées de la caisse de solidarité au cours de la période
                    /mois
                  </td>
                  <td v-if="data.entraide !== null">
                    {{ data.entraide.valeur_entrees }} FRW
                  </td>
                  <td v-else>no data</td>
                </tr>
                <tr>
                  <td>Entrées des pénalités au cours de la période /mois</td>
                  <td v-if="data.penalites !== null">
                    {{ data.penalites.Montant_des_penalites_payees }} FRW
                  </td>
                  <td v-else>no data</td>
                </tr>
                <tr>
                  <td>
                    Autres entrées (crédit bancaire, autre) au cours de la
                    période /mois
                  </td>
                  <td v-if="data.relation !== null">
                    {{
                      data.relation.montant_de_credit_bancaire_contracte | num
                    }}
                    FRW
                  </td>
                  <td v-else>no data</td>
                </tr>
                <tr>
                  <td>Total des entrées</td>
                  <td>{{ totalEntre | num }} FRW</td>
                </tr>
                <tr>
                  <td>
                    Sorties pour crédits octroyés au cours de la période /mois
                  </td>
                  <td v-if="data.credit !== null">{{data.credit.nombres_total_credit_actroyes}} FRW</td>
                  <td v-else>no data</td>
                </tr>
                <tr>
                  <td>
                    Sorties dans la caisse de solidarité au cours de la période
                    /mois
                  </td>
                  <td v-if="data.entraide !== null">{{data.entraide.valeur_sorties | num}} FRW</td>
                </tr>
              </tbody>
            </table>
          </v-sheet>
        </template>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["data"],
  data: () => ({
    totalEntre: 0,
  }),

  mounted() {
    this.totalizeEntre();
  },

  methods: {
    totalizeEntre() {
      if (this.data) {
        const totals =
          this.data.epargne.valeur_total_epargne_realise_mois +
          this.data.rebursed.valeur_de_credit_rembourse_capital +
          this.data.entraide.valeur_entrees +
          this.data.penalites.Montant_des_penalites_payees +
          this.data.relation.montant_de_credit_bancaire_contracte;

        return (this.totalEntre = totals);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.bankinfo {
  background-color: white;
}
h1 {
  font-size: 3em;
  font-weight: 300;
  line-height: 1em;
  text-align: center;
  color: #4dc3fa;
}

h2 {
  font-size: 1em;
  font-weight: 300;
  text-align: center;
  display: block;
  line-height: 1em;
  padding-bottom: 2em;
  color: #fb667a;
}

h2 a {
  font-weight: 700;
  text-transform: uppercase;
  color: #fb667a;
  text-decoration: none;
}

.blue {
  color: #2bb673;
}
.yellow {
  color: #ffb800;
}

.bank-container th h1 {
  font-weight: bold;
  font-size: 1em;
  text-align: left;
  color: #2bb673;
}

.bank-container td {
  font-weight: normal;
  font-size: 1em;
}

.bank-container {
  text-align: left;
  overflow: hidden;
  width: 100%;
  margin: auto;
  display: table;
  padding: auto;
}

.bank-container td,
.bank-container th {
  padding-bottom: 2%;
  padding-top: 2%;
  padding-left: 1%;
}

/* Background-color of the odd rows */
.bank-container tr:nth-child(odd) {
  background-color: #ffffff;
}

/* Background-color of the even rows */
.bank-container tr:nth-child(even) {
  background-color: #f7f7f7;
}

.table-container th {
  background-color: #bbffd2;
}

.bank-container td:first-child {
  color: #4e4e4e;
}

.bank-container tr:hover {
  background-color: #ffffff;
}

.bank-container td:hover {
  background-color: #ffb800;
  color: #403e10;
  font-weight: bold;

  box-shadow: #7f7c21 -1px 1px, #7f7c21 -2px 2px, #7f7c21 -3px 3px,
    #7f7c21 -4px 4px, #7f7c21 -5px 5px, #7f7c21 -6px 6px;
  transform: translate3d(6px, -6px, 0);

  transition-delay: 0s;
  transition-duration: 0.4s;
  transition-property: all;
  transition-timing-function: line;
}

@media (max-width: 800px) {
  .bank-container td:nth-child(4),
  .bank-container th:nth-child(4) {
    display: none;
  }
}
</style>