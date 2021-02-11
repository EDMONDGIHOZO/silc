<template>
  <div class="container" v-if="colData.loaded">
    <v-toolbar flat color="secondary" rounded>
      <v-toolbar-title class="font-weight-bold"
        >COLLECTION DE -
        {{ collectionData.collection_date | formatDate }}</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <caisse-bank :data="collectionData" />
    </v-toolbar>

    <div class="single-collection">
      <div class="data-card">
        <v-row wrap justify="center" align="center">
          <v-col cols="12" md="4" class="titler">
            <h2 class="card-title">Reference du groupe</h2>
          </v-col>
          <v-col cols="12" md="8" class="contents">
            <ul class="list-container">
              <li class="list-item">
                Date de collecte de données
                <strong>{{
                  collectionData.collection_date | formatDate
                }}</strong>
              </li>
              <li class="list-item">
                Date de début d’épargne du cycle actuel
                <strong>{{
                  collectionData.date_debut_epargne_cycle | formatDate
                }}</strong>
              </li>
              <li class="list-item">
                Date probable de fin du cycle actuel
                <strong>{{
                  collectionData.date_probable_fin_epargne_cycle | formatDate
                }}</strong>
              </li>
              <li class="list-item">
                Temps passés du cycle actuel
                <strong>{{
                  collectionData.collection_date | passedFormat
                }}</strong>
              </li>
              <li class="list-item">
                Durée maximale convenue de crédit (mois)
                <strong
                  >{{ collectionData.dure_maximale_convenue_credit }} Mois
                </strong>
              </li>
              <li class="list-item">
                Taux d’intérêt mensuel du crédit (%)
                <strong>{{ collectionData.groups.monthly_interest }} %</strong>
              </li>
            </ul>
          </v-col>
        </v-row>
      </div>
      <div class="data-card">
        <v-row wrap justify="center" align="center">
          <v-col cols="12" md="4" class="titler">
            <h2 class="card-title">Membres du groupe</h2>
          </v-col>
          <v-col cols="12" md="8" class="contents">
            <ul class="list-container">
              <li class="list-item">
                <p>Membres inscrits dans le mois précédent</p>
                <div class="chips">
                  <v-chip color="info">
                    <v-icon left>mdi-human-female</v-icon>
                    {{ collectionData.nuveaux_membres_mois_girls }}</v-chip
                  >

                  <v-chip color="info" class="mx-2">
                    <v-icon left>mdi-human-male</v-icon>
                    {{ collectionData.nuveaux_membres_mois_boys }}</v-chip
                  >
                </div>
              </li>
              <li class="list-item">
                <p>Abandons au cours du mois actuel</p>
                <div class="chips">
                  <v-chip color="danger" class="white--text font-weight-bold">
                    <v-icon left>mdi-human-female</v-icon>
                    {{ collectionData.abandons_mois_actuel_gils }}</v-chip
                  >

                  <v-chip
                    color="danger"
                    class="white--text font-weight-bold mx-2"
                  >
                    <v-icon left>mdi-human-male</v-icon>
                    {{ collectionData.abandons_mois_actuel_boys }}</v-chip
                  >
                </div>
              </li>
              <li class="list-item">
                <p>Nouveaux membres enregistrés dans le mois</p>
                <div class="chips">
                  <v-chip color="info">
                    <v-icon left>mdi-human-female</v-icon>
                    {{ collectionData.nuveaux_membres_mois_girls }}</v-chip
                  >

                  <v-chip color="info" class="mx-2">
                    <v-icon left>mdi-human-male</v-icon>
                    {{ collectionData.nuveaux_membres_mois_boys }}</v-chip
                  >
                </div>
              </li>
              <li class="list-item">
                <p>Membres actuels inscrits</p>
                <div class="chips">
                  <v-chip color="info">
                    <v-icon left>mdi-human-female</v-icon>
                    {{ collectionData.membres_actuel_inscrits_girls }}</v-chip
                  >

                  <v-chip color="info" class="mx-2">
                    <v-icon left>mdi-human-male</v-icon>
                    {{ collectionData.membres_actuel_inscrits_boys }}</v-chip
                  >
                </div>
              </li>
              <li class="list-item">
                <p>
                  Membres présents en réunion à la date de collecte de données
                </p>
                <div class="chips">
                  <v-chip color="info">
                    <v-icon left>mdi-human-female</v-icon>
                    {{
                      collectionData.membres_present_en_reunion_girls
                    }}</v-chip
                  >

                  <v-chip color="info" class="mx-2">
                    <v-icon left>mdi-human-male</v-icon>
                    {{ collectionData.membres_present_en_reunion_boys }}</v-chip
                  >
                </div>
              </li>
            </ul>
          </v-col>
        </v-row>
      </div>
      <div class="data-card">
        <v-row wrap justify="center" align="center">
          <v-col cols="12" md="4" class="titler">
            <h2 class="card-title">Epargnes</h2>
          </v-col>
          <v-col cols="12" md="8" class="contents">
            <ul class="list-container">
              <li class="list-item">
                <p>Montant minimum épargné chaque mois dans le groupe (Frw)</p>
                <div class="chips">
                  <v-chip color="info">
                    {{
                      collectionData.groups.montant_minimum_epargne_chaque_mois
                    }}</v-chip
                  >
                </div>
              </li>
              <li class="list-item">
                <p>Montant maximal épargné chaque mois dans le groupe (Frw)</p>
                <div class="chips">
                  <v-chip color="info">
                    {{
                      collectionData.groups.montant_maximal_epargne_chaque_mois
                    }}</v-chip
                  >
                </div>
              </li>
              <li class="list-item">
                <p>
                  Valeur totale de l’épargne réalisée au cours de la
                  période/mois (Frw)
                </p>
                <div class="chips">
                  <v-chip color="info">
                    {{
                      collectionData.epargne.valeur_total_epargne_realise_mois
                    }}
                    RWF</v-chip
                  >
                </div>
              </li>
              <li class="list-item">
                <p>Moyenne de l’épargne par membre (Frw)</p>
                <div class="chips">
                  <v-chip color="#27AE60" class="white--text">
                    {{ moyenneEpargne }}
                    RWF</v-chip
                  >
                </div>
              </li>
            </ul>
          </v-col>
        </v-row>
      </div>
      <div class="data-card">
        <v-row wrap justify="center" align="center">
          <v-col cols="12" md="4" class="titler">
            <h2 class="card-title">Crédits internes</h2>
          </v-col>
          <v-col cols="12" md="8" class="contents">
            <ul class="list-container">
              <li class="list-item">
                <p>
                  Membres ayant contracté un crédit dans le groupe au cours de
                  la période/mois
                </p>
                <div class="chips">
                  <v-chip color="info">
                    <v-icon left>mdi-human-female</v-icon>
                    {{
                      collectionData.credit.membres_contracte_un_credit_girls
                    }}</v-chip
                  >
                  <v-chip color="info" class="mx-1">
                    <v-icon left>mdi-human-male</v-icon>
                    {{
                      collectionData.credit.membres_contracte_un_credit_boys
                    }}</v-chip
                  >
                </div>
              </li>
              <li class="list-item">
                <p>
                  Nombre total de crédits octroyés au cours de la période/mois
                </p>
                <div class="chips">
                  <v-chip color="info">
                    {{ collectionData.credit.nombres_total_credit_actroyes }}
                  </v-chip>
                </div>
              </li>
              <li class="list-item">
                <p>
                  Valeur des crédits octroyés (capital) au cours de la
                  période/mois
                </p>
                <div class="chips">
                  <v-chip color="info">
                    {{
                      collectionData.credit.valeur_de_credit_actroyes_capital
                    }}
                    RWF
                  </v-chip>
                </div>
              </li>
              <li class="list-item">
                <p>Moyenne du montant par crédit contracté (Frw)</p>
                <div class="chips">
                  <v-chip color="info"> {{ montPerCredit }} RWF </v-chip>
                </div>
              </li>
              <li class="list-item">
                <p>
                  Valeur des intérêts sur les crédits octroyés au cours de la
                  période/mois (Frw)
                </p>
                <div class="chips">
                  <v-chip color="info">
                    {{
                      collectionData.credit
                        .valeur_des_interets_sur_credit_actroyes | num
                    }}
                    RWF
                  </v-chip>
                </div>
              </li>
              <li class="list-item">
                <p>
                  Valeur totale des crédits (capital+ intérêts) au cours de la
                  période/mois (Frw)
                </p>
                <div class="chips">
                  <v-chip color="info">
                    {{
                      collectionData.credit.valeur_de_credit_actroyes_capital +
                      collectionData.credit.nombres_total_credit_actroyes
                    }}
                    RWF
                  </v-chip>
                </div>
              </li>
              <li class="list-item-special">
                <h3>Remboursement des crédits au cours de la période/mois</h3>
              </li>
              <li class="list-item">
                <p>
                  Valeur des crédits remboursés (capital) au cours de la
                  période/mois
                </p>
                <div class="chips">
                  <v-chip color="primary">
                    {{
                      collectionData.rebursed.valeur_de_credit_rembourse_capital
                        | num
                    }}
                    RWF
                  </v-chip>
                </div>
              </li>
              <li class="list-item">
                <p>
                  Valeur des intérêts sur les crédits remboursés au cours de la
                  période/mois
                </p>
                <div class="chips">
                  <v-chip color="primary">
                    {{
                      collectionData.rebursed
                        .valeur_des_interets_sur_credit_rembourse | num
                    }}
                    RWF
                  </v-chip>
                </div>
              </li>
              <li class="list-item">
                <p>
                  Valeur total des crédits remboursés (capital + intérêts) au
                  cours de la période/mois
                </p>
                <div class="chips">
                  <v-chip color="primary">
                    {{ totalReb | num }}
                    RWF
                  </v-chip>
                </div>
              </li>
              <li class="list-item">
                <p>
                  Valeur des crédits (capital) restant à rembourser à la fin de
                  la période/mois
                </p>
                <div class="chips">
                  <v-chip color="primary">
                    {{
                      collectionData.rebursed
                        .valeur_des_credit_capital_restant_rembourse_fin | num
                    }}
                    RWF
                  </v-chip>
                </div>
              </li>
              <li class="list-item">
                <p>
                  Valeur des intérêts aux crédits restant à rembourser à la fin
                  de la période/mois
                </p>
                <div class="chips">
                  <v-chip color="primary">
                    {{ totalCredit | num }}
                    RWF
                  </v-chip>
                </div>
              </li>
              <li class="list-item">
                <p>Valeur des crédits en retard (capital + intérêts)</p>
                <div class="chips">
                  <v-chip color="primary">
                    {{
                      collectionData.rebursed.valeur_des_credit_en_retard | num
                    }}
                    RWF
                  </v-chip>
                </div>
              </li>
            </ul>
          </v-col>
        </v-row>
      </div>

      <div class="data-card">
        <v-row wrap justify="center" align="center">
          <v-col cols="12" md="4" class="titler">
            <h2 class="card-title">Relations avec institutions financières</h2>
          </v-col>
          <v-col cols="12" md="8" class="contents">
            <ul class="list-container">
              <li class="list-item-special">
                <h3>
                  Relations des membres des groupes avec les institutions
                  financières
                </h3>
              </li>
              <li class="list-item">
                <p>
                  Membres ayant ouvert un compte bancaire durant la période/mois
                </p>
                <div class="chips">
                  <v-chip color="info">
                    {{
                      collectionData.relation.membres_ouvert_compte_bancaire
                    }}</v-chip
                  >
                </div>
              </li>
              <li class="list-item">
                <p>
                  Valeur des crédits bancaires contractés au cours de la
                  période/mois
                </p>
                <div class="chips">
                  <v-chip color="info">
                    {{
                      collectionData.relation.membres_contracte_credit_bancaire
                    }}</v-chip
                  >
                </div>
              </li>
              <li class="list-item">
                <p>
                  Montant des crédits bancaires contractés par les groupes au
                  cours de la période/mois (Frw)
                </p>
                <div class="chips">
                  <v-chip color="info">
                    {{
                      collectionData.relation
                        .montant_de_credit_bancaire_contracte | num
                    }}
                    RWF</v-chip
                  >
                </div>
              </li>
            </ul>
          </v-col>
        </v-row>
      </div>
      <div class="data-card">
        <v-row wrap justify="center" align="center">
          <v-col cols="12" md="4" class="titler">
            <h2 class="card-title">Caisse d’entraide</h2>
          </v-col>
          <v-col cols="12" md="8" class="contents">
            <ul class="list-container">
              <li class="list-item">
                <p>
                  Valeur des entrées dans la caisse d’entraide au cours de la
                  période/mois
                </p>
                <div class="chips">
                  <v-chip color="info">
                    {{ collectionData.entraide.valeur_entrees | num }}
                    RWF</v-chip
                  >
                </div>
              </li>
              <li class="list-item">
                <p>
                  Valeur des sorties dans la caisse d’entraide au cours de la
                  période/mois
                </p>
                <div class="chips">
                  <v-chip color="info">
                    {{ collectionData.entraide.valeur_sorties | num }}
                    RWF</v-chip
                  >
                </div>
              </li>
              <li class="list-item">
                <p>Membres soutenus au cours de la période / mois</p>
                <div class="chips">
                  <v-chip color="info">
                    {{ collectionData.entraide.membres_soutenus | num }}</v-chip
                  >
                </div>
              </li>
            </ul>
          </v-col>
        </v-row>
      </div>
      <div class="data-card">
        <v-row wrap justify="center" align="center">
          <v-col cols="12" md="4" class="titler">
            <h2 class="card-title">Pénalités / amandes</h2>
          </v-col>
          <v-col cols="12" md="8" class="contents">
            <ul class="list-container">
              <li class="list-item">
                <p>Membres punis au cours de la période / mois</p>
                <div class="chips">
                  <v-chip color="info">
                    {{ collectionData.penalites.Membres_punis | num }}</v-chip
                  >
                </div>
              </li>
              <li class="list-item">
                <p>
                  Montant des pénalités payées (Frw) au cours de la période /
                  mois
                </p>
                <div class="chips">
                  <v-chip color="info">
                    {{
                      collectionData.penalites.Montant_des_penalites_payees
                        | num
                    }}
                    RWF</v-chip
                  >
                </div>
              </li>
            </ul>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Caisse from "@/views/dashboard/raports/bank.vue";
export default {
  name: "single-collection",
  props: ["colid"],

  components: {
    "caisse-bank": Caisse,
  },

  computed: mapState({
    collectionData: (state) => state.collectionData,
    moyenneEpargne: (state) => state.moyenneEpargne,
    montPerCredit: (state) => state.montPerCredit,
    tauxInterets: (state) => state.group.tauxInterets,
    totalReb: (state) => state.totalReb,
    totalCredit: (state) => state.totalCredit,
    colData: (state) => state.colData
  }),

  mounted() {
    this.getInfo();
  },

  methods: {
    getInfo() {
      this.$store.dispatch("collectionGet", this.colid);
    },
  },
};
</script>

<style lang="scss" scoped>
.titler {
  background: linear-gradient(
    97.85deg,
    #2eae64 15.25%,
    rgba(11, 255, 79, 0.64) 96.1%
  );
  border-radius: 14px 0px 0px 20px;
  height: 100px;
  border: 1px solid rgb(135, 255, 171);
  padding: auto;
  text-align: center;
  display: flex;
  justify-content: center;
  margin-right: -4px;
}

.titler .card-title {
  margin: auto;
  color: rgb(71, 71, 71);
}
.data-card {
  margin-top: 26px;
}

.contents {
  background: #ffffff;
  // min-height: 300px;
  border-radius: 14px;
  border: 1px solid rgb(135, 255, 171);
  box-shadow: -1px 10px 16px 1px #e5e5e5;
}

.coltitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto;
}
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  min-height: 60px;
  padding: 4px;
  overflow: hidden;
  color: rgb(0, 0, 0);
  border-bottom: 1px solid rgb(230, 230, 230);
}
.list-item-special {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 95%;
  min-height: 60px;
  padding: 10px;
  overflow: hidden;
  text-align: center;
  border-radius: 4px;
  background: linear-gradient(
    112.64deg,
    #27ae60 35.28%,
    rgba(11, 255, 79, 0.64) 90.56%
  );
}

.container {
  padding: 34px;
}

.chips {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
}
</style>