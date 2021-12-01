import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';

Vue.use(Vuex) // 把 store 绑到 Vue.prototype.$store = store

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[]
  },
  mutations: {
    fetchRecords(state): void {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]')
    },
    createRecord(state, record): void {
      const record2: RecordItem = clone(record);
      record2.createdTime = new Date();
      state.recordList.push(record2);
      store.commit('saveRecords');
    },
    saveRecords(state): void {
      window.localStorage.setItem('recordList',
        JSON.stringify(state.recordList));
    },
  },
});

export default store;
