<template>
  <div class="container">
    <v-row wrap justify="center">
      <v-col cols="12" md="6" class="loginer">
        <router-view></router-view>
      </v-col>
      <v-col cols="12" md="6" class="intro">
        <div class="logo-container">
          <v-img :src="logo" width="340" alt="SILC-LOGO" class="logo"></v-img>
        </div>
        <div class="text-container">
          <p>
            Gestion de donnees du programe d’encadrement des jeunes vulnerables
            dans les group <strong>SILC</strong>
          </p>
        </div>
      </v-col>
    </v-row>
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

<style lang="scss" scoped>
.intro {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 20px;
}

.logo-container {
  align-items: center;
  position: relative;
}

.text-container {
  text-align: center;
  margin: 50px 30px 30px 30px;
}

.text-container p {
  font-size: 20px;
  font-weight: bold;
  color: rgb(2, 212, 37)
}

.loginer {
  margin: auto 10px;
  max-width: 500px;
  border-radius:20px;
  padding: 20px;
  background-color:#edfff4;
}
</style>