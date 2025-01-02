<template>
  <div v-if="isVisible1" class="criteria-edit container mt-4 overlay">
    <h2 class="mb-4 bg-primary">Cập nhật tiêu chí</h2>
    <form @submit.prevent="updateCriteria">
      <div class="mb-3">
        <label for="title" class="form-label d-flex text-start"
          >Tên tiêu chí:</label
        >
        <input
          type="text"
          id="title"
          v-model="criteria.title"
          class="form-control"
          @blur="validateTitle"
          @input="clearServerError"
          :class="{ 'is-invalid': errors.title || serverErrors.title }"
        />
        <div class="invalid-feedback" v-if="errors.title || serverErrors.title">
          {{ errors.title || serverErrors.title }}
        </div>
      </div>

      <div class="mb-3">
        <label for="criteriaType" class="form-label">Hiển thị cho</label>
        <select
          class="form-control"
          id="criteriaType"
          v-model="criteria.visibleFor"
          :class="{ 'is-invalid': errors.type }"
        >
          <option value="">Vui lòng chọn</option>
          <option value="ALL_MEMBER">Tất cả nhân viên</option>
          <option value="SELF">Tự đánh giá</option>
          <option value="CROSS">Đánh giá chéo</option>
          <option value="MANAGER">Quản lý trực tiếp</option>
        </select>
        <div class="invalid-feedback" v-if="errors.type">
          {{ errors.type }}
        </div>
      </div>

      <div class="d-flex justify-content-end">
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
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import CriteriasService from "@/services/CriteriasService";

export default {
  props: {
    isVisible1: Boolean,
    criteriasData: Object,
  },
  data() {
    return {
      criteria: {
        id: null,
        title: "",
        point: 0,
        visibleFor: "",
      },
      errors: {
        title: null,
        point: null,
      },
      serverErrors: {
        title: null,
      },
    };
  },
  computed: {
    hasErrors() {
      return (
        Object.values(this.errors).some((error) => error !== null) ||
        !!this.serverErrors.title
      );
    },
  },
  methods: {
    async updateCriteria() {
      if (this.hasErrors) {
        alert("Vui lòng sửa các lỗi trước khi cập nhật.");
        return;
      }

      try {
        const departmentId = localStorage.getItem("selectedDepartmentId");
        await CriteriasService.updateCriteriaInDepartment(
          this.criteria.id,
          departmentId,
          this.criteria
        );
        toast.success("Cập nhật thành công!", {
          autoClose: 2000,
        });
        this.closeForm();
        this.$emit("criteria-edited");
      } catch (error) {
        console.error("Error updating criteria:", error);

        if (error.response && error.response.data) {
          this.serverErrors.title = error.response.data.error || null;
        }
      }
    },
    validateTitle() {
      if (!this.criteria.title.trim()) {
        this.errors.title = "Tên tiêu chí không được để trống.";
      } else if (this.criteria.title.length < 3) {
        this.errors.title = "Tên tiêu chí phải dài ít nhất 3 ký tự.";
      } else {
        this.errors.title = null;
      }
    },
    clearServerError() {
      this.serverErrors.title = null;
    },
    closeForm() {
      this.$emit("close");
    },
  },
  watch: {
    criteriasData(newVal) {
      this.criteria = { ...newVal };
    },
  },
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
