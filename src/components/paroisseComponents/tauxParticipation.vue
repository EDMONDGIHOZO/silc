<template>
  <div class="resume-card-container">
    <div class="info-card" v-if="pData.loaded">
      <h3 class="info-card-title">Taux de participation</h3>
      <div class="info-card-container">
        <div id="chart">
          <apexchart
            type="donut"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
      </div>
    </div>
    <content-loader type="card" v-else />
  </div>
</template>
<script>
import Loading from "@/components/layouts/loaders.vue";
import VueApexCharts from "vue-apexcharts";
import {mapState} from "vuex";
export default {
  props: ["pid"],
  components: {
    "content-loader": Loading,
    apexchart: VueApexCharts,
  },
  computed: mapState(["pData", "series"]),
  data: () => ({
    loaded: true,
    // chart
    chartOptions: {
      chart: {
        width: 400,
        type: "donut",
      },
      colors: ["#20DB6B", "#FFB800"],
      dataLabels: {
        enabled: true,
      },
      labels: ["Les garcons", "Les Filles"],
      legend: {
        show: true,
        position: "bottom",
        fontWeight: "bold",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              show: true,
              position: "bottom",
              fontWeight: "bold",
            },
          },
        },
      ],
    },
  }),
};
</script>


<style lang="scss" scoped>
.info-card-container {
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.info-card {
  height: 350px;
}
</style>