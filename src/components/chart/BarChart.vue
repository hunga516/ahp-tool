<template>
  <div class="chart-container">
    <Bar
      :options="chartOptions"
      :data="chartData"
    />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    labels: {
      type: Array,
      required: true
    },
    values: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    yAxisLabel: {
      type: String,
      required: true
    }
  },
  computed: {
    chartData() {
      // Mảng màu cho từng cột
      const barColors = [
        '#4F8A8B', '#FBD46D', '#F76B8A', '#A8D8EA', '#374785', '#24305E', '#70A1D7', '#F8E9A1', '#F76B1C', '#6A0572', '#AB83A1'
      ];
      // Lặp lại màu nếu số cột > số màu
      const colors = this.values.map((_, idx) => barColors[idx % barColors.length]);
      return {
        labels: this.labels,
        datasets: [
          {
            label: this.yAxisLabel,
            backgroundColor: colors,
            data: this.values
          }
        ]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          title: {
            display: true,
            text: this.title
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: this.yAxisLabel
            }
          }
        }
      }
    }
  }
}
</script>

<style>
.container-card {
  max-width: 800px;
  margin: 0 auto;
  /* ... */
}
.chart-container {
  width: 100%;
  max-width: 100%;
  height: 350px;
  min-height: 350px;
  position: relative;
}
</style>