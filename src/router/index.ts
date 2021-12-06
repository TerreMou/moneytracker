import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import RecordsNew from '@/views/RecordsNew.vue';
import NotFound from '@/views/NotFound.vue';
import EditLabel from '@/views/EditLabel.vue';


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/records'
  },
  {
    path: '/labels',
    name: 'Labels',
    component: Labels
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics
  },
  {
    path: '/records',
    name: 'Records',
    component: RecordsNew
  },
  {
    path: '/labels/edit/:id',
    component: EditLabel
  },
  {
    path: '*', // 路由是从上往下依次检查匹配的，所以这里的 * 表示除上面路径外的其他所有路径。
    component: NotFound
  },
];

const router = new VueRouter({
  routes
});

export default router;
