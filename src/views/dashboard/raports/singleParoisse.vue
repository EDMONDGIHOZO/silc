<template>
  <div class="container">
    <div class="paroisse">
      <div class="title-container">
        <h3>
          Paroissse de
          <span class="primary--text" v-if="loaded">
            {{ paroisse.name }}
          </span>
          <loading-data type="card-heading" v-else />
        </h3>
      </div>
      <div class="comp-data" v-if="loaded">
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
                  Date de creation
                </th>
                <th class="text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in paroisse.groups" :key="item.id">
                <td>{{ item.name }}</td>
                <td>{{ item.group_code }}</td>
                <td>{{ item.Date_de_creation | formatDate }}</td>
                <td>
                  <v-btn
                    color="primary"
                    @click="viewGroup(item.id)"
                    small
                    depressed
                    class="white--text mx-3"
                  >
                    <v-icon left small>mdi-eye</v-icon>Ouvrir</v-btn
                  >
                  <v-btn
                    color="danger"
                    @click="deleteGroup(item.id)"
                    small
                    depressed
                    class="white--text"
                  >
                    <v-icon left small>mdi-delete</v-icon> Suprimmer</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
      <loading-data type="table" v-else />
    </div>
  </div>
</template>

<script>
import ActionsService from "@/services/actions.service";
import Loading from "@/components/layouts/loaders.vue";
export default {
  name: "paroisse",
  props: ["parid"],
  data() {
    return {
      loaded: false,
      paroisse: {},
    };
  },

  mounted() {
    this.getParoisseInfo();
  },

  components: {
    "loading-data": Loading,
  },

  computed: {
    nombresGroupes() {
      if (this.loaded) {
        let number = this.paroisse.__meta__.groups_count;
        return number;
      } else {
        return 0;
      }
    },
  },

  methods: {
    getParoisseInfo() {
      ActionsService.getPar(this.parid).then((response) => {
        if (response.statusText === "OK") {
          const data = response.data.data;
          this.paroisse = data;
          this.loaded = true;
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
    deleteGroup(id) {
      ActionsService.deleteGroup(id).then((response) => {
        if (response.data.message === "deleted group") {
          alert("supprimer avec success");
          this.getParoisseInfo();
        } else {
          alert("desole");
        }
      });
    },
  },
};
</script>

<style scoped>
.title-container {
  font-size: 25px;
  padding: 20px;
}
</style>
