<template>
  <div class="text-center" v-if="loaded">
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

      <v-card elevation="10">
        <v-list>
          <v-list-item>
            <v-list-item-avatar color="primary">
              <v-img :src="avatar + avatarLetter" alt="userAvatar"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title> {{ username }}</v-list-item-title>
              <v-list-item-subtitle>  {{ role }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="logout">
            <v-icon left small>mdi-logout</v-icon> Logout
          </v-btn>
          <v-btn text @click="menu = false" color="red">
            <v-icon left small>mdi-close</v-icon> Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
    loaded: false,
    role: "",
    username: "",
    avatarLetter: "",
    avatar: "https://ui-avatars.com/api/?name=",
  }),

  methods: {
    addInfo(user) {
      this.username = user.username;
      this.role = user.role.name;
      this.avatarLetter = user.firstname + "+" + user.lastname;
    },
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push({ name: "login" });
      location.reload();
    },
  },
  created() {
    this.$store.dispatch("getUserInfo");
    // fill in the user information
    this.loaded = true;
    let user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) {
      this.addInfo(user);
    }
  },
};
</script>
