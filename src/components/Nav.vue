<template>
  <div class="navLarge">
      <router-link to="/records" class="item2">
        <Icon name="record"/>
      </router-link>
    <nav>
      <router-link to="/labels" class="item" active-class="selected">
        <Icon name="labels"/>
        明细
      </router-link>
      <router-link to="/statistics" class="item" active-class="selected">
        <Icon name="statistics"/>
        统计
      </router-link>
      <router-link to="/myself" class="item" active-class="selected">
        <Icon name="myself"/>
        我的
      </router-link>
    </nav>
  </div>
</template>

<script lang="ts">

export default {
  name: 'Nav'
};
</script>

<style lang="scss" scoped>
@import "../assets/style/helper.scss";

.navLarge {
  display: flex;
  flex-direction: column;
  > .item2 {
    .icon {
      width: 50px;
      height: 50px;
      margin-right: 16px;
      margin-bottom: 14px;
      color: $color-highlight;
    }
  }
}
.item2:first-child {
  align-self: flex-end;
}

nav {
  display: flex;
  flex-direction: row;
  font-size: 12px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);

  > .item {
    padding: 2px 0;
    width: 33.33333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .icon {
      width: 32px;
      height: 32px;
    }
  }

  > .item.selected {
    color: $color-highlight;
  }
}
</style>