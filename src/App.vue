<template>
  <v-app>
    <v-main>
    <keep-alive> 
        <router-view> </router-view>
    </keep-alive>
    </v-main>
  </v-app>
</template>

<script>


export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
<style lang="scss" scoped>
html {
    font-family: 'Oxygen', sans-serif;
}
</style>
