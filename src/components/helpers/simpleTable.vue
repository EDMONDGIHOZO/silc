<template>
  <div class="table-container">
    <v-simple-table fixed-header v-if="!empty">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Nom</th>
            <th class="text-left">Total Groupes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.calories }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <div class="empty" v-else>
      <v-icon large class="ma-5">mdi-cursor-default-click</v-icon>
      <h4>sélectionnez le diocèse ci-dessus pour afficher ses paroisses ici</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "tables",
  data: () => ({
    empty: true,
  }),
};
</script>