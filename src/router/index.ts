import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Records from '@/views/Records.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import Myself from '@/views/Myself.vue';


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/labels'
  },
  {
    path: '/records',
    name: 'Records',
    component: Records
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
    path: '/myself',
    name: 'Myself',
    component: Myself
  }
];

const router = new VueRouter({
  routes
});

export default router;