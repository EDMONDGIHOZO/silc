<template>
  <div class="collection-component">
    <div class="contents" v-if="info !== null">
      <div class="cont-title">
        <p>Epargnes</p>
      </div>
      <div>
        <ul class="comp-data">
          <li>
            <div class="ctitle">
              Montant minimum épargné chaque mois dans le groupe
            </div>
            <v-spacer></v-spacer>
            <div class="cdata">
              {{ info.period_released_amount }}
              RWF
            </div>
          </li>
          <li>
            <div class="ctitle">
              Montant maximal épargné chaque mois dans le groupe
            </div>
            <v-spacer></v-spacer>
            <div class="cdata">
              {{ info.monthly_max_amount }}
              RWF
            </div>
          </li>
          <li>
            <div class="ctitle">
              Valeur totale de l’épargne réalisée au cours de la période/mois
            </div>
            <v-spacer></v-spacer>
            <div class="cdata">
              {{ info.monthly_max_amount }}
              RWF
            </div>
          </li>
          <li>
            <div class="ctitle">
              Moyenne de l’épargne par membre
            </div>
            <v-spacer></v-spacer>
            <div class="cdata">
              {{ info.epargne_per_member }}
              RWF
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="nullInfo" v-else>
      <div class="notice">
        <strong>
          cette collection n'a pas d'informations sur l'épargne
        </strong>
        <v-btn color="primary" depressed rounded class="my-4">
          <v-icon left>mdi-pencil</v-icon> ajouter ces informations</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "epargneView",
  props: ["collectionId", "info"],
};
</script>
