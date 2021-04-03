<template>
  <div class="collection-component">
    <div class="contents">
      <div class="cont-title">
        <p>
          Crédits internes
        </p>
      </div>

      <ul class="comp-data">
        <li class="special">
          <div class="ctitle">
            Crédits octroyés au cours de la période/mois
          </div>
        </li>
        <li>
          <div class="ctitle">
            Membres ayant contracté un crédit dans le groupe au cours de la
            période/mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="primary" class="mx-1" small label
              >F: {{ info.credite_girls }}</v-chip
            >
            <v-chip color="primary" small label
              >G: {{ info.credite_boys }}</v-chip
            >
          </div>
        </li>
        <li>
          <div class="ctitle">
            Nombre total de crédits octroyés au cours de la période/mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="primary" small label>
              {{ info.granted_credit }}</v-chip
            >
          </div>
        </li>
        <li>
          <div class="ctitle">
            Valeur des crédits octroyés (capital) au cours de la période/mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="primary" small label>
              {{ info.granted_capital }} FRW</v-chip
            >
          </div>
        </li>
        <li>
          <div class="ctitle">
            Moyenne du montant par crédit contract
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="primary" small label>
              {{ info.moyenne_amount_credit }} FRW</v-chip
            >
          </div>
        </li>
        <li>
          <div class="ctitle">
            Valeur des intérêts sur les crédits octroyés au cours de la
            période/mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="primary" small label>
              {{ info.interest_for_grants }} FRW</v-chip
            >
          </div>
        </li>
        <li>
          <div class="ctitle">
            Valeur totale des crédits (capital+ intérêts) au cours de la
            période/mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="primary" small label>
              {{ info.interest_for_grants + info.granted_capital }}
              FRW</v-chip
            >
          </div>
        </li>
        <li class="special">
          <div class="ctitle">
            Remboursement des crédits au cours de la période/mois
          </div>
        </li>
        <li>
          <div class="ctitle">
            Valeur des crédits remboursés (capital) au cours de la période/mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="primary" small label>
              {{ info.rebursed_value_capital }}
              FRW</v-chip
            >
          </div>
        </li>
        <li>
          <div class="ctitle">
            Valeur des intérêts sur les crédits remboursés au cours de la
            période/mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="primary" small label>
              {{ info.rebursed_interest_value }}
              FRW</v-chip
            >
          </div>
        </li>
        <li>
          <div class="ctitle">
            Valeur total des crédits remboursés (capital + intérêts) au cours de
            la période/mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="primary" small label>
              {{ info.rebursed_capital_interest }}
              FRW</v-chip
            >
          </div>
        </li>
        <li>
          <div class="ctitle">
            Valeur des crédits (capital) restant à rembourser à la fin de la
            période/mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="primary" small label>
              {{ info.remaining_credit_capital }}
              FRW</v-chip
            >
          </div>
        </li>
        <li>
          <div class="ctitle">
            Valeur des intérêts aux crédits restant à rembourser à la fin de la
            période/mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="primary" small label>
              {{ info.interest_remaining_credit }}
              FRW</v-chip
            >
          </div>
        </li>
        <li>
          <div class="ctitle">
            Valeur total des crédits (capital + intérêts) restant à rembourser à
            la fin de la période/mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="primary" small label>
              {{ info.credit_capital_interest_remaining }}
              FRW</v-chip
            >
          </div>
        </li>
        <li>
          <div class="ctitle">
            Valeur des crédits en retard (capital + intérêts)
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="primary" small label>
              {{ info.capital_credit_remaining }}
              FRW</v-chip
            >
          </div>
        </li>
        <li>
          <div class="ctitle">
            <strong>Portefeuille à risque</strong>
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="primary" small label>
              {{ info.risky }}
              %</v-chip
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "credit",
  props: ["info"],
};
</script>
