const localStorageKeyName = 'recordList';
const recordListModel = {
  clone(data: RecordItem[] | RecordItem): RecordItem {
    return JSON.parse(JSON.stringify(data)) as RecordItem
  },
  fetch(): RecordItem[] {
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
  },
  save(data: RecordItem[]): void {
    window.localStorage.setItem('recordList', JSON.stringify(data))
  },
};
export default recordListModel