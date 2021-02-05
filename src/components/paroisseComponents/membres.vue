<template>
  <div class="container">
    <div class="info-card" v-if="pData.loaded">
      <div class="info-card-title">
        <h3>Membres du groupes</h3>
      </div>
      <v-row wrap>
        <v-col cols="12">
          <ul class="det-container">
            <li><h4>Abandons au coul du moi actuel</h4></li>
            <li>
              <div class="det-title">Garcons</div>
              <div class="value">
                <strong>{{ parAbandons.abandoned_boys }} | </strong
                ><span class="grey--text"
                  >{{ parAbandons.boys_percentage }} %</span
                >
              </div>
            </li>
            <li>
              <div class="det-title">Filles</div>
              <div class="value">
                <strong>{{ parAbandons.abandoned_girls }} | </strong
                ><span class="grey--text"
                  >{{ parAbandons.girls_percentage }} %</span
                >
              </div>
            </li>
            <li>
              <v-chip color="primary" label outlined
                >Total |
                <strong class="mx-1">{{
                  parAbandons.total_abandoners
                }}</strong></v-chip
              >
            </li>
          </ul>
          <v-divider class="my-3"></v-divider>
          <ul class="det-container">
            <li><h4>Inscrit au coul du moi actuel</h4></li>
            <li>
              <div class="det-title">Garcons</div>
              <div class="value">
                <strong>{{ inscription.boysInscrits }} | </strong
                ><span class="grey--text"> {{inscription.boysInscritsPercent}} %</span>
              </div>
            </li>
            <li>
              <div class="det-title">Filles</div>
              <div class="value">
                <strong>{{inscription.girlsInscrit}} | </strong><span class="grey--text">{{inscription.girlsInscritsPercent}} %</span>
              </div>
            </li>
            <li>
              <v-chip color="primary" label outlined
                >Total |
                <strong class="mx-1">{{
                  inscription.totalMembers
                }}</strong></v-chip
              >
            </li>
          </ul>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "membres",
  computed: mapState(["parAbandons", "pData", "inscription"]),
};
</script>




<style lang="scss" scoped>
.info-card {
  min-height: 400px;
  background: #f9f9f9;
  border-radius: 21px;
  overflow: hidden;
}

.det-container h4 {
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 15px;
  /* identical to box height */
  text-align: right;
  color: #119f4a;
}

.det-container li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  padding: 10px;
}
</style>
