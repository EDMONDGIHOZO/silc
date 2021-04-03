<template>
  <div class="collection-component">
    <div class="contents" v-if="info !== null">
      <div class="cont-title">
        <p>Caisse d’entraide</p>
      </div>
      <div>
        <ul class="comp-data">
          <li>
            <div class="ctitle">
              Valeur des entrées dans la caisse d’entraide au cours de la
              période/mois
            </div>
            <v-spacer></v-spacer>
            <div class="cdata">
              <v-chip color="primary" small label>
                {{ info.valeur_entrees }} FRW
              </v-chip>
            </div>
          </li>
          <li>
            <div class="ctitle">
              Valeur des sorties dans la caisse d’entraide au cours de la
              période/mois
            </div>
            <v-spacer></v-spacer>
            <div class="cdata">
              <v-chip color="primary" small label>
                {{ info.valeur_sorties }} FRW
              </v-chip>
            </div>
          </li>
          <li>
            <div class="ctitle">
              Membres soutenus au cours de la période / mois
            </div>
            <v-spacer></v-spacer>
            <div class="cdata">
              <v-chip color="primary" small label>
                {{ info.membres_soutenus }} FRW
              </v-chip>
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
  name: "entraide",
  props: ["collectionId", "info"],
};
</script>
