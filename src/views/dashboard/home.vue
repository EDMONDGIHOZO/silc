<template>
  <div class="container">
    <div class="nothing" v-if="!dataIn">
      <h4 class="display-3">veuillez d'abord créer des données!</h4>
    </div>
    <div class="data" v-else>
      <v-row wrap class="mt-3">
        <v-col cols="12">
          <h3 class="gtitle text-uppercase">Données en synthèse</h3>
        </v-col>
        <v-col cols="12" md="4">
          <roundedCardItem
            :title="dioceses.title"
            :number="dioceses.number"
            :color="dioceses.color"
          />
        </v-col>
        <v-col cols="12" md="4">
          <roundedCardItem
            :title="paroisses.title"
            :number="paroisses.number"
            :color="paroisses.color"
          />
        </v-col>
        <v-col cols="12" md="4">
          <roundedCardItem
            :title="groupes.title"
            :number="groupes.number"
            :color="groupes.color"
          />
        </v-col>
      </v-row>

      <!-- financial information  -->
      <v-row wrap class="mt-5">
        <v-col cols="12" md="4">
          <tiledCardItem
            v-if="loaded"
            :title="creditsActroyes.title"
            :amount="creditsActroyes.amount"
            :icon="creditsActroyes.icon"
          />
          <ContentLoader type="card" v-else />
        </v-col>
        <v-col cols="12" md="4">
          <tiledCardItem
            v-if="loaded"
            :title="epargnes.title"
            :amount="epargnes.amount"
            :icon="epargnes.icon"
          />
          <ContentLoader type="card" v-else />
        </v-col>
        <v-col cols="12" md="4">
          <tiledCardItem
            v-if="loaded"
            :title="grantedCapital.title"
            :amount="grantedCapital.amount"
            :icon="grantedCapital.icon"
          />
          <ContentLoader type="card" v-else />
        </v-col>
      </v-row>

      <!-- statistics information  -->
      <v-row wrap class="my-5">
        <v-col cols="12" md="7">
          <groups :info="groups_info" />
        </v-col>
        <v-col cols="12" md="5">
          <attendence :att_info="attendence" v-if="loaded" />
          <ContentLoader type="image" v-else />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import roundedCardItem from "@/components/layouts/home/RoundedCardItem.vue";
import tiledCardItem from "@/components/layouts/home/TiledCardItem.vue";
import ContentLoader from "@/components/layouts/loaders.vue";
import groups from "@/components/layouts/home/groups.vue";
import attendence from "@/components/layouts/home/attendence.vue";
import ActionsService from "@/services/actions.service";

export default {
  name: "homepage",
  components: {
    roundedCardItem,
    tiledCardItem,
    groups,
    attendence,
    ContentLoader,
  },

  data: () => ({
    loaded: true,
    dataIn: true,
    // dioceses
    dioceses: {
      title: "Dioceses",
      number: 34,
      color: "primary",
    },
    // paroisses
    paroisses: {
      title: "Paroisses",
      number: 21,
      color: "secondary",
    },
    // groupes
    groupes: {
      title: "Groupes",
      number: 64,
      color: "primary",
    },
    // financial informations

    creditsActroyes: {
      title: "credit Actroyes",
      amount: 350000,
      icon: "mdi-assistant",
    },
    epargnes: {
      title: "epargnes",
      amount: 450000,
      icon: "mdi-credit-card-plus",
    },
    grantedCapital: {
      title: "Capital Actroyes",
      amount: 23400,
      icon: "mdi-credit-card-minus",
    },
    // attendence

    attendence: [23, 45],
    groups_info: [],
  }),

  mounted() {
    this.dpg();
    // this.aec();
  },

  methods: {
    // get diocese_paroisse_groupes
    dpg() {
      ActionsService.getDpg().then((response) => {
        if (response.statusText === "OK") {
          const res = response.data;
          this.dioceses.number = res.dioceses.total;
          this.paroisses.number = res.paroisses.total;
          this.groupes.number = res.groupes.total;
        } else {
          alert("an error occured");
        }
      });
    },

    total(items) {
      const total_items = items.reduce((a, b) => a + b);
      return total_items;
    },

    aec() {
      ActionsService.getAec().then((response) => {
        if (response.statusText === "OK") {
          // filter those with non empty collections
          const data = response.data.data;
          this.dataIn = true;
          const filtered = data.filter((col) => col.collections.length > 0);
          // get only collections
          const collections = filtered.map((item) => item.collections);
          // get only des epargnes
          const epargnes = collections.map(
            (item) => item[0].epargne.period_released_amount
          );
          // get the sum of epargnes
          const total_epargnes = this.total(epargnes);
          // attach result to the statuses
          this.epargnes.amount = total_epargnes;

          // get the granteds (actroyes)
          const granted = collections.map(
            (item) => item[0].credit.granted_credit
          );
          // get the sum of epargnes
          const total_granted = this.total(granted);
          // attach result to the statuses
          this.creditsActroyes.amount = total_granted;

          // get the granted capital (actroyes)
          const grantedCapital = collections.map(
            (item) => item[0].credit.granted_capital
          );
          // get the sum of epargnes
          const total_granted_capital = this.total(grantedCapital);
          // attach result to the statuses
          this.grantedCapital.amount = total_granted_capital;

          // get the attendence information
          //** boys */
          const boys = collections.map((item) => item[0].attended_boys);
          const total_boys = this.total(boys);
          //** girls */
          const girls = collections.map((item) => item[0].attended_girls);
          const total_girls = this.total(girls);

          // make the series model
          let serie = function(key) {
            this.key = key;
          };
          const gathered = [];
          gathered[0] = new serie(total_girls);
          gathered[1] = new serie(total_boys);
          let gatheredNumbers = gathered.map((item) => item.key);
          // send props the chart
          this.attendence = gatheredNumbers;

          // ------- send group info to table ------//
          this.groups_info = filtered;

          // show data on screen
          this.loaded = true;
        } else {
          alert("an error occured");
          this.loaded = false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.nothing {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgb(151, 151, 151);
}
</style>
