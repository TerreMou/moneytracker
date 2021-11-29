type RecordItem = {
  type: string
  comments: string
  amount: number
  createdTime?: Date
  tags: string[]
}
type Tag = {
  id: string;
  name: string;
}

type TagListModel = {
  data: Tag[];
  fetch: () => Tag[];
  create: (name: string) => 'success' | 'duplicated'; // 联合类型
  update: (id: string, name: string) => 'success' | 'duplicated' | 'not_found'
  remove: (id: string) => boolean
  save: () => void
}

// 注意 Window 大写
interface Window {
  tagList: Tag[];
  findTag: (id: string) => Tag | undefined;
  createTag: (name: string) => void;
  removeTag: (id: string) => boolean;
  updateTag: TagListModel['update']
}