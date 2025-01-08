<template>
  <div style="border-bottom: solid gray">
    <h2 class="mt-2 text-center">
      Chi tiết tiêu chí đánh giá
    </h2>
  </div>

  <div class="content">
    <table class="table table-bordered table-light">
      <thead>
        <tr>
          <th>Hệ số
            <MyTooltips description="Số điểm mà 1 tiêu chí chiếm trong tổng số điểm đánh giá" />
          </th>
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
          <th>Tổng Điểm
            <MyTooltips description="Tổng số điểm mà 1 tiêu chí đạt được (dựa trên thang điểm của tiêu chí)" />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in overallRatedResDto.overallOfCriteria"
          :key="overallRatedResDto.overallOfCriteria[index].criteriaId">
          <td>{{ row.criteriaPoint }}</td>
          <td>{{ row.criteriaTitle }}</td>
          <td>{{ row.selfPoint }}</td>
          <td>{{ row.managerPoint }}</td>
          <td>{{ row.teamPoint }}</td>
          <td>{{ row.overallPoint }}</td>
        </tr>
        <tr>
          <td colspan="4" rowspan="3"></td>
          <td>Điểm đánh giá
            <MyTooltips description="Tổng số điểm mà bạn đạt được (trên thang điểm 100)" />
          </td>
          <td>{{ overallRatedResDto.overallPoint }}</td>
        </tr>
        <tr>
          <!-- <td colspan="4"></td> -->
          <td>Xếp loại
            <MyTooltips description="Xếp loại của bạn dựa trên tổng số điểm đánh giá" />
          </td>
          <td>{{ overallRatedResDto.rank }}</td>
        </tr>
        <tr>
          <!-- <td colspan="4"></td> -->
          <td>Đề xuất tăng bậc
            <MyTooltips description="Đề xuất tăng bậc của bạn dựa trên xếp loại" />
          </td>
          <td>{{ overallRatedResDto.levelUpRecommend }}</td>
        </tr>
      </tbody>
    </table>

    <RadarChart />

  </div>
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
          // console.log(this.overallRatedResDto);
        }
      } catch (e) {
        console.log(e);
      }
    },
  }
};
</script>

<style scoped>
.my-tooltip {
  position: relative;
  display: inline-block;
  top: 0;
}
</style>