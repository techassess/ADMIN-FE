<template>
  <div v-if="isVisible" class="modal-backdrop">
    <div
      class="modal fade show"
      tabindex="-1"
      id="myModal1"
      aria-hidden="false"
      style="display: block"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" style="border-bottom: solid 0.05em gray">
            <h5 class="modal-title">Thêm mới tiêu chí</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">
            <form ref="criteriaForm" class="form" @submit.prevent="addCriteria">
              <div class="mb-3">
                <label for="title" class="form-label">Tên tiêu chí</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="criteria.title"
                  placeholder="Nhập tiêu chí đánh giá"
                  :class="{ 'is-invalid': errors.title }"
                />
                <div class="invalid-feedback" v-if="errors.title">
                  {{ errors.title }}
                </div>
              </div>
              <div class="mb-3">
                <label for="criteriaType" class="form-label"
                  >Hiển thị cho</label
                >
                <select
                  class="form-control"
                  id="criteriaType"
                  v-model="criteria.visible_for"
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
//import Swal from "sweetalert2";
import CriteriasService from "@/services/CriteriasService";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

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
        departmentId: null,
        criteriaReqDTO: {
          title: null,
        },
        visible_for: "",
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
      this.errors.title = null;
      this.resetForm();
      this.$emit("close");
    },
    async addCriteria() {
      this.validateForm();
      if (Object.values(this.errors).some((error) => error)) {
        return;
      }
      const depart_Id = localStorage.getItem("selectedDepartmentId")
      const payload = {
        departmentId: depart_Id, 
        criteriaReqDTO: {
          title: this.criteria.title,
        },
        visible_for:this.criteria.visible_for
      };

      try {
        const res = await CriteriasService.addCriteria(payload);
        if (res.code) {
          this.$emit("criteria-added");
          toast.success("Thêm tiêu chí thành công!", { autoClose: 2000 });
          this.resetForm();
          setTimeout(() => this.closeModal(), 1500);
        }
      } catch (error) {
        console.error("Lỗi khi thêm tiêu chí:", error.response.data);
        this.errors.title =
          error.response.data?.message || "Lỗi không xác định";
      } finally {
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

#dropdownMenuButton1 {
  width: 100%;
}

.dropdown-menu {
  width: 100%;
  box-sizing: border-box;
}
</style>
