<template>
  <div class="container">
    <div class="title-container">
      <h4 class="my-3">Tous les Dioceses</h4>
      <v-btn color="success" router to="/create/diocese" rounded depressed
        ><v-icon>mdi-plus</v-icon> nouvelle</v-btn
      >
    </div>
    <div class="top-list-container">
      <v-row wrap align-content="center" no-gutters v-if="diocese.loaded">
        <v-col cols="12">
          <v-sheet class="mx-auto" max-width="900">
            <v-slide-group multiple show-arrows>
              <v-slide-item v-for="dio in diocese.data" :key="dio.id">
                <v-btn
                  class="mx-2"
                  :input-value="active"
                  active-class="purple white--text"
                  depressed
                  rounded
                  @click="getDiocese(dio.id), active"
                >
                  {{ dio.name }}
                </v-btn>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
      </v-row>
      <div class="loading-container" v-else>
        <skeleton-loader class="mx-3" type="chip" v-for="n in 6" :key="n" />
      </div>
    </div>
    <v-row wrap class="my-5">
      <v-col cols="12">
        <simple-table v-if="diocese.loaded" :headers="headers" />
        <skeleton-loader type="table-tbody, table-thead" v-else />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SimbpleTable from "@/components/helpers/simpleTable.vue";
import Loading from "@/components/layouts/loaders.vue";
import { mapState } from "vuex";
export default {
  name: "all-dioceses",
  data: () => ({
    model: null,
    active: false,
    toggle_exclusive: undefined,
    headers: [
      { title: "Nom de paroisse", id: 1 },
      { title: "Nombre de groupes", id: 2 },
      {title: "Actions", id: 3}
    ],
  }),

  computed: {
    ...mapState(["diocese"]),
  },

  mounted() {
    this.$store.dispatch("getDioceses");
  },

  methods: {
    getDiocese(dio_id) {
      this.$store.dispatch("getDiocese", dio_id);
    },
  },

  components: {
    "simple-table": SimbpleTable,
    "skeleton-loader": Loading,
  },
};
</script>

<style lang="scss" scoped>
.loading-container {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
</style>