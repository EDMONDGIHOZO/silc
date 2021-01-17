<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          light
          v-bind="attrs"
          v-on="on"
          depressed
          rounded
          class="primary--text mx-3"
        >
          <v-icon left>mdi-account</v-icon>
          Compte
        </v-btn>
      </template>

      <v-card elevation="2">
        <v-list>
          <v-list-item>
            <v-list-item-avatar color="primary">
              <span class="white--text strong">{{ avatarLetter }}</span>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ UserInfo.username }}</v-list-item-title>
              <v-list-item-subtitle>{{
                UserInfo.role.name
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-action>
              <strong>data collected : 43</strong>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="menu = false" color="red">
            <v-icon left small>mdi-close</v-icon> Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
    avatarLetter: "",
  }),

  mounted() {
      this.$store.dispatch("getUserInfo")
  },

  computed: mapState(["UserInfo"]),
  created() {
    /// get profile avatar
    this.avatarLetter = this.UserInfo.username.charAt(0);
  },
};
</script>
