import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export class TagHelper extends Vue {
  createTag() {
    const name = window.prompt('请输入标签名');
    if (name === null) {return;} // 当用户直接点击取消的话，prompt 返回一个 null
    if (name === '') {
      return window.alert('标签名不能为空');
    } else {
      this.$store.commit('createTag', name);
    }
  }
}