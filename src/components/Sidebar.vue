<template>
  <aside class="sidebar bg-opacity-25 text-red vh-100">
    <div class="d-flex flex-column p-3 mt-2">
      <h3 class="name-project">TechAssess360</h3>
      <ul class="nav nav-pills flex-column mb-auto mt-3">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">
            <i class="bi bi-people"></i>Quản lý nhân viên
          </router-link>
        </li>

        <li class="nav-item">
          <router-link to="/projects-manage" class="nav-link" active-class="active">
            <i class="bi bi-gear"></i> Quản lý dự án
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/departments-manage" class="nav-link" active-class="active">
            <i class="bi bi-people"></i> Quản lý bộ phận
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/criterias-manage" class="nav-link" active-class="active">
            <i class="bi bi-people"></i> Quản lý tiêu chí
          </router-link>
        </li> 
        <!-- <li class="nav-item">
          <router-link to="/logout" class="nav-link" active-class="active">
            <i class="bi bi-box-arrow-right"></i> Đăng xuất
          </router-link>
        </li> -->
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'SidebarComponent',
};
</script>

<style scoped>
.sidebar {
  width: 300px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000066;
  color: white;
}

.name-project {
  text-align: center;
}

.nav-link {
  color: white;
  border-bottom: solid gray;
}

.nav-item:hover {
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(118, 116, 116, 0.603);
}

.active {
  background-color: white !important;
  color: #000044 !important;
  font-weight: bold;
  border-radius: 10px;
}
</style>