<template>
  <div style="border-bottom: solid gray">
    <h2 class="mt-2 text-center">Chi tiết tiêu chí đánh giá</h2>
  </div>
  <!-- Chi tiết nhân viên -->
  <br />
  <br />
  <div class="row">
    <div class="col-4 d-flex justify-content-center align-items-center">
      <div class="avatar">
        <img
          :src="userInfo.fileInfo?.fileUrl || 'default-avatar.png'"
          alt="avatar"
          class="img-fluid"
        />
      </div>
    </div>
    <div class="col-5" style="text-align: left">
      <h4>Tên nhân viên: {{ userInfo.name }}</h4>
      <h4>Vị trí: {{ userInfo.rank ? userInfo.rank.position.name : "" }}</h4>
      <h4>
        Level: {{ userInfo.rank ? userInfo.rank.level : "Not available" }}
      </h4>
      <h4>Dự án đang tham gia: {{ projectInfo.name ? projectInfo.name : "" }}</h4>
    </div>
    <div class="col-3">
      <button
        class="btn btn-success me-3"
        type="button"
        @click="goBack"
      >
        Quay lại
      </button>
    </div>
  </div>
  <br />
  <br />
  <div class="content">
    <table class="table table-bordered table-light">
      <thead>
        <tr>
          <th>
            Hệ số
            <MyTooltips
              description="Số điểm mà 1 tiêu chí chiếm trong tổng số điểm đánh giá"
            />
          </th>
          <th>Tiêu Chí</th>
          <th>
            Tự đánh giá
            <MyTooltips
              description="Số điểm trung bình mà bạn tự đánh giá được cho 1 tiêu chí trên thang 5"
            />
          </th>
          <th>
            Quản Lý
            <MyTooltips
              description="Số điểm trung bình mà quản lý đánh giá được cho 1 tiêu chí trên thang 5"
            />
          </th>
          <th>
            Team
            <MyTooltips
              description="Số điểm trung bình mà team đánh giá được cho 1 tiêu chí trên thang 5"
            />
          </th>
          <th>
            Tổng Điểm
            <MyTooltips
              description="Tổng số điểm mà 1 tiêu chí đạt được (dựa trên thang điểm của tiêu chí)"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in overallRatedResDto.overallOfCriteria"
          :key="overallRatedResDto.overallOfCriteria[index].criteriaId"
        >
          <td>{{ row.criteriaPoint }}</td>
          <td>{{ row.criteriaTitle }}</td>
          <td>{{ row.selfPoint }}</td>
          <td>{{ row.managerPoint }}</td>
          <td>{{ row.teamPoint }}</td>
          <td>{{ row.overallPoint }}</td>
        </tr>
        <tr>
          <td colspan="4" rowspan="3"></td>
          <td>
            Điểm đánh giá
            <MyTooltips
              description="Tổng số điểm mà bạn đạt được (trên thang điểm 100)"
            />
          </td>
          <td>{{ overallRatedResDto.overallPoint }}</td>
        </tr>
        <tr>
          <!-- <td colspan="4"></td> -->
          <td>
            Xếp loại
            <MyTooltips
              description="Xếp loại của bạn dựa trên tổng số điểm đánh giá"
            />
          </td>
          <td>{{ overallRatedResDto.rank }}</td>
        </tr>
        <tr>
          <!-- <td colspan="4"></td> -->
          <td>
            Đề xuất tăng bậc
            <MyTooltips
              description="Đề xuất tăng bậc của bạn dựa trên xếp loại"
            />
          </td>
          <td>{{ overallRatedResDto.levelUpRecommend }}</td>
        </tr>
      </tbody>
    </table>

    <RadarChart />
  </div>
  <RadarChart />

</template>

<script>
import OverallRatedResDto from "@/model/OverallRatedResDto";
import RatedRankService from "@/services/RatedRankService";
import UserService from "@/services/UserService";
import ProjectService from "@/services/ProjectService";
import MyTooltips from "@/components/common/MyTooltips.vue";
import RadarChart from "./RadarChart.vue";

export default {
  name: "DetailUserRating",
  components: { MyTooltips, RadarChart },
  data() {
    return {
      /**
       * @type {OverallRatedResDto}
       */
      overallRatedResDto: {},
      userInfo: {},
      projectInfo: {},
      projectId: null,
      departmentId: null,
    };
  },
  mounted() {
    this.fetchData();
    this.fetchUsser();
  },
  methods: {
    goBack() {
    this.$router.push('/projects-manage');
  },
    async fetchData() {
      try {
        const resp = await RatedRankService.fetchOverallRated(
          this.$route.params.userId
        );
        if (resp.code) {
          /**
           * @type {OverallRatedResDto}
           */
          const dto = resp.data;
          this.overallRatedResDto = dto;
        }
      } catch (e) {
        console.log(e);
      }
    },

    async fetchUsser() {
      try {
        const resp = await UserService.fetchUserById(this.$route.params.userId);
        if (resp.code) {
          /**
           * @type {OverallRatedResDto}
           */
          const dto = resp.data;
          this.userInfo = dto;
          this.projectId = this.userInfo.userProjects[0].projectId;
          this.fetchProject(this.projectId);
        }
      } catch (e) {
        console.log(e);
      }
    },
    async fetchProject(projectId) {
      try {
        const resp = await ProjectService.fetchProjectById(projectId);
        if (resp.code) {
          /**
           * @type {OverallRatedResDto}
           */
          const dto = resp.data;
          this.projectInfo = dto;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.my-table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
  max-height: 1000vh;
  text-align: left;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  position: relative;
}

.my-table th,
.my-table td {
  padding: 7px;
  vertical-align: middle;
  border-bottom: 1px solid #f0f0f0;
  text-align: center;
}

.my-table th {
  background-color: #000066;
  color: white;
  font-weight: 600;
  font-size: 20px;
  /* cursor: pointer; */
}

.my-table tr:hover {
  background-color: #f9f9f9;
}

.my-table tr:nth-child(even) {
  background-color: #f2f2f2;
}



.my-tooltip {
  position: relative;
  display: inline-block;
  top: 0;
}
.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #007bff;
  /* Add a border around the avatar */
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
