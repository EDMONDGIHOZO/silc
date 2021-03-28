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

      <div class="contents">
        <v-row wrap>
          <v-col cols="12" md="4" class="info-card">
            <v-card flat v-if="loaded">
              <v-card-title class="card-tit">
                résumé sur la paroisse
              </v-card-title>
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Nombre de groupes</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-avatar>
                    <v-avatar color="primary" size="48">
                      <span class="white--text font-weight-bold">{{
                        nombresGroupes
                      }}</span>
                    </v-avatar>
                  </v-list-item-avatar>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Valeur d epargne</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-avatar>
                    <v-avatar color="primary" size="48">
                      <span class="white--text font-weight-bold">{{
                        nombresGroupes
                      }}</span>
                    </v-avatar>
                  </v-list-item-avatar>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Valeur de credit</v-list-item-title>
                  </v-list-item-content>
                  <v-list-item-avatar>
                    <v-avatar color="primary" size="48">
                      <span class="white--text font-weight-bold">{{
                        nombresGroupes
                      }}</span>
                    </v-avatar>
                  </v-list-item-avatar>
                </v-list-item>
              </v-list>
            </v-card>
            <loading-data type="list-item-two-line" v-else />
          </v-col>
        </v-row>
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
