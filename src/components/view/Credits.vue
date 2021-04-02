<template>
  <div class="collection-component">
    <div class="contents">
      <div class="cont-title">
        <p>
          Crédits internes
        </p>
      </div>

      <ul class="comp-data">
        <li>
          <div class="ctitle">
            Membres ayant contracté un crédit dans le groupe au cours de la
            période/mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="primary" small class="mx-2" label
              >F:
              {{ info.credite_girls }}</v-chip
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
            <v-chip color="primary" small label
              >
              {{ info.credite_girls }}</v-chip
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
