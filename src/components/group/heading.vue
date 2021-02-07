<template>
  <div class="container" v-if="gData.loaded">
    <div class="title-container">
      <h2 class="primary--text display-1 font-weight-bold">
        GROUPE | UBUMANZI
      </h2>
    </div>
    <div class="details-container">
      <v-row wrap>
        <v-col cols="12">
          <ul class="details">
            <li class="detail">
              <strong> Création </strong>
              <p class="grey--text">
                Le {{ basicDetails.created | formatDate }}
              </p>
            </li>
            <li class="detail">
              <strong> Diocese </strong>
              <p class="grey--text">{{ basicDetails.diocese }}</p>
            </li>
            <li class="detail">
              <strong> Paroisse </strong>
              <p class="grey--text">{{ basicDetails.paroisse }}</p>
            </li>
            <li class="detail">
              <strong> Nombres de membres </strong>
              <v-chip color="primary">{{
                basicDetails.membres.girls + basicDetails.membres.boys
              }}</v-chip>
              <p class="grey--text">
                <span> {{ basicDetails.membres.girls }} Filles et  </span>
                <span>{{ basicDetails.membres.boys }} Garçons </span>
              </p>
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
  name: "grouphead",
  computed: mapState({
    gData: (state) => state.group.gData,
    basicDetails: (state) => state.group.basicDetails,
  }),
};
</script>    


<style lang="scss" scoped>
.details {
  background: #f8f8f8;
  box-shadow: 2px 3px 7px 2px rgba(88, 88, 88, 0.16);
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
  font-size: 20px;
  font-weight: bold;
}
</style>