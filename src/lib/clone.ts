function clone(data:unknown): RecordItem {
  return JSON.parse(JSON.stringify(data));
}
export default clone;