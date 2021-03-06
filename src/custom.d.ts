type RecordItem = {
  type: string
  comments: string
  amount: number
  createdTime?: string
  tags: Tag[]
}
type Tag = {
  id: string;
  name: string;
}

type tagStore = {
  // tag store
  tagList: Tag[];
  fetchTags: () => Tag[]
  findTag: (id: string) => Tag | undefined;
  createTag: (name: string) => void;
  removeTag: (id: string) => boolean;
  updateTag: TagListModel['update'];
  saveTags: () => void;
}


