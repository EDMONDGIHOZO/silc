<template>
  <div class="container">
    <div class="title-container">
      <h2 class="primary--text font-weight-bold">GROUPE | {{ name }}</h2>
    </div>
    <div class="details-container">
      <v-row wrap>
        <v-col cols="12">
          <ul class="details">
            <li class="detail">
              <strong> Création </strong>
              <p class="grey--text">Le {{ creationDate | formatDate }}</p>
            </li>
            <li class="detail">
              <strong> Diocese </strong>
              <p class="grey--text">{{ diocese }}</p>
            </li>
            <li class="detail">
              <strong> Paroisse </strong>
              <p class="grey--text">{{ paroisse }}</p>
            </li>
            <li class="detail">
              <v-badge bordered color="info" :content="totalMembers" overlap>
                <strong> Nombres de membres </strong>
              </v-badge>
              <p class="grey--text">
                <span> {{ girls }} Filles et </span>
                <span>{{ boys }} Garçons </span>
              </p>
            </li>
            <li class="detail">
              <strong> Date de début d’épargne du cycle actuel </strong>
              <p class="grey--text">{{ startDuCycle | formatDate }}</p>
            </li>
            <li class="detail">
              <strong> Date probable de fin du cycle actuel </strong>
              <p class="grey--text">{{ finDuCycle | formatDate }}</p>
            </li>
            <li class="detail">
              <strong> Nombre de mois passés du cycle actuel </strong>
              <p class="grey--text">{{ startDuCycle | passedFormat }}</p>
            </li>
            <li class="detail">
              <strong> Durée maximale convenue de crédit (mois) </strong>
              <p class="grey--text">{{ maxDuree }}</p>
            </li>
            <li class="detail">
              <strong> Taux d’intérêt mensuel du crédit </strong>
              <p class="grey--text">{{ taux }}</p>
            </li>
          </ul>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "grouphead",
  props: [
    "name",

    "creationDate",
    "diocese",
    "paroisse",
    "totalMembers",
    "girls",
    "boys",
    "finDuCycle",
    "startDuCycle",
    "maxDuree",
    "taux",
  ],
};
</script>

<style lang="scss" scoped>
.details {
  background: #f5f5f5;
  border-radius: 5px;
  width: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
}


.detail p {
  font-size: 14px;
  font-weight: bold;
}

.detail strong {
  font-size: 14px;
}
</style>
