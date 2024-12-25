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
              <button
                class="btn btn-primary me-2"
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
      criteriaDetail: {},
      isModalVisible: false,
      selectedQuestion: null,
    };
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
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
