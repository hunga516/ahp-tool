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
  data() {
    return {
      chartData: {
        labels: ['Quận 1', 'Quận 5', 'Quận 7', 'Quận 10'],
        datasets: [
          {
            label: 'Giá thuê trung bình (triệu/tháng)',
            backgroundColor: '#000000',
            data: [15, 12, 10, 8]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          title: {
            display: true,
            text: 'Biểu đồ giá thuê theo khu vực'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Giá (triệu đồng)'
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