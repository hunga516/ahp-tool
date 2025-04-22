<template>
  <Bar
    :options="chartOptions"
    :data="chartData"
  />
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
      return {
        labels: this.labels,
        datasets: [
          {
            label: this.yAxisLabel,
            backgroundColor: '#000000',
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
.chart-container {
  position: relative;
  height: 300px;
  width: 100%;
}
</style>