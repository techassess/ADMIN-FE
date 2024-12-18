<template>
  <div v-if="isVisible1" class="modal-backdrop">
    <div class="modal fade show " tabindex="-1" id="myModal" aria-hidden="false" style="display: block; ">
      <div class="modal-dialog ">
        <div class="modal-content">
          <div class="modal-header" style=" border-bottom: solid 0.05em gray;">
            <h5 class="modal-title">Sửa thông tin</h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>
          <div class="modal-body " style=" border-bottom: solid 0.05em gray;">
            <form ref="employeeForm" class="form" @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="avatar" class="form-label">Ảnh đại diện</label>
                <input type="file" class="form-control" id="avatar" @change="previewImage" accept="image/*" />
              </div>
              <div class="mb-3">
                <img :src="employee.avatar" alt="Profile Picture" class="img-thumbnail" v-if="employee.avatar" />
              </div>
              <div class="mb-3">
                <label for="employeeName" class="form-label">Họ tên</label>
                <input type="text" class="form-control" id="employeeName" v-model="employee.name" required>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="username" class="form-label">Tên đăng nhập</label>
                  <input type="text" class="form-control" id="username" v-model="employee.username"
                    autocomplete="username" required pattern="[a-zA-Z0-9]+"
                    title="Tên đăng nhập chỉ chứa chữ cái và số">
                </div>
                <div class="col-md-6 mb-3">
                  <label for="password" class="form-label">Mật khẩu</label>
                  <input type="password" class="form-control" id="password" v-model="employee.password"
                    autocomplete="current-password" required minlength="6">
                </div>
              </div>
               <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="employeePosition" class="form-label">Chức vụ</label>
                  <select class="form-select" v-model="employee.rank.position.name" >
                  <option value="INTERN">Intern</option>
                  <option value="FRESHER">Fresher</option>
                  <option value="MIDDLE">Midle</option>
                </select>

                </div>
                <div class="col-md-6 mb-3">
                  <label for="level" class="form-label">Cấp bậc</label>
                  <select class="form-select" v-model="employee.rank.level" required>
                    <option value="1" selected>1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
              </div>
              <div class="row">
                <!-- <div class="col-md-6 mb-3">
                  <label for="date" class="form-label">Thuộc dự án</label>
                  <select class="form-select" v-model="employee.project" required>
                    <option v-for="project in projects" :key="project.id" :value="project.name">
                      {{ project.name }}
                    </option>
                  </select>
                </div> -->
                <div class="col-md-6 mb-3">
                  <label for="employeeGender" class="form-label">Gender</label>
                  <select class="form-select" v-model="employee.gender" >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="ORTHER">Orther</option>
                </select>

                </div>
                <div class="col-md-6 mb-3">
                  <label for="date" class="form-label">Ngày vào công ty</label>
                  <input type="date" class="form-control" id="date" v-model="employee.dob" required>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary" @click="submitForm()">Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'EditEmployeeModal',
  props: {
    isVisible1: {
      type: Boolean,
      default: false
    },
    employeeData: {
      type: Object,
      default: null,
    }
  },
  data() {
    return {
      employee: { ...this.employeeData },
      apiUrl: process.env.VUE_APP_DB_URL,
    };
  },
  watch: {
    employeeData: {
    immediate: true, // Đồng bộ dữ liệu ngay khi component được mount
    handler(newValue) {
      if (newValue) {
        this.employee = { ...newValue };
      }
    }
  }
  },

  methods: {
    closeModal() {
      this.$emit('close');
    },
       async submitForm() {
      const form = this.$refs.employeeForm;
      if (form.reportValidity()) {
        const updatedEmployee = JSON.parse(JSON.stringify(this.employee));
        try {
          const response = await axios.put(this.apiUrl + `/api/users/${this.employee.id}`, updatedEmployee);
          response.data;
            this.$emit('employee-added');
            Swal.fire({
              title: 'Thêm nhân viên thành công!',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            });

            this.resetForm();
            setTimeout(() => {
              this.closeModal();
            }, 1500);
          
        } catch (error) {
          console.log(error);
          Swal.fire({
            title: 'Lỗi!',
            text: 'Có lỗi xảy ra khi sửa thông tin nhân viên.',
            icon: 'error',
            confirmButtonText: 'Đóng'
          });
        }
      }
    },
    previewImage(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.employee.avatar = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style scoped>
label {
  font-size: large;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-thumbnail {
  width: 30%;
}
</style>
