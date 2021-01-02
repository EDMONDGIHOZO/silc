<template>
  <v-card class="overflow-hidden" flat tile>
    <v-app-bar color="primary" dark>
      <v-app-bar-nav-icon @click="hideDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="!drawer">SILC APP</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y origin="center center" transition="scale-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            light
            v-bind="attrs"
            v-on="on"
            depressed
            rounded
            class="primary--text mx-3"
          >
            <v-icon left color="primary">mdi-plus-thick</v-icon>
            créer
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item
            v-for="(item, index) in topMenu"
            :key="index"
            link
            @click="goto(item.route)"
          >
            <v-list-item-icon>
              <v-icon small>mdi-pencil-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-uppercase">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <Account />
    </v-app-bar>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import Account from "@/components/helpers/account.vue";
export default {
  components: {
    Account,
  },
  data: () => ({
    collapseOnScroll: true,
    topMenu: [
      {
        title: "Data Collection",
        route: "/create/data-collection",
      },
      {
        title: "Diocese",
        route: "/create/diocese",
      },
      {
        title: "Paroisse",
        route: "/create/paroisse",
      },
      {
        title: "groupe",
        route: "/create/groupe",
      },
      {
        title: "User",
        route: "/create/user",
      },
    ],
  }),

  computed: mapState(["drawer"]),

  methods: {
    hideDrawer() {
      this.$store.commit("drawer");
    },

    goto(route) {
      this.$router.push({ path: route });
    },
  },
};
</script>