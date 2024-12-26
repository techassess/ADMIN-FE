<template>
  <!-- Thêm lớp phủ -->
  <div v-if="isVisible" class="overlay"></div>

  <div class="question-edit container mt-4">
    <h2 class="mb-4 bg-primary text-white text-center">Chi tiết câu hỏi</h2>
    <form>
      <!-- Câu hỏi -->
      <div class="mb-4">
        <label for="question-title" class="form-label">Tên câu hỏi:</label>
        <input
          type="text"
          id="question-title"
          v-model="localQuestion.title"
          class="form-control"
          disabled
        />
      </div>

      <!-- Điểm câu hỏi -->
      <div class="mb-4">
        <label for="question-point" class="form-label">Điểm câu hỏi:</label>
        <input
          type="number"
          id="question-point"
          v-model="localQuestion.point"
          class="form-control"
          disabled
        />
      </div>

      <hr class="my-4" />

      <div
        v-for="(answer, answerIndex) in localQuestion.answers"
        :key="answer.id"
      >
        <div class="form-group">
          <label :for="'answer-title-' + answer.id" class="form-label"
            >Mức độ {{ answerIndex + 1 }}:</label
          >
          <input
            type="text"
            :id="'answer-title-' + answer.id"
            v-model="answer.title"
            class="form-control"
            disabled
          />
        </div>
      </div>

      <div class="d-flex justify-content-end mt-5">
        <button type="button" class="btn btn-secondary" @click="closeForm">
          Đóng
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: Boolean,
    question: Object,
  },
  data() {
    return {
      localQuestion: JSON.parse(JSON.stringify(this.question)),
    };
  },
  methods: {
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
</style>
