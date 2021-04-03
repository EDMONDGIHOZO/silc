<template>
  <div class="collection-component">
    <div class="contents">
      <div class="cont-title">
        <p>
          Livre de caisse/Banque
        </p>
      </div>

      <ul class="comp-data">
        <li>
          <div class="ctitle">
            Report du solde de la période /mois passé
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="orange" class="white--text" small label>
              {{ info.rapport_sold }} FRW
            </v-chip>
          </div>
        </li>
        <li>
          <div class="ctitle">
            Entrées des épargnes au cours de la période /mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="orange" class="white--text" small label>
              {{ epargneEntre }} FRW
            </v-chip>
          </div>
        </li>
        <li>
          <div class="ctitle">
            Entrées des crédits remboursés (capital + intérêts) au cours de la
            période /mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="orange" class="white--text" small label>
              {{ rebursedCapitalInterest }} FRW
            </v-chip>
          </div>
        </li>
        <li>
          <div class="ctitle">
            Entrées de la caisse de solidarité au cours de la période /mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="orange" class="white--text" small label>
              {{ entrePenalite }} FRW
            </v-chip>
          </div>
        </li>
        <li>
          <div class="ctitle">
            Entrées des pénalités au cours de la période /mois (Frw)
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="orange" class="white--text" small label>
              {{ entrePenalite }} FRW
            </v-chip>
          </div>
        </li>
        <li>
          <div class="ctitle">
            Autres entrées (crédit bancaire, autre) au cours de la période /mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="orange" class="white--text" small label>
              {{ info.autre_entre }} FRW
            </v-chip>
          </div>
        </li>
        <li class="special">
          <div class="ctitle">
            Total des entrées
          </div>
          <v-spacer></v-spacer>
          <v-chip color="orange" class="white--text" small label>
            {{ totalEntre }}
            FRW
          </v-chip>
        </li>
        <li>
          <div class="ctitle">
            Sorties pour crédits octroyés au cours de la période /mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="orange" class="white--text" small label>
              {{ grantedCredit }} FRW
            </v-chip>
          </div>
        </li>
        <li>
          <div class="ctitle">
            Sorties dans la caisse de solidarité au cours de la période /mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="orange" class="white--text" small label>
              {{ sortieSolidalite }} FRW
            </v-chip>
          </div>
        </li>
        <li>
          <div class="ctitle">
            Autres sorties (frais bancaires, autres) au cours de la période
            /mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="orange" class="white--text" small label>
              {{ info.autre_sortie }} FRW
            </v-chip>
          </div>
        </li>
        <li class="special">
          <div class="ctitle">
            Total des sorties
          </div>
          <v-spacer></v-spacer>
          <v-chip color="orange" class="white--text" small label>
            {{ totalSortie }}
            FRW
          </v-chip>
        </li>
        <li class="special">
          <div class="ctitle">
            Solde de la période / mois
          </div>
          <v-spacer></v-spacer>
          <v-chip color="orange" class="white--text" small label>
            {{ totalEntre - totalSortie }}
            FRW
          </v-chip>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "caisse",
  props: [
    "info",
    "collectionId",
    "epargneEntre",
    "rebursedCapitalInterest",
    "entreSolidalite",
    "entrePenalite",
    "grantedCredit",
    "sortieSolidalite",
  ],

  computed: {
    totalEntre() {
      const total =
        this.info.rapport_sold +
        this.epargneEntre +
        this.rebursedCapitalInterest +
        this.entreSolidalite +
        this.entrePenalite +
        this.info.autre_entre;

      return total;
    },

    totalSortie() {
      const total =
        this.info.rapport_sold +
        this.grantedCredit +
        this.sortieSolidalite +
        this.info.autre_sortie;

      return total;
    },
  },
};
</script>
