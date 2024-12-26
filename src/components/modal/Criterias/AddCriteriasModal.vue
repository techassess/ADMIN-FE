<template>
  <div v-if="isVisible" class="modal-backdrop">
    <div class="modal fade show" tabindex="-1" id="myModal1" aria-hidden="false" style="display: block">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" style="border-bottom: solid 0.05em gray">
            <h5 class="modal-title">Thêm tiêu chí</h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <form ref="criteriaForm" class="form">
              <div class="mb-3">
                <label for="title" class="form-label">Tên tiêu chí</label>
                <input type="text" class="form-control" id="title" v-model="criteria.title" @blur="validateTitle"
                  :class="{ 'is-invalid': errors.title }" placeholder=" Nhập tiêu chí đánh giá" />
                <div v-if="errors.title" class="invalid-feedback">
                  {{ errors.title }}
                </div>
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button type="submit" class="btn btn-primary" @click="addCriteria">
              Thêm
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import CriteriasService from "@/services/CriteriasService";

export default {
  name: "AddCriteriasModal",
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      criteria: {
        title: "",
      },
      errors: {
        title: null,
      },
      isLoading: false,
      isFormFilled: false,
    };
  },
  methods: {
    closeModal() {
      this.resetForm();
      this.$emit("close");
    },
    async addCriteria() {
      this.validateForm();
      if (Object.values(this.errors).every(x => x === null || x === '')) {
        console.log("Form is valid");
        this.isFormFilled = true;
      }
      if (!this.isFormFilled) {
        return;
      }
      const newCriteria = JSON.parse(JSON.stringify(this.criteria));
      const formData = new FormData();
      for (const key in newCriteria) {
        formData.append(key, newCriteria[key]);
      }

      try {
        /**
         * @type {ApiResponse}
         */
        const res = await CriteriasService.addCriteria(formData);
        if (res.code) {
          this.$emit("criteria-added");
          Swal.fire({
            title: res.message,
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });

          this.resetForm();
          setTimeout(() => {
            this.closeModal();
          }, 1500);
        }
      } catch (error) {
        console.error("Error adding criteria:", error);
        Swal.fire({
          title: "Lỗi!",
          text: error.response.data.error,
          icon: "error",
          confirmButtonText: "Đóng",
        });
        this.resetForm();
        setTimeout(() => {
          this.closeModal();
        }, 1500);
      } finally {
        // Đảm bảo isLoading sẽ được đặt lại thành false
        this.isLoading = false;
      }
    },
    resetForm() {
      this.criteria = {};
    },

    validateForm() {
      this.validateTitle();
    },

    validateTitle() {
      if (!this.criteria.title) {
        this.errors.title = "Vui lòng nhập tên tiêu chí";
      } else {
        this.errors.title = null;
      }
    },

  },
};
</script>
<style scoped>
.is-invalid {
  border-color: #dc3545;
}

.invalid-feedback {
  color: #dc3545;
  font-size: 0.875em;
}
</style>