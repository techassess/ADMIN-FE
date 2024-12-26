<template>
  <div class="criteria-detail">
    <div style="border-bottom: solid gray">
      <h2 style="text-align: center" class="mt-2">
        Chi tiết tiêu chí đánh giá
      </h2>
    </div>

    <div class="content mt-4">
      <h4><strong>Tiêu đề:</strong> {{ criteriaDetail.title }}</h4>
      <h4 class="mb-3"><strong>Số điểm:</strong> {{ criteriaDetail.point }}</h4>
      <div class="d-flex justify-content-start mb-3">
        <button class="btn btn-success me-3" type="button" @click="openModal">
          Thêm câu hỏi
        </button>
      </div>

      <table
        v-if="criteriaDetail.questions && criteriaDetail.questions.length > 0"
        class="table table-hover table-bordered criteria-table"
      >
        <thead>
          <tr>
            <th>STT</th>
            <th>Câu hỏi</th>
            <th>Điểm</th>
            <th>Tác vụ</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(question, index) in criteriaDetail.questions"
            :key="index"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ question.title }}</td>
            <td>{{ question.point }}</td>
            <td>
              <button class="btn btn-primary me-2">Chi tiết</button>
              <button
                class="btn btn-warning me-2"
                @click="openEditModal(question)"
              >
                Sửa
              </button>
              <button type="button" class="btn btn-danger">Xoá</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>Không có câu hỏi nào cho tiêu chí này.</p>

      <button class="btn btn-primary mt-3" @click="goBack">Quay lại</button>
    </div>

    <div class="pagination-wrapper">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="pagination-btn"
      >
        <i class="fas fa-arrow-left"></i>
      </button>
      <span>Trang {{ currentPage }} / {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="pagination-btn"
      >
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>

    <EditQuestionModal
      v-if="isModalVisible"
      :isVisible="isModalVisible"
      :question="selectedQuestion"
      @close="closeEditModal"
      @question-updated="refreshQuestions"
    />
  </div>
</template>

<script>
import CriteriasService from "@/services/CriteriasService";
import EditQuestionModal from "./modal/Criterias/EditQuestionModal.vue";

export default {
  components: {
    EditQuestionModal,
  },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 10,
      criteriaDetail: {},
      isModalVisible: false,
      selectedQuestion: null,
    };
  },
  computed: {
    totalPages() {
      if (
        this.criteriaDetail.questions &&
        Array.isArray(this.criteriaDetail.questions)
      ) {
        return Math.ceil(
          this.criteriaDetail.questions.length / this.itemsPerPage
        );
      }
      return 1;
    },
    paginatedCriterias() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.criteriaDetail.slice(start, end);
    },
  },
  async mounted() {
    await this.fetchCriteriaDetail();
  },
  methods: {
    async fetchCriteriaDetail() {
      const id = this.$route.params.id;
      try {
        const response = await CriteriasService.fetchCriteriasById(id);
        if (response.code === 1010) {
          this.criteriaDetail = response.data;
        } else {
          console.error("Lỗi khi lấy chi tiết tiêu chí:", response.message);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    openEditModal(question) {
      this.selectedQuestion = question;
      this.isModalVisible = true;
    },
    closeEditModal() {
      this.isModalVisible = false;
      this.selectedQuestion = null;
    },
    refreshQuestions() {
      this.fetchCriteriaDetail();
    },
    goToPage(page) {
      this.currentPage = page;
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.criteria-table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  max-height: 1000vh;
  text-align: left;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  position: relative;
}
.criteria-table th,
.criteria-table td {
  padding: 7px;
  vertical-align: middle;
  border-bottom: 1px solid #f0f0f0;
  text-align: center;
}
.criteria-table th {
  background-color: #000066;
  color: white;
  font-weight: 600;
  font-size: 20px;
  cursor: pointer;
}
.criteria-table tr:hover {
  background-color: #f9f9f9;
}
.criteria-table tr:nth-child(even) {
  background-color: #f2f2f2;
}
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.pagination-wrapper span {
  margin-top: 28px;
}
.pagination-btn {
  margin: 10px 10px;
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
}
.pagination-btn:hover {
  background-color: #0056b3;
}
.pagination-btn:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}
</style>
