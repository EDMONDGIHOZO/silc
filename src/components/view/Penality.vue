<template>
  <div class="collection-component">
    <div class="contents">
      <div class="cont-title">
        <p>
          Pénalités / amendes
        </p>
      </div>

      <ul class="comp-data">
        <li>
          <div class="ctitle">
            Membres punis au cours de la période / mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="primary" class="mx-1" small label
              >{{ info.Membres_punis }} FRW</v-chip
            >
          </div>
        </li>
        <li>
          <div class="ctitle">
            Montant des pénalités payées (Frw) au cours de la période / mois
          </div>
          <v-spacer></v-spacer>
          <div class="cdata">
            <v-chip color="primary" class="mx-1" small label
              >{{ info.Montant_des_penalites_payees }} FRW</v-chip
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "penalityView",
  props: ["info"],
};
</script>
