<template>
  <div class="container">
    <loading-data type="card" v-if="!loaded" />
    <div class="data" v-else>
      <div class="data">
        <Heading
          :name="groupe.name"
          :creationDate="groupe.Date_de_creation"
          :diocese="groupe.diocese.name"
          :paroisse="groupe.paroisse.name"
          :totalMembers="totalMembers"
          :girls="groupe.initial_girls_number"
          :boys="groupe.initial_boys_number"
          :finDuCycle="groupe.end_date"
          :startDuCycle="groupe.start_date"
          :taux="groupe.monthly_interest"
          :maxDuree="groupe.credit_group_max_time"
        />

        <Reference :collections="collections" />
      </div>
    </div>
  </div>
</template>

<script>
import Heading from "@/components/group/heading.vue";
import Reference from "@/components/group/reference.vue";
import ActionsService from "@/services/actions.service";
import Loading from "@/components/layouts/loaders.vue";
export default {
  name: "single-group",
  props: ["groupId"],
  components: {
    Heading,
    Reference,
    "loading-data": Loading,
  },

  data() {
    return {
      groupe: null,
      collections: null,
      loaded: false,
    };
  },

  mounted() {
    this.getInfo();
  },

  computed: {
    totalMembers() {
      if (this.groupe !== null) {
        let x = parseInt(this.groupe.initial_girls_number);
        let y = parseInt(this.groupe.initial_boys_number);
        let tot = x + y;
        return tot;
      } else {
        return 0;
      }
    },
  },

  methods: {
    getInfo() {
      ActionsService.getSgroup(this.groupId).then((response) => {
        if (response.statusText === "OK") {
          this.groupe = response.data.data;
          this.collections = response.data.data.collections;
          this.loaded = true;
        }
      });
    },
  },
};
</script>
