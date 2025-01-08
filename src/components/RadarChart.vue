<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
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

// Đăng ký các thành phần cần thiết
Chart.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  RadarController
);

export default {
  setup() {
    const chartCanvas = ref(null);

    onMounted(() => {
      const ctx = chartCanvas.value.getContext("2d");
      new Chart(ctx, {
        type: "radar", // Loại biểu đồ
        data: {
          labels: [
            "Hiệu suất Công việc",
            "Kỹ năng và Kiến Thức",
            "Tinh thần Làm Việc",
            "Quy định và Chính sách",
            "Đóng góp và Sáng kiến",
            "Đóng Góp Cá Nhân",
          ],
          datasets: [
            {
              label: "Tự đánh giá",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgb(54, 162, 235)",
              pointBackgroundColor: "rgb(54, 162, 235)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgb(54, 162, 235)",
              data: [4, 2, 4, 3, 5, 3],
            },
            {
              label: "Quản Lý",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgb(255, 99, 132)",
              pointBackgroundColor: "rgb(255, 99, 132)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgb(255, 99, 132)",
              data: [2, 3, 2, 4, 4, 3],
            },
            {
              label: "Team",
              backgroundColor: "rgba(255, 165, 0, 0.2)", // Màu gạch nhạt
              borderColor: "rgb(255, 165, 0)",
              pointBackgroundColor: "rgb(255, 165, 0)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgb(255, 165, 0)",
              data: [3, 2, 1, 3, 2, 3],
            },
          ],
        },
        options: {
          responsive: true,
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
                  size: 18,
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
              suggestedMin: 0, // Đặt giá trị tối thiểu là 0
              suggestedMax: 5, // Đặt giá trị tối đa là 5
              ticks: {
                stepSize: 1, // Cấu hình bước ở đây
                beginAtZero: true,
                font: {
                  size: 16, // Tăng kích thước số (số 20 có thể thay đổi tùy theo nhu cầu)
                  weight: "bold", // Chọn kiểu chữ đậm (tuỳ chọn)
                }, // Đảm bảo bắt đầu từ 0
              },
              pointLabels: {
                font: {
                  size: 18,
                  weight: "bold",
                },
              },
            },
          },
        },
      });
    });

    return {
      chartCanvas,
    };
  },
};
</script>

<style>
canvas {
  width: 100%;
  max-width: 800px;
  height: 500px;
  margin: 0 auto;
  display: block;
}
</style>
