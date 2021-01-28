<template>
  <v-sheet :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`">
    <v-skeleton-loader class="mx-auto" :type="type"></v-skeleton-loader>
  </v-sheet>
</template>

<script>

export default {
  inject: {
    theme: {
      default: { isDark: false },
    },
  },
  props: ["type"]
};
</script>