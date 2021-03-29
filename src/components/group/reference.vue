<template>
  <div class="container">
    <div class="reference">
      <div class="collection">
        <div class="title-container">
          <h3 class="gtitle">
            LISTE DES COLLECTIONS DE DONNÉES RÉALISÉES POUR CE GROUPE
          </h3>
        </div>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Date de collecte de données</th>
                <th class="text-left">collecteur</th>
                <th class="text-left">status</th>
                <th class="text-left">Temps passés du cycle actuel</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in collections" :key="item.id">
                <td class="font-weight-bold">
                  {{ item.collection_date | formatDate }}
                </td>
                <td>{{ item.collector_name }}</td>
                <td>
                  <span
                    :class="item.verified == 1 ? 'primary--text' : 'red--text'"
                    >{{
                      item.verified == 1 ? "verified" : "collection incomplète"
                    }}</span
                  >
                </td>
                <td>
                  <strong>{{ item.collection_date | passedFormat }}</strong>
                </td>
                <td class="actions">
                  <v-btn
                    color="orange"
                    @click="editCollection(item.id)"
                    rounded
                    text
                    small
                    >modifier</v-btn
                  >
                  <v-btn
                    color="info"
                    rounded
                    small
                    @click="viewCollection(item.id)"
                    text
                    >voir plus</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["collections"],
  methods: {
    viewCollection(colid) {
      return this.$router.push({
        name: "single-collection",
        params: { colid },
      });
    },

    editCollection(colid) {
      this.$router.push({ name: "collection-edit", params: { colid: colid } });
    },
  },
};
</script>

<style scoped>
.reference {
  width: 100%;
  background: #ffffff;
  border: 1px solid #c4c4c4;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 12px;
}

.title-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
