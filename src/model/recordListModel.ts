import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';
const recordListModel = {
  data: [] as RecordItem[],
  create(record: RecordItem): void {
    const recordCopy: RecordItem = clone(record)
    recordCopy.createdTime = new Date();
    this.data.push(recordCopy);
  },
  fetch(): RecordItem[] {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },
  save(): void {
    window.localStorage.setItem('recordList', JSON.stringify(this.data));
  }
};
export default recordListModel;