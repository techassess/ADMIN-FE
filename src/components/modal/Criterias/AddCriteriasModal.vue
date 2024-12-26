<template>
  <div v-if="isVisible" class="modal-backdrop">
    <div class="modal fade show" tabindex="-1" id="myModal1" aria-hidden="false" style="display: block">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header" style="border-bottom: solid 0.05em gray">
            <h5 class="modal-title">Thêm mới tiêu chí</h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>

          <div class="modal-body">
            <form ref="criteriaForm" class="form" @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="title" class="form-label">Tên tiêu chí</label>
                <input type="text" class="form-control" id="title" v-model="criteria.title"
                  placeholder="Nhập tiêu chí đánh giá" :class="{ 'is-invalid': errors.title || serverErrors.title }" />
                  <div class="invalid-feedback" v-if="errors.title || serverErrors.title">
          {{ errors.title || serverErrors.title }}
        </div>
              </div>
              <!-- <div class="mb-3">
                <label for="point" class="form-label">Số điểm</label>
                <input type="text" class="form-control" id="point" v-model="criteria.point" required
                  placeholder="Nhập số điểm" />
              </div> -->
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
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
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
        point: ""
      },
      errors: {
        title: null,
        point: null,
      },
      serverErrors: {
        title: null, 
      },
      isLoading: false,
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
    closeModal() {
      this.errors.title = null;
      this.resetForm();
      this.$emit("close");
    },
    async addCriteria() {
      this.isLoading = true;
      const form = this.$refs.criteriaForm;
      if (form.reportValidity()) {
        const newCriteria = JSON.parse(JSON.stringify(this.criteria));
        const formData = new FormData();
        for (const key in newCriteria) {
          // if (key === "avatar") continue;
          formData.append(key, newCriteria[key]);
        }
        // formData.append("avatar", this.selectedImage);

        try {
          /**
           * @type {ApiResponse}
           */
          const res = await CriteriasService.addCriteria(formData);
          if (res.code) {
            this.$emit("criteria-added");
            toast.success("Thêm tiêu chí thành công!", {
            autoClose: 2000,
          });
          this.errors.title = null;
            this.resetForm();
            setTimeout(() => {
              this.closeModal();
            }, 1500);
          }
        } catch (error) {
          // toast.error(error.response.data.error);
          // return;
          this.errors.title = error.response.data.error;
        } finally {
          // Đảm bảo isLoading sẽ được đặt lại thành false
          this.isLoading = false;
        }
      }
    },
    submitForm() {
      const newCriteria = JSON.parse(JSON.stringify(this.criteria));
      this.$emit("add-criteria", newCriteria);
    },
    resetForm() {
      this.criteria = {};
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