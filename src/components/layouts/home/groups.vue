<template>
  <div class="stat-container">
    <div class="stat-title-container">
      <h3>Infos membres</h3>
    </div>
    <v-simple-table height="300px" fixed-header>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">code de groupe</th>
            <th class="text-left">membres inscrits</th>
            <th class="text-left">date récente de collecte des données</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in info" :key="item.id" @click="goto(item.id)">
            <td class="text-left">{{ item.name }} ({{ item.group_code }})</td>
            <td>
              {{
                item.collections[0].membres_actuel_inscrits_girls +
                item.collections[0].membres_actuel_inscrits_boys
              }}
            </td>
            <td class="text-left">
              {{ item.collections[0].collection_date | formatDate }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-btn color="success" rounded depressed router to="/groupes"
      >plus sur les groupes</v-btn
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
      return this.$router.push({ name: "group-view", params: { "groupId": id } });
    },
  },
};
</script>


