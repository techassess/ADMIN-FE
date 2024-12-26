<template>
  <!-- Thêm lớp phủ -->
  <div v-if="isVisible" class="overlay"></div>

  <div class="question-edit container mt-4">
    <h2 class="mb-4 bg-primary text-white text-center">Cập nhật câu hỏi</h2>
    <form @submit.prevent="updateQuestion">
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

      <div
        v-for="(answer, answerIndex) in localQuestion.answers"
        :key="answer.id"
      >
        <div class="form-group">
          <label :for="'answer-title-' + answer.id" class="form-label"
            >Câu trả lời {{ answerIndex + 1 }}:</label
          >
          <input
            type="text"
            :id="'answer-title-' + answer.id"
            v-model="answer.title"
            class="form-control"
            :class="{ 'is-invalid': errors['answer-' + answer.id] }"
            @blur="validateAnswer(answer)"
          />
          <div
            v-if="errors['answer-' + answer.id]"
            class="invalid-feedback"
          >
            {{ errors['answer-' + answer.id] }}
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-end mt-5">
        <button
          type="submit"
          class="btn btn-primary me-2"
          :disabled="hasErrors"
        >
          Cập nhật
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
    question: Object,
  },
  data() {
    return {
      localQuestion: JSON.parse(JSON.stringify(this.question)),
      errors: {
        title: null,
        point: null,
      },
    };
  },
  computed: {
    hasErrors() {
      return Object.values(this.errors).some((error) => error !== null);
    },
  },
  methods: {
    async updateQuestion() {
      if (this.hasErrors) {
        console.log("Vui lòng sửa các lỗi trước khi cập nhật.");
        return;
      }

      const payload = {
        id: this.localQuestion.id,
        title: this.localQuestion.title,
        point: this.localQuestion.point,
        answers: this.localQuestion.answers.map((answer) => ({
          id: answer.id,
          title: answer.title,
          value: answer.value, // giữ nguyên giá trị value
        })),
      };

      try {
        await axios.put(
          `http://localhost:8080/api/questions/${this.localQuestion.id}`,
          payload
        );
        this.$emit("question-updated", payload);
        toast.success("Cập nhật thành công!", {
            autoClose: 2000,
          });
        this.closeForm();
      } catch (error) {
        console.error("Error updating question:", error);
      }
    },
    validateQuestion() {
      this.errors.title = this.localQuestion.title.trim()
        ? null
        : "Tên câu hỏi không được để trống.";
    },
    validatePoint() {
      this.errors.point =
        this.localQuestion.point > 0
          ? null
          : "Điểm câu hỏi phải lớn hơn 0.";
    },
    validateAnswer(answer) {
      this.errors["answer-" + answer.id] = answer.title.trim()
        ? null
        : "Câu trả lời không được để trống.";
    },
    closeForm() {
      this.$emit("close");
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
  max-height: 80%; 
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
