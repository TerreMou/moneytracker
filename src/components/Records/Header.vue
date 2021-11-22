<template>
  <header>
    <div class="title">
      <div class="backspace" @click="goBack">
        <Icon name="goBack"/>
      </div>
      <div class="pageTitle">记账</div>
    </div>

    <ul class="types">
      <li class="selected">支出</li>
      <li>收入</li>
    </ul>
  </header>

</template>

<script lang="ts">
export default {
  name: 'Header',
  methods: {
    // 后退到上一个页面
    goBack() {
      this.$router.go(-1);
      console.log(this);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

header {
  padding-top: 2px;
}

.title {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;

  > .backspace {
    > .icon {
      height: 28px;
      width: 28px;
    }
  }

  > .pageTitle {
    position: absolute;
    width: 60px;
    top: 0;
    left: 50%;
    margin-left: -30px;
    font-size: 1.2em;
    text-align: center;
  }
}

.types {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px 0;

  > li {
    border: 1px solid #020202;
    border-radius: 3px;
    width: 20%;

    &.selected {
      background: $color-highlight;
    }
  }
}

</style>