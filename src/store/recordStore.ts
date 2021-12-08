import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';

const recordStore = {
  recordList: [] as RecordItem[],
  fetchRecords(): RecordItem[] {
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.recordList;
  },
  saveRecords(): void {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
  },
  createRecord(record: RecordItem): void {
    const record2: RecordItem = clone(record);
    record2.createdTime = record2.createdTime || new Date().toISOString();
    this.recordList && this.recordList.push(record2);
    recordStore.saveRecords();
  },
};

recordStore.fetchRecords();

export default recordStore;