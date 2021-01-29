<template>
  <div class="table-container">
    <div v-if="singleDiocese.loaded">
      <v-row wrap elevation-1 class="title-bar">
        <v-col cols="12" md="4" class="col1">
          <h3>Diocese de {{ singleDiocese.data.name }}</h3>
          <v-chip class="ma-2" color="primary"
            >{{
              singleDiocese.data.__meta__.total_diocese_groups
            }}
            groups</v-chip
          >
        </v-col>
        <v-col cols="12" md="8" class="col2">
          <v-btn
            color="red"
            class="white--text mx-3"
            depressed
            rounded
            @click="deleteDio(singleDiocese.data.id)"
          >
            <v-icon left>mdi-delete</v-icon>Delete
          </v-btn>
          <dio-edit
            :dioId="singleDiocese.data.id"
            :dioName="singleDiocese.data.name"
          />
        </v-col>
      </v-row>
    </div>
    <v-simple-table fixed-header v-if="singleDiocese.loaded">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left" v-for="header in headers" :key="header.id">
              {{ header.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dio in singleDiocese.data.paroisses" :key="dio.id">
            <td>{{ dio.name }}</td>
            <td>{{ dio.__meta__.total_groups }}</td>
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
import { mapState } from "vuex";
import EditDio from "@/components/creation/dioceseEdit.vue";
export default {
  props: ["headers"],
  name: "tables",
  data: () => ({
    empty: true,
  }),
  components: {
    "dio-edit": EditDio,
  },
  computed: mapState(["singleDiocese"]),

  methods: {
    deleteDio(id) {
      this.$store.dispatch("deleteDiocese", id);
    },
    editDio(id) {
      this.$store.dispatch("editDiocese", id);
    },
  },
};
</script>
<style lang="scss" scoped>
.title-bar {
  padding: 10px;
}
.title-bar .col1 {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.title-bar .col2 {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>