import recordListModel from '@/model/recordListModel';
import tagListModel from '@/model/tagListModel';

const store:store = {
  // record store
  recordList: recordListModel.fetch(),
  createRecord: (record) => recordListModel.create(record),

  // tag store
  tagList: tagListModel.fetch(),
  findTag (id) {
    return this.tagList.filter(tag => tag.id === id)[0];
  },
  createTag: (name) => {
    const message = tagListModel.create(name);
    if (message === 'duplicated') {
      window.alert('标签名重复了');
    } else if (message === 'success') {
      window.alert('标签添加成功');
    }
  },
  removeTag: (id) => {
    return tagListModel.remove(id);
  },
  updateTag: (id, name) => {
    return tagListModel.update(id, name);
  }
}
export default store