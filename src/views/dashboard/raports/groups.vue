<template>
  <div class="container">
    <div class="contents">
      <div class="main-title">
        <h2>TOUS LES GROUPES</h2>
        <v-spacer></v-spacer>
        <v-btn color="success" router to="/create/groupe"
          ><v-icon left>mdi-plus</v-icon> Nouveau
        </v-btn>
      </div>
      <div class="cdata" v-if="loaded">
        <div class="searcher">
          <v-text-field
            label="chercher par Nom"
            v-model="search"
            outlined
            filled
            dense
            class="my-4"
          >
          </v-text-field>
        </div>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Nom
                </th>
                <th class="text-left">
                  Code
                </th>
                <th class="text-left">
                  Diocese
                </th>
                <th class="text-left">
                  Paroisse
                </th>
                <th class="text-left">
                  Date de creation
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in filteredGroups"
                :key="item.id"
                @click="viewGroup(item.id)"
              >
                <td>{{ item.name }}</td>
                <td>{{ item.group_code }}</td>
                <td>
                  <strong v-if="item.diocese !== null">{{
                    item.diocese.name
                  }}</strong>
                  <strong class="red--text" v-else>Introuvable</strong>
                </td>
                <td>
                  <strong v-if="item.paroisse !== null">{{
                    item.paroisse.name
                  }}</strong>
                  <strong class="red--text" v-else>Introuvable</strong>
                </td>
                <td>{{ item.Date_de_creation | formatDate }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
      <div class="loading ma-5" v-else>
        <v-skeleton-loader class="mx-auto" type="table"></v-skeleton-loader>
      </div>
    </div>
  </div>
</template>

<script>
import ActionsService from "@/services/actions.service";
export default {
  name: "groupes",
  data() {
    return {
      groupes: [],
      loaded: false,
      search: "",
    };
  },
  mounted() {
    this.getGroupes();
  },

  computed: {
    filteredGroups: function() {
      return this.groupes.filter((groupe) => {
        let keys = groupe.name.toLowerCase();
        let keyword = this.search.toLowerCase();
        return keys.match(keyword);
      });
    },
  },

  methods: {
    getGroupes() {
      ActionsService.getGroups().then((response) => {
        if (response.statusText === "OK") {
          this.groupes = response.data.data;
          this.loaded = true;
        } else {
          alert("data not found");
        }
      });
    },

    viewGroup(id) {
      const groupId = id;
      return this.$router.push({
        name: "group-view",
        params: { groupId: groupId },
      });
    },
  },
};
</script>

<style scoped>
.main-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}
</style>
