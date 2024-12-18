import AssessDateManage from '@/components/AssessDateManage.vue';
import AssessPage from '@/components/AssessPage.vue';
import CriteriasManage from '@/components/CriteriasManage.vue';
import EmployeeManager from '@/components/EmployeeManager.vue';
import ManageProjects from '@/components/ManageProjects.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: EmployeeManager },
    { path: '/projects-manage', component: ManageProjects },
    { path: '/assess-page', component: AssessPage },
    { path: '/assess-date-manage', component: AssessDateManage },
    { path: '/criterias-manage', component: CriteriasManage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
