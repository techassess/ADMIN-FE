<template>
  <div style="border-bottom: solid gray">
    <h2 class="mt-2 text-center">
      Chi tiết đánh giá cá nhân
    </h2>
  </div>

  <div class="content">
    <div class="mt-2">
      <table class="table table-hover table-bordered my-table">
        <thead>
          <tr>

            <th>Tiêu Chí</th>
            <th>Tự đánh giá
              <MyTooltips description="Số điểm trung bình mà bạn tự đánh giá được cho 1 tiêu chí trên thang 5" />
            </th>
            <th>Quản Lý
              <MyTooltips description="Số điểm trung bình mà quản lý đánh giá được cho 1 tiêu chí trên thang 5" />
            </th>
            <th>Team
              <MyTooltips description="Số điểm trung bình mà team đánh giá được cho 1 tiêu chí trên thang 5" />
            </th>
            <th>Điểm đạt được
              <MyTooltips description="Tổng số điểm mà 1 tiêu chí đạt được (dựa trên thang điểm của tiêu chí)" />
            </th>
            <th>Hệ số
              <MyTooltips description="Số điểm mà 1 tiêu chí chiếm trong tổng số điểm đánh giá" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in overallRatedResDto.overallOfCriteria"
            :key="overallRatedResDto.overallOfCriteria[index].criteriaId">
            <td style="font-weight: 600;">{{ row.criteriaTitle }}</td>
            <td>{{ row.selfPoint }}</td>
            <td>{{ row.managerPoint }}</td>
            <td>{{ row.teamPoint }}</td>
            <td>{{ row.overallPoint }}</td>
            <td>{{ row.criteriaPoint }}</td>
          </tr>
          <tr>
            <td colspan="6" class="bg-warning" style="font-weight: 600; color: black;">Tổng hợp</td>
          </tr>
          <tr>
            <td colspan="4"></td>
            <td>Điểm đánh giá (thang điểm 100)
              <MyTooltips description="Tổng số điểm mà bạn đạt được (trên thang điểm 100)" />
            </td>
            <td>{{ overallRatedResDto.overallPoint }}</td>
          </tr>
          <tr>
            <td colspan="4"></td>
            <td>Xếp loại
              <MyTooltips description="Xếp loại của bạn dựa trên tổng số điểm đánh giá" />
            </td>
            <td>{{ overallRatedResDto.rank }}</td>
          </tr>
          <tr>
            <td colspan="4"></td>
            <td>Đề xuất tăng bậc
              <MyTooltips description="Đề xuất tăng bậc của bạn dựa trên xếp loại" />
            </td>
            <td>{{ overallRatedResDto.levelUpRecommend }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <RadarChart />

</template>

<script>
import OverallRatedResDto from '@/model/OverallRatedResDto';
import RatedRankService from '@/services/RatedRankService';
import MyTooltips from '@/components/common/MyTooltips.vue';
import RadarChart from './RadarChart.vue';

export default {
  name: "DetailUserRating",
  components: { MyTooltips, RadarChart },
  data() {
    return {
      /**
       * @type {OverallRatedResDto}
       */
      overallRatedResDto: {},
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const resp = await RatedRankService.fetchOverallRated(this.$route.params.userId);
        if (resp.code) {
          /**
           * @type {OverallRatedResDto}
           */
          const dto = resp.data;
          this.overallRatedResDto = dto;
          console.log(this.overallRatedResDto);
        }
      } catch (e) {
        console.log(e);
      }
    },
  }
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
</style>