<template>
  <div class="chart-container">
    <div v-if="loading" class="loading">Đang tải...</div>
    <div v-else-if="error" class="error">Lỗi: {{ error }}</div>
    <canvas v-else ref="chartCanvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, reactive } from "vue";
import { useRoute } from 'vue-router';
import RatedRankService from '@/services/RatedRankService';
import {
  Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  RadarController,
} from "chart.js";

Chart.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  RadarController
);

const route = useRoute();
const chartCanvas = ref(null);
const chart = ref(null);
const loading = ref(true);
const error = ref(null);
const chartData = reactive({
  labels: [],
  datasets: []
});

const fetchData = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await RatedRankService.fetchOverallRated(route.params.userId);
    if (response.code === 1010 && response.data) {
      const { overallOfCriteria } = response.data;
      chartData.labels = overallOfCriteria.map(criteria => criteria.criteriaTitle);
      chartData.datasets = [
        {
          label: "Tự đánh giá",
          backgroundColor: "rgba(255, 255, 255, 1)",
          borderColor: "rgb(54, 162, 235)",
          pointBackgroundColor: "rgb(54, 162, 235)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(54, 162, 235)",
          data: overallOfCriteria.map(criteria => criteria.selfPoint),
        },
        {
          label: "Đánh giá của Team",
          backgroundColor: "rgba(255, 255, 255, 1)",
          borderColor: "rgb(255, 99, 132)",
          pointBackgroundColor: "rgb(255, 99, 132)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 99, 132)",
          data: overallOfCriteria.map(criteria => criteria.teamPoint),
        },
        {
          label: "Đánh giá của Quản lý",
          backgroundColor: "rgba(255, 255, 255, 1)",
          borderColor: "rgb(255, 165, 0)",
          pointBackgroundColor: "rgb(255, 165, 0)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 165, 0)",
          data: overallOfCriteria.map(criteria => criteria.managerPoint),
        },
      ];
    } else {
      throw new Error("Phản hồi API không hợp lệ");
    }
  } catch (err) {
    console.error("Lỗi khi lấy dữ liệu:", err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const createChart = () => {
  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext("2d");
    chart.value = new Chart(ctx, {
      type: "radar",
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            bottom: 10,
          },
        },
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              font: {
                size: 14,
                weight: "bold",
              },
              color: "#333",
              padding: 20,
            },
          },
          title: {
            display: true,
            text: "Đánh Giá 360°",
            font: {
              size: 18,
              weight: "bold",
            },
            padding: {
              top: 10,
              bottom: 30,
            },
          },
        },
        scales: {
          r: {
            angleLines: { display: true },
            suggestedMin: 0,
            suggestedMax: 5,
            ticks: {
              stepSize: 1,
              beginAtZero: true,
              font: {
                size: 12,
                weight: "bold",
              },
              z: 2,
            },
            pointLabels: {
              font: {
                size: 14,
                weight: "bold",
              },
            },
          },
        },
      },
    });
  }
};

onMounted(async () => {
  await fetchData();
  if (!error.value) {
    createChart();
  }
});

watch(() => route.params.userId, async (newUserId) => {
  if (newUserId) {
    await fetchData();
    if (!error.value && chart.value) {
      chart.value.data = chartData;
      chart.value.update();
    }
  }
});
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 800px;
  height: 500px;
  margin: 0 auto;
  position: relative;
}

.loading, .error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  font-weight: bold;
}

.error {
  color: red;
}

canvas {
  width: 100%;
  height: 100%;
}
</style>