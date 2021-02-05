<template>
  <div class="resume-card-container">
    <div class="info-card" v-if="pData.loaded">
      <h3 class="info-card-title">résumé sur la paroisse</h3>
      <div class="info-card-container">
        <v-list subheader two-line>
          <v-list-item v-for="res in resumes" :key="res.id">
            <v-list-item-content>
              <v-list-item-title class="info-card-list-title">{{
                res.title
              }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-chip color="primary">
                {{ res.value }}
                 <strong v-if="res.id === 3"> RWF </strong>
              </v-chip>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </div>
    </div>
    <content-loader type="card" v-else />
  </div>
</template>
<script>
import Loading from "@/components/layouts/loaders.vue";
import { mapState } from "vuex";
export default {
  props: ["pid"],
  components: {
    "content-loader": Loading,
  },

  computed: {
    ...mapState(["resumes", "pData"]),
  },
};
</script>


<style lang="scss" scoped>
.info-card-container {
  height: 295px;
}
</style>