<template>
  <!-- Thêm lớp phủ -->
  <div v-if="isVisible" class="overlay"></div>

  <div class="question-edit container mt-4">
    <h2 class="mb-4 bg-primary text-white text-center">Thêm mới câu hỏi</h2>
    <form @submit.prevent="addQuestion">
      <!-- Câu hỏi -->
      <div class="mb-4">
        <label for="question-title" class="form-label">Tên câu hỏi:</label>
        <input
          type="text"
          id="question-title"
          v-model="localQuestion.title"
          class="form-control"
          :class="{ 'is-invalid': errors.title }"
          @blur="validateQuestion"
        />
        <div v-if="errors.title" class="invalid-feedback">
          {{ errors.title }}
        </div>
      </div>

      <!-- Điểm câu hỏi -->
      <div class="mb-4">
        <label for="question-point" class="form-label">Điểm câu hỏi:</label>
        <input
          type="number"
          id="question-point"
          v-model="localQuestion.point"
          class="form-control"
          :class="{ 'is-invalid': errors.point }"
          @blur="validatePoint"
        />
        <div v-if="errors.point" class="invalid-feedback">
          {{ errors.point }}
        </div>
      </div>

      <hr class="my-4" />

      <!-- 5 Câu trả lời -->
      <div
        v-for="(answer, answerIndex) in localQuestion.answers"
        :key="answer.id"
        class="form-group mb-3"
      >
        <label :for="'answer-title-' + answer.id" class="form-label">
          Mức độ {{ answerIndex + 1 }}:
        </label>
        <input
          type="text"
          :id="'answer-title-' + answer.id"
          v-model="answer.title"
          class="form-control"
          :class="{ 'is-invalid': errors['answer-' + answer.id] }"
          @blur="validateAnswer(answer)"
        />
        <div v-if="errors['answer-' + answer.id]" class="invalid-feedback">
          {{ errors["answer-" + answer.id] }}
        </div>
      </div>

      <div class="d-flex justify-content-end mt-5">
        <button
          type="submit"
          class="btn btn-primary me-2"
          :disabled="hasErrors || isSubmitting"
        >
          Lưu
        </button>
        <button type="button" class="btn btn-secondary" @click="closeForm">
          Đóng
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  props: {
    isVisible: Boolean,
  },
  data() {
    return {
      localQuestion: {
        title: "",
        point: "",
        answers: [
          { id: Date.now(), title: "", value: "1" },
          { id: Date.now() + 1, title: "", value: "2" },
          { id: Date.now() + 2, title: "", value: "3" },
          { id: Date.now() + 3, title: "", value: "4" },
          { id: Date.now() + 4, title: "", value: "5" },
        ],
      },
      errors: {
        title: null,
        point: null,
      },
      isSubmitting: false,
    };
  },
  computed: {
    hasErrors() {
      return Object.values(this.errors).some((error) => error !== null);
    },
  },
  methods: {
    async addQuestion() {
      const depart_Id = localStorage.getItem("selectedDepartmentId")
      this.validateQuestion();
      this.validatePoint();
      this.localQuestion.answers.forEach((answer) =>
        this.validateAnswer(answer)
      );
      if (this.hasErrors) {
        toast.warning("Vui lòng sửa các lỗi trước khi lưu.");
        return;
      }
 
      // Cấu trúc dữ liệu câu hỏi và câu trả lời
      const payload = {
        title: this.localQuestion.title,
        point: this.localQuestion.point,
        criteriaId: this.$route.params.id,
        answers: this.localQuestion.answers.map((answer) => ({
          title: answer.title,
          value: answer.value,
        })),
        departmentId:depart_Id,
      };

      try {
        await axios.post("http://localhost:8080/api/questions", payload);
        toast.success("Thêm câu hỏi thành công");
        this.$emit("question-added", payload);
        this.closeForm(); // Đóng form sau khi thêm câu hỏi
      } catch (error) {
        console.error("Lỗi khi thêm câu hỏi:", error);
      } finally {
        this.isSubmitting = false;
      }
    },
    validateQuestion() {
      // Kiểm tra tên câu hỏi
      this.errors.title = this.localQuestion.title.trim()
        ? null
        : "Tên câu hỏi không được để trống.";
    },
    validatePoint() {
      // Kiểm tra điểm câu hỏi
      this.errors.point =
        this.localQuestion.point > 0 ? null : "Điểm câu hỏi phải lớn hơn 0.";
    },
    validateAnswer(answer) {
      // Kiểm tra câu trả lời
      this.errors["answer-" + answer.id] = answer.title.trim()
        ? null
        : "Câu trả lời không được để trống.";
    },
    closeForm() {
      // Đóng form và reset dữ liệu câu hỏi
      this.$emit("close");
      this.resetForm();
    },
    resetForm() {
      // Reset lại form sau khi thêm câu hỏi
      this.localQuestion = {
        title: "",
        point: null,
        answers: [
          { id: Date.now(), title: "", value: "1" },
          { id: Date.now() + 1, title: "", value: "2" },
          { id: Date.now() + 2, title: "", value: "3" },
          { id: Date.now() + 3, title: "", value: "4" },
          { id: Date.now() + 4, title: "", value: "5" },
        ],
      };
      this.errors = {
        title: null,
        point: null,
      };
    },
  },
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}

/* Form modal */
.question-edit {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 600px;
  width: 100%;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  max-height: 95%;
  overflow-y: auto;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 0.875em;
}
</style>
