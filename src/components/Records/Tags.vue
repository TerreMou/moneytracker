<template>
  <ul class="tags">
    <li>
      <Icon name="food"/>
      食物
    </li>
    <li>
      <Icon name="shopping"/>
      购物
    </li>
    <li>
      <Icon name="bus"/>
      出行
    </li>
    <li>
      <Icon name="others"/>
      其他
    </li>
    <li>
      <button class="add">
        <Icon name="add"/>
        新增
      </button>
    </li>
  </ul>

</template>

<script lang="ts">
export default {
  name: 'Tags'
};
</script>

<style lang="scss" scoped>
.tags {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin: 16px 4px;
  flex-grow: 1;


  > li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    width: 50px;
    height: 50px;

    > .icon {
      width: 28px;
      height: 28px;
    }
  }

  .add {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background: transparent;
    border: none;
    color: #333;

    > .icon {
      width: 28px;
      height: 28px;
    }
  }
}

</style>