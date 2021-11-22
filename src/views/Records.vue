<template>
  <div class="records-wrapper">
    <Number-pad/>
    <Comments/>
    <Tags :data-source.sync="tags"/>
    <Header/>
  </div>
</template>

<script>
import NumberPad from '@/components/Records/Number-pad.vue';
import Comments from '@/components/Records/Comments.vue';
import Tags from '@/components/Records/Tags.vue';
import Header from '@/components/Records/Header.vue';

export default {
  name: 'Record',
  components: {Header, Tags, Comments, NumberPad},
  data(){
    return {
      tags: ['食物', '购物', '出行','其他']
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/helper.scss";

.records-wrapper {
  display: flex;
  flex-direction: column-reverse;
  min-height: 100vh;
}

</style>