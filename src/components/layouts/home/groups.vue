<template>
  <div class="stat-container">
    <div class="stat-title-container">
      <h3>liste de tous les groupes</h3>
    </div>
    <v-simple-table height="300px" fixed-header>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">code de groupe</th>
            <th class="text-left">Interets mensuel</th>
            <th class="text-left">Date de création du groupe</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in info" :key="item.id" @click="goto(item.id)" class="text-left">
            <td>{{ item.name }} ({{ item.group_code }})</td>
            <td >
              {{ item.monthly_interest }}
            </td>
            <td>
              {{ item.Date_de_creation | formatDate }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <!-- <v-simple-table height="300px" fixed-header>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">code de groupe</th>
            <th class="text-left">membres inscrits</th>
            <th class="text-left">date récente de collecte des données</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">ABADAHANA GDFK (sample)</td>
            <td>
              12 34
            </td>
            <td class="text-left">
              12 mars 2020
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table> -->
    <v-btn color="success" rounded depressed router to="/groupes"
      >voir plus</v-btn
    >
  </div>
</template>

<script>
export default {
  props: ["info"],
  data() {
    return {};
  },

  methods: {
    goto(id) {
      return this.$router.push({ name: "group-view", params: { groupId: id } });
    },
  },
};
</script>
