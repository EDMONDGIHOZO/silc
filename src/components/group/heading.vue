<template>
  <div class="container">
    <div class="title-container">
      <h2 class="primary--text display-1 font-weight-bold">
        GROUPE | {{ name }}
      </h2>
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
              <strong> Nombres de membres </strong>
              <v-chip color="primary">{{ totalMembers }}</v-chip>
              <p class="grey--text">
                <span> {{ girls }} Filles et </span>
                <span>{{ boys }} Garçons </span>
              </p>
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
  ],
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
