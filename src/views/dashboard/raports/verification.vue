<template>
  <div class="container">
    <div class="verification">
      <h4>verification of the collected data</h4>
    </div>
  </div>
</template>

<script>
import store from "@/store/index";
export default {
  name: "verification",
  mounted() {
    this.moveStep(1);
  },
  methods: {
    moveStep(stepy) {
      store.commit("updateSteps", stepy);
    },
  },
};
</script>
