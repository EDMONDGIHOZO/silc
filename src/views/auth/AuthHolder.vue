<template>
  <div class="container">
    <div class="forms-container">
      <v-card
        class="mx-auto pa-5"
        max-width="440"
        min-height="380"
        id="auth-card"
      >
        <router-view></router-view>
      </v-card>
    </div>

    <div class="app-info">
      <div class="details pa-4">
        <v-img :src="logo" width="340" alt="SILC-LOGO"></v-img>
      </div>
      <div class="details-text pa-4">
        <p>
          Gestion de donnees du programe d’encadrement des jeunes vulnerables
          dans les group <b>SILC</b>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    logo() {
      return this.$store.state.logo;
    },
  },
};
</script>