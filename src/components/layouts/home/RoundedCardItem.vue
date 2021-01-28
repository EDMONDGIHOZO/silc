<template>
  <div class="card-item-container">
    <v-card :color="color" rounded-xl elevation="0" class="info-card">
      <v-card-title class="white--text"> {{ title }} </v-card-title>
      <v-card-text>
        <h3>{{ number }}</h3>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "cardItem",
  props: ["title", "number", "color"],
};
</script>

<style scoped>
.info-card {
  border-radius: 10px;
}

.info-card {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
h3 {
  font-weight: bold;
  font-size: 30px;
  line-height: 36px;
  /* identical to box height */
  color: #ffffff;
  text-align: center;
}
</style>
