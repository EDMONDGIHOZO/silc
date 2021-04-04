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
  },
};
</script>

<style scoped>
.title-container {
  font-size: 25px;
  padding: 20px;
}
</style>
