import AssessDateManage from '@/components/AssessDateManage.vue';
import AssessPage from '@/components/AssessPage.vue';
import DepartmentsManage from '@/components/DepartmentsManage.vue';
import CriteriasManage from '@/components/CriteriasManage.vue';
import DetailCriterias from '@/components/DetailCriterias.vue';
import EmployeeManager from '@/components/EmployeeManager.vue';
import ManageProjects from '@/components/ManageProjects.vue';
import DetailAssess from '@/components/DetailAssess.vue';

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: "/", component: EmployeeManager },
  { path: "/projects-manage", component: ManageProjects },
  { path: "/assess-page", component: AssessPage },
  { path: "/assess-date-manage", component: AssessDateManage },
  { path: "/departments-manage", component: DepartmentsManage },
  { path: "/criterias-manage", component: CriteriasManage },
  { path: "/detail-criterias/:id", component: DetailCriterias },
  { path: "/assess-detail/:id", component: DetailAssess },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
