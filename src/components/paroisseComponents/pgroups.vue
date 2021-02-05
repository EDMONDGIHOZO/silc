<template>
  <div class="container">
    <div class="info-card" v-if="pData.loaded">
      <div class="info-card-title">
        <h3>LIST DE GROUPES DANS LE PAROISSE</h3>
      </div>
      <div class="info-card-container">
        <v-simple-table height="300px" fixed-header>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Garcons</th>
                <th class="text-left">Filles</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in parGroups" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.initial_boys_number }}</td>
                <td>{{ item.initial_girls_number }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from "vuex";
export default {
  name: "pgroupes",
  computed: mapState(["parGroups", "pData"]),
};
</script>
<style lang="scss" scoped>
.info-card {
  min-height: 425px;
  overflow: hidden;
}
</style>
