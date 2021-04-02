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
              <v-chip color="primary" small label class="mx-3"
                ><v-icon>mdi-human-female</v-icon> {{ prevRegG }}</v-chip
              >
              <v-chip color="primary" small label
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
              <v-chip color="primary" small label class="mx-3"
                ><v-icon>mdi-human-female</v-icon> {{ abG }}</v-chip
              >
              <v-chip color="primary" small label
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
              <v-chip color="secondary" small label>Tot: {{ abmT }} %</v-chip>
              <v-chip color="primary" small label class="mx-2"
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
              <v-chip color="secondary" small label>Tot: {{ nmT }} %</v-chip>
              <v-chip color="primary" small label class="mx-2"
                ><v-icon>mdi-human-female</v-icon> {{ nmG }}</v-chip
              >
              <v-chip color="primary" small label
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
              <v-chip color="secondary" small label
                >Tot: {{ actB + actG }}</v-chip
              >
              <v-chip color="primary" small label class="mx-2"
                ><v-icon>mdi-human-female</v-icon> {{ actG }}</v-chip
              >
              <v-chip color="primary" label
                ><v-icon>mdi-human-male</v-icon> {{ actB }}</v-chip
              >
            </div>
          </li>
          <li>
            <div class="ctitle">
              Membres présents en réunion à la date de collecte de données
            </div>
            <v-spacer></v-spacer>
            <div class="cdata">
              <v-chip color="secondary" small label
                >Tot: {{ prB + prG }}</v-chip
              >
              <v-chip color="primary" small label class="mx-2"
                ><v-icon>mdi-human-female</v-icon> {{ prG }}</v-chip
              >
              <v-chip color="primary" small label
                ><v-icon>mdi-human-male</v-icon> {{ prB }}</v-chip
              >
            </div>
          </li>
          <li>
            <div class="ctitle">
              Taux de participation à la réunion
            </div>
            <v-spacer></v-spacer>
            <div class="cdata">
              <v-chip color="secondary" small label
                >Tot: {{ tauxT }}</v-chip
              >
              <v-chip color="primary" small label class="mx-2"
                ><v-icon>mdi-human-female</v-icon> {{ tauxG }}</v-chip
              >
              <v-chip color="primary" small label
                ><v-icon>mdi-human-male</v-icon> {{ tauxB }}</v-chip
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
    "actG",
    "actB",
    "actT",
    "prB",
    "prG",
    "tauxG",
    "tauxB",
    "tauxT",
  ],
};
</script>
