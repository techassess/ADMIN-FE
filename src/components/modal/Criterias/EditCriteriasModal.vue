<template>
    <div class="criteria-edit container mt-4">
      <h2 class="mb-4">Cập nhật tiêu chí</h2>
      <form @submit.prevent="updateCriteria">
        <div class="mb-3">
          <label for="title" class="form-label d-flex text-start">Tên tiêu chí:</label>
          <input
            type="text"
            id="title"
            v-model="criteria.title"
            class="form-control"
            required
          />
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
        <div class="form-check mb-3 d-flex text-start">
          <input
            type="checkbox"
            id="isDeleted"
            v-model="criteria.isDeleted"
            class="form-check-input "
          />
          <label for="isDeleted" class="form-check-label ms-3">Ẩn</label>
        </div>
        <div class="d-flex">
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
  import axios from "axios";
  
  export default {
    name: "CriteriaEdit",
    data() {
      return {
        criteria: {
          id: null,
          title: "",
          point: 0,
          isDeleted: false,
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
      async fetchCriteria(id) {
        try {
          const response = await axios.get(`http://localhost:8080/api/criterias/${id}`);
          this.criteria = response.data;
        } catch (error) {
          console.error("Error fetching criteria:", error);
        }
      },
      async updateCriteria() {
        if (this.hasErrors) {
          alert("Vui lòng sửa các lỗi trước khi cập nhật.");
          return;
        }
        try {
          await axios.put(`http://localhost:8080/api/criterias/${this.criteria.id}`, this.criteria);
          alert("Cập nhật thành công!");
          this.closeForm();
        } catch (error) {
          console.error("Error updating criteria:", error);
          alert("Có lỗi xảy ra khi cập nhật.");
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
    props: ["criteriaId"],
    mounted() {
      if (this.criteriaId) {
        this.fetchCriteria(this.criteriaId);
      }
    },
  };
  </script>
  
  <style scoped>
  .criteria-edit {
    max-width: 500px;
    margin: auto;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .is-invalid {
    border-color: #dc3545;
  }
  .invalid-feedback {
    color: #dc3545;
    font-size: 0.875em;
  }
  </style>