<template>
  <div class="data">
    <Heading />
  </div>
</template>

<script>
import Heading from "@/components/group/heading.vue";
export default {
  name: "single-group",
  props: ["groupId"],
  components: {
    Heading,
  },

  mounted() {
    this.getInfo();
  },

  methods: {
    getInfo() {
      this.$store.dispatch("group/getGroupInfo", this.groupId);
    },
  },
};
</script>


