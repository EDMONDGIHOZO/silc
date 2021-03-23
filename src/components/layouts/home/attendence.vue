<template>
  <div class="stat-container">
    <div class="stat-title-container">
      <h3>Participation des membres</h3>
    </div>
    <div id="chart">
      <apexchart
        type="donut"
        :options="chartOptions"
        :series="att_info"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
  name: "attendences",
  props: ["att_info"],
  components: {
    apexchart: VueApexCharts,
  },
  data: () => ({
    chartOptions: {
      chart: {
        type: "donut",
        animations: {
          enabled: true,
          easing: "easeout",
          speed: 500,
        },
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "22px",
                fontWeight: "bold",
                color: "#dfsda",
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: "16px",
                color: undefined,
                offsetY: 16,
                formatter: function (val) {
                  return val;
                },
              },
              total: {
                show: true,
                label: "Total",
                color: "#373d3f",
                fontWeight: "bold",
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                },
              },
            },
          },
        },
      },
      size: "65%",
      colors: ["#119F4A", "#FFB800"],

      dataLabels: {
        enabled: true,
      },

      labels: ["Filles", "Garcons"],
      legend: {
        show: true,
        position: "bottom",
        fontWeight: "bold",
      },
    },

    responsive: [
      {
        breakpoint: 280,
        options: {
          chart: {
            width: 140,
          },
        },
      },
    ],
    series: [44, 55],
  }),
};
</script>

<style lang="scss" scoped>
#chart {
  width: 90%;
  height: 100%;
  margin: 0 auto;
}
</style>