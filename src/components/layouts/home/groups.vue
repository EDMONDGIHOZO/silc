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
          <tr v-for="item in info" :key="item.id">
            <td class="text-left">{{ item.name }} ({{item.group_code}})</td>
            <td>{{ item.collections[0].membres_actuel_inscrits_girls + item.collections[0].membres_actuel_inscrits_boys }}</td>
            <td class="text-right">{{ item.collections[0].collection_date | formatDate }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-btn color="success" rounded depressed>plus sur les groupes</v-btn>
  </div>
</template>

<script>
export default {
  props: ["info"],
  data() {
    return {
      desserts: [
        {
          name: "Frozen Yogurt",
          girls: 159,
          boys: 159,
        },
        {
          name: "Ice cream sandwich",
          girls: 237,
          boys: 44,
        },
        {
          name: "Eclair",
          girls: 262,
          boys: 159,
        },
        {
          name: "Cupcake",
          girls: 305,
          boys: 400,
        },
        {
          name: "Gingerbread",
          girls: 356,
          boys: 40,
        },
        {
          name: "Jelly bean",
          girls: 375,
          boys: 40,
        },
        {
          name: "Lollipop",
          girls: 392,
          boys: 40,
        },
      ],
    };
  },
};
</script>