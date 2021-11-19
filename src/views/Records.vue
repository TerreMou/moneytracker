<template>
  <div>

    <header>
      <div class="title">
        <div class="backspace" @click="goBack">
          <Icon name="goBack"/>
        </div>
        <div class="pageTitle">记账</div>
      </div>
      <div>
        <ul class="types">
          <li class="selected">支出</li>
          <li>收入</li>
        </ul>
      </div>
    </header>

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

    <div>
      <label class="comments">
        <input type="text" placeholder="备注">
      </label>
    </div>

    <div>
      <div>金额显示栏</div>
    </div>

    <div>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>+*#</button>
      <button>0</button>
      <button>delete</button>
    </div>

  </div>
</template>

<script lang="ts">
export default {
  name: 'Record',
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
@import "../assets/style/helper.scss";

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

.tags {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 16px 4px;

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

    > .icon {
      width: 28px;
      height: 28px;
    }
  }
}

.comments {
  display: flex;
  font-size: 14px;

  > input {
    border: none;
    height: 40px;
    flex-grow: 1;
    padding-left: 16px;
    background: #f8f9f9;
  }
}


</style>