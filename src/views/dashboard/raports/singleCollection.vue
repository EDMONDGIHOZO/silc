<template>
  <div class="container">
    <div class="coltitle">
      <h1 class="primary--text">
        COLLECTION DE - {{ collectionData.collection_date | formatDate }}
      </h1>
    </div>
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
                <p>Valeur totale de l’épargne réalisée au cours de la période/mois (Frw)</p>
                <div class="chips">
                  <v-chip color="info">
                    600 RWF</v-chip
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
export default {
  name: "single-collection",
  props: ["colid"],

  computed: mapState({
    collectionData: (state) => state.collectionData,
    tauxInterets: (state) => state.group.tauxInterets,
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
  background: rgb(135, 255, 171);
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
  min-height: 300px;
  border-radius: 14px;
  border: 1px solid rgb(135, 255, 171);
  box-shadow: -1px 10px 16px 1px #e5e5e5;
}

.coltitle {
  text-align: center;
  margin: 30px auto;
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

.container {
  padding: 34px;
}
</style>