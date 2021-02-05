<template>
  <div class="done">
    <div class="doneTitle">
      <h3>félicitations, les données de ce groupe sont bien collectées!</h3>
    </div>
    <div class="overlay"></div>
    <div class="animated">
      <v-icon large color="white">mdi-check</v-icon>
    </div>
    <v-btn
      color="primary"
      x-large
      min-width="200"
      rounded
      depressed
      class="my-5"
      @click="endCollection"
      >Ferme</v-btn
    >
  </div>
</template>

<script>
export default {
  methods: {
    endCollection() {
      this.$store.commit("endSteps");
      localStorage.removeItem("collectionId");
      localStorage.removeItem("step");
      return this.$router.push({ name: "home" });
    },
  },
};
</script>

<style lang="scss" scoped>
@use "@/assets/styles/base.scss";
.animated {
  width: 100px;
  margin: 30px;
  height: 100px;
  background-color: base.$primary;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: square-to-circle 2s 1s infinite alternate;
  box-shadow: 0px 20px 35px rgba(0, 0, 0, 0.1);
}

.done {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 20px;
  border-radius: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.doneTitle {
  font-size: 24px;
  font-weight: bold;
  color: base.$secondary;
  transform: translateY(-600px);
  animation: 0.4s slideIn ease-in-out forwards 1s;
  z-index: 10;
  opacity: 0;
  position: relative;
}

.doneTitle::before {
  content: "";
  width: 0%;
  height: 76px;
  background-color: var(--secondary-color);
  position: absolute;
  bottom: -10px;
  animation: 1s underline ease-in-out forwards 2s;
  mix-blend-mode: screen;
}

@keyframes square-to-circle {
  0% {
    border-radius: 50% 20% 50% 30%;
    background: base.$primary;
    transform: rotate(0deg);
  }
  25% {
    border-radius: 50% 40% 20% 50%;
    background: rgb(250, 195, 44);
    transform: rotate(45deg);
  }
  50% {
    border-radius: 50% 50% 20% 50%;
    background: base.$primary;
    transform: rotate(90deg);
  }
  75% {
    border-radius: 50% 50% 50% 20%;
    background: base.$primary;
    transform: rotate(135deg);
  }
  100% {
    border-radius: 50%;
    background: rgb(250, 195, 44);
    transform: rotate(180deg);
  }
}

.overlay {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  opacity: 0;
  left: 0;
  right: 0;
  transform: scale(0.5);
  animation: 0.5s slideIn ease-in-out forwards, 1s skewBg ease-in-out;
}

@keyframes skewBg {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes underline {
  100% {
    width: 100%;
  }
}

@keyframes slideIn {
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>
