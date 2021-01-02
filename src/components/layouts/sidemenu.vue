<template>
  <v-navigation-drawer v-if="drawer" app color="accent" elevation="2">
    <div class="side-menu">
      <v-sheet color="accent" class="pa-4 logo-container">
        <img :src="sidelogo" alt="" />
        <p class="py-5 grey--text">
          <strong> Gestion de Donnees du programme SILC </strong>
        </p>
      </v-sheet>
      <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" link>
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-btn color="primary" class="logout" depressed min-width="180" rounded>Logout</v-btn>
    </div>
  </v-navigation-drawer>
</template>


<script>
import { mapState } from "vuex";
export default {
  name: "sideMenu",
  data: () => ({
    links: [
        ["mdi-view-dashboard", "DASHBOARD"],
      ["mdi-church", "DIOCESES"],
      ["mdi-christianity-outline", "PAROISSES"],
      ["mdi-account-group", "GROUPES"],
      ["mdi-google-analytics", "RAPPORTS"],
      ["mdi-account-supervisor-circle", "USERS"],
    ],
  }),
  computed: mapState(["sidelogo", "drawer"]),
};
</script>

<style lang="scss" scoped>
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

.logout {
    position: absolute;
    bottom: 0;
    margin: 24px;
}
</style>