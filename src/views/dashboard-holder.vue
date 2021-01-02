<template>
  <div class="main">
    <TopNav />
    <SideMenu />
    <router-view></router-view>
  </div>
</template>
<script>
// @ is an alias to /src
import SideMenu from "@/components/layouts/sidemenu.vue";
import TopNav from "@/components/layouts/topnav.vue";

export default {
  name: "Dashboard",
  components: {
    SideMenu,
    TopNav,
  },
  data: () => ({
    ///
  }),
};
</script>

<style lang="scss" scoped>
.sidemenu {
  top: 0;
  right: 0;
  position: relative;
  z-index: 1;
}
</style>