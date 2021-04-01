<template>
  <div class="collection-component">
    <div class="contents">
      <div class="cont-title">
        <p>
          Membres du groupe
        </p>
      </div>
      <div>
        <ul class="comp-data">
          <li>
            <div class="ctitle">
              Membres inscrits dans le mois précédent
            </div>
            <v-spacer></v-spacer>
            <div class="cdata">
              <v-chip color="primary" label class="mx-3"
                ><v-icon>mdi-human-female</v-icon> {{ prevRegG }}</v-chip
              >
              <v-chip color="primary" label
                ><v-icon>mdi-human-male</v-icon> {{ prevRegB }}</v-chip
              >
            </div>
          </li>
          <li>
            <div class="ctitle">
              Abandons au cours du mois actuel
            </div>
            <v-spacer></v-spacer>
            <div class="cdata">
              <v-chip color="primary" label class="mx-3"
                ><v-icon>mdi-human-female</v-icon> {{ abG }}</v-chip
              >
              <v-chip color="primary" label
                ><v-icon>mdi-human-male</v-icon> {{ abB }}</v-chip
              >
            </div>
          </li>
          <li>
            <div class="ctitle">
              Taux d’abandon mensuel (%)
            </div>
            <v-spacer></v-spacer>
            <div class="cdata">
              <v-chip color="secondary" label>Tot: {{ abmT }} %</v-chip>
              <v-chip color="primary" label class="mx-2"
                ><v-icon>mdi-human-female</v-icon> {{ abmG }}</v-chip
              >
              <v-chip color="primary" label
                ><v-icon>mdi-human-male</v-icon> {{ abmB }}</v-chip
              >
            </div>
          </li>
          <li>
            <div class="ctitle">
              Nouveaux membres enregistrés dans le mois
            </div>
            <v-spacer></v-spacer>
            <div class="cdata">
              <v-chip color="secondary" label>Tot: {{ nmT }} %</v-chip>
              <v-chip color="primary" label class="mx-2"
                ><v-icon>mdi-human-female</v-icon> {{ nmG }}</v-chip
              >
              <v-chip color="primary" label
                ><v-icon>mdi-human-male</v-icon> {{ nmB }}</v-chip
              >
            </div>
          </li>
          <li>
            <div class="ctitle">
              Membres actuels inscrits
            </div>
            <v-spacer></v-spacer>
            <div class="cdata">
              <v-chip color="secondary" label>Tot: {{ nmT }} %</v-chip>
              <v-chip color="primary" label class="mx-2"
                ><v-icon>mdi-human-female</v-icon> {{ nmG }}</v-chip
              >
              <v-chip color="primary" label
                ><v-icon>mdi-human-male</v-icon> {{ nmB }}</v-chip
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "basicInfoView",
  props: [
    "collectionId",
    "prevRegG",
    "prevRegB",
    "abG",
    "abB",
    "abmT",
    "abmG",
    "abmB",
    "nmG",
    "nmB",
    "nmT",
  ],
};
</script>
