<template>
  <div class="container">
    <div class="title-container">
      <h3 v-if="loaded" class="text-uppercase display-1 primary--text font-weight-bold">PAROISSE DE {{ pData.name }}</h3>
      <data-loaders type="text@3" v-else />
    </div>
    <v-row wrap justifycenter>
      <v-col cols="12" md="4">
        <resume v-if="loaded" />
        <data-loaders v-else type="card" />
      </v-col>
      <v-col cols="12" md="4">
        <taux-participation v-if="loaded" />
        <data-loaders v-else type="card" />
      </v-col>
      <v-col cols="12" md="4">
        <relation v-if="loaded" />
        <data-loaders v-else type="card" />
      </v-col>
    </v-row>
    <v-row wrap justifycenter class="my-5">
      <v-col cols="12" md="8">
        <paroisse-groupes v-if="loaded" />
        <data-loaders v-else type="card" />
      </v-col>
      <v-col cols="12" md="4">
        <membres v-if="loaded" />
        <data-loaders v-else type="card" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Resume from "@/components/paroisseComponents/resume.vue";
import TauxParticipation from "@/components/paroisseComponents/tauxParticipation.vue";
import Relation from "@/components/paroisseComponents/relation.vue";
import Pgroups from "@/components/paroisseComponents/pgroups.vue";
import Membres from "@/components/paroisseComponents/membres.vue";
import Loading from "@/components/layouts/loaders.vue";
import { mapState } from "vuex";

export default {
  name: "paroisse",
  props: ["parid"],
  data: () => ({
    loaded: true,
  }),
  components: {
    resume: Resume,
    relation: Relation,
    membres: Membres,
    "data-loaders": Loading,
    "paroisse-groupes": Pgroups,
    "taux-participation": TauxParticipation,
  },
  computed: {
    ...mapState(["pData"]),
  },

  mounted() {
    this.getParoisse();
  },

  methods: {
    // fetch data for all components
    getParoisse() {
      return this.$store.dispatch("getPar", this.parid);
    },
  },
};
</script>