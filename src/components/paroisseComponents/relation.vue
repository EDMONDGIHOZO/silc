<template>
  <div class="resume-card-container">
    <div class="info-card" v-if="pData.loaded">
      <h3 class="info-card-title">Relations avec institution financiels</h3>
      <div class="info-card-container">
        <v-row wrap>
          <v-col cols="6">
            <p class="number">{{ relations.membres }}</p>
            <p class="titled">Membres ayant ouvert un compte bancaire</p>
          </v-col>
          <v-col cols="6" class="col2">
            <p class="number">{{ relations.groupes }}</p>
            <p class="titled">Groupes ayant ouvert un compte bancaire</p>
          </v-col>
        </v-row>
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

  computed: mapState(["relations", "pData"]),
};
</script>


<style lang="scss" scoped>
.info-card-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
}
.number {
  font-weight: 600;
  font-size: 50px;
  line-height: 45px;
  margin-bottom: 10px;
  /* identical to box height */
  text-align: center;
  color: #666565;
}
.titled {
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  text-align: right;
  color: #119f4a;
  margin-top: 20px;
}
.col2 {
  border-left: solid 1px rgb(221, 221, 221);
}

.col2 .titled {
  text-align: left;
}
.info-card {
  height: 350px;
}
</style>