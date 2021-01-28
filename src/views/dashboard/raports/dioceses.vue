<template>
  <div class="container">
    <div class="title-bar"><h4 class="my-3">Tous les dioceses</h4></div>
    <div class="top-list-container">
      <v-row wrap align-content="center" no-gutters v-if="diocese.loaded">
        <v-col cols="12">
          <v-sheet class="mx-auto" max-width="900">
            <v-slide-group multiple show-arrows>
              <v-slide-item
                v-for="dio in diocese.data"
                :key="dio.id"
                v-slot="{ active, toggle }"
              >
                <v-btn
                  class="mx-2"
                  :input-value="active"
                  active-class="purple white--text"
                  depressed
                  rounded
                  @click="toggle"
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
        <simple-table v-if="diocese.loaded" />
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
  }),

  computed: {
    ...mapState(["diocese"]),
  },

  mounted() {
    this.$store.dispatch("getDioceses");
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