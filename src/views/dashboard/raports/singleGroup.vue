<template>
  <div class="data">
    <Heading />
    <Reference />
  </div>
</template>

<script>
import Heading from "@/components/group/heading.vue";
import Reference from "@/components/group/reference.vue";
export default {
  name: "single-group",
  props: ["groupId"],
  components: {
    Heading,
    Reference,
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


