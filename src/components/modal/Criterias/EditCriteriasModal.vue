<template>
  <div v-if="isVisible1" class="criteria-edit container mt-4 overlay" >
    <h2 class="mb-4 bg-primary">Cập nhật tiêu chí</h2>
    <form @submit.prevent="updateCriteria">
      <div class="mb-3">
        <label for="title" class="form-label d-flex text-start">Tên tiêu chí:</label>
        <input
          type="text"
          id="title"
          v-model="criteria.title"
          class="form-control"
           @blur="validateTitle"
          
        />
        <div v-if="errors.title" class="invalid-feedback">
          {{ errors.title }}
        </div>
      </div>
      <div class="mb-3">
        <label for="point" class="form-label d-flex text-start">Điểm:</label>
        <input
          type="number"
          id="point"
          v-model="criteria.point"
          @input="validatePoint"
          class="form-control"
          :class="{ 'is-invalid': errors.point }"
          required
        />
        <div class="invalid-feedback" v-if="errors.point">
          {{ errors.point }}
        </div>
      </div>
    
      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-primary me-2" :disabled="hasErrors">
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
import CriteriasService from "@/services/CriteriasService";

export default {
  props: {
    isVisible1: Boolean, 
    criteriasData: Object  
  },
  data() {
    return {
      criteria: {
        id: null,
        title: "",
        point: 0,
      },
      errors: {
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
    async updateCriteria() {
      if (this.hasErrors) {
        alert("Vui lòng sửa các lỗi trước khi cập nhật.");
        return;
      }

      try {
        await CriteriasService.updateCriterias(this.criteria.id, this.criteria);
        alert("Cập nhật thành công!");
        this.$emit("criterias-edited");
        this.closeForm();
      } catch (error) {
        console.error("Error updating criteria:", error);
        alert("Có lỗi xảy ra khi cập nhật.");
      }
    },
    validateTitle() {
      if (!this.criteria.title.trim()) {
        this.errors.title = "Tên tiêu chí không được để trống.";
      } else if (this.criteria.title.length < 3) {
        this.errors.title = "Tên tiêu chí phải dài ít nhất 3 ký tự.";
      } else {
        this.errors.title = null; // Không có lỗi
      }
    },
    validatePoint() {
      if (this.criteria.point < 0) {
        this.errors.point = "Điểm không được nhỏ hơn 0.";
      } else {
        this.errors.point = null;
      }
    },
    closeForm() {
      this.$emit("close");
    },
  },
  watch: {
    criteriasData(newVal) {
      this.criteria = { ...newVal };
    }
  }
};
</script>

<style scoped>

.criteria-edit {
  position: fixed; 
  top: 40%; 
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
