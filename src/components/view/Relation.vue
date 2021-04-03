<template>
  <div class="collection-component">
    <div class="contents">
      <div class="cont-title">
        <p>
          Relations avec institutions financières
        </p>
      </div>

      <ul class="comp-data">
        <li class="special">
          <div class="ctitle">
            Relations des membres des groupes avec les institutions financières
          </div>
        </li>
        <li>
          <div class="ctitle">
            Membres ayant ouvert un compte bancaire durant la période/mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="primary" class="mx-1" small label
              >{{ info.membres_ouvert_compte_bancaire }} RWF</v-chip
            >
          </div>
        </li>
        <li>
          <div class="ctitle">
            Membres ayant contracté un crédit bancaire au cours de la période/mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="primary" class="mx-1" small label
              >{{ info.membres_contracte_credit_bancaire }} RWF</v-chip
            >
          </div>
        </li>
        <li>
          <div class="ctitle">
            Valeur des crédits bancaires contractés (capital + intérêts) au cours de la période/mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="primary" class="mx-1" small label
              >{{ info.groupe_ayant_contracte_credit_bancaire }} RWF</v-chip
            >
          </div>
        </li>

        <li class="special">
          <div class="ctitle">
            Relations des groupes avec les institutions financières
          </div>
        </li>
        <li>
          <div class="ctitle">
           Groupes ayant contracté un crédit bancaire au cours de la période/mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="primary" small label>
              {{ info.groupe_ayant_contracte_credit_bancaire }}
              </v-chip
            >
          </div>
        </li>
        <li>
          <div class="ctitle">
           Montant des crédits bancaires contractés par les groupes au cours de la période/mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="primary" small label>
              {{ info.montant_de_credit_bancaire_contracte }}
              </v-chip
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "relation",
  props: ["info"],
};
</script>
