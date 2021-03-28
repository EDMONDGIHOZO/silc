<template>
  <div class="card-item">
    <div class="card-title-bar">
      <p class="card-item-title">{{ title }}</p>
      <span class="icon-container"
        ><v-icon
          large
          class="ma-3"
          :color="`${amount > 100 ? 'primary' : 'red'}`"
          >{{ icon }}</v-icon
        ></span
      >
    </div>
    <div class="card-item-content">
      <p class="card-item-content-text">{{ amount }} FRW</p>
    </div>
  </div>
</template>


<script>
export default {
  name: "tiledCard",
  props: ["title", "amount", "icon"],
};
</script>

<style lang="scss" scoped>
.card-item {
  background: #ffffff;
  box-shadow: 4px 4px 15px -1px rgba(234, 222, 222, 0.53);
  min-height: 120px;
  border-left: solid 5px #20db6b;
  padding: 10px;
}

.card-item-title {
  font-size: 14px;
  line-height: 24px;
  /* identical to box height */
  color: #077031;
}

.card-item-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.card-item-content-text {
  font-weight: bold;
  font-size: 25px;
  line-height: 36px;
  text-align: center;
  color: #0fb852;
}

.card-title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex-wrap: nowrap;
}

.icon-container {
  border-radius: 50%;
  text-align: center;
  border: #0fb852 solid 1px;
}

.icon-container:hover {
  box-shadow: 4px 4px 15px -1px rgba(234, 222, 222, 0.53);
}
</style>