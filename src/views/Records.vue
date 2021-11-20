<template>
  <div class="records-wrapper">

    <div class="number-pad">
      <div class="output">100</div>
      <div class="buttons">
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button class="delete">
          <Icon name="delete"/>
        </button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button class="clear">清空</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button class="finished">完成</button>
        <button class="zero">0</button>
        <button>.</button>
      </div>
    </div>

    <div>
      <label class="comments">
        <input type="text" placeholder="备注">
      </label>
    </div>

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

.records-wrapper {
  display: flex;
  flex-direction: column-reverse;
}

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

.number-pad {
  .output {
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    color: $color-background;
  }

  // Grid 布局
  .buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 56px);
    grid-gap: 4px;
    grid-template-areas:
        "a b c d"
        "e f g h"
        "i j k finished"
        "zero zero l finished";
    padding: 8px 4px;
    background: #d5d8dc;

    > button {
      border: none;
      border-radius: 6px;
      background: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;

      &.delete {
        background: #ffffff;

        .icon {
          width: 32px;
          height: 32px;
          color: #333;
        }
      }

      &.clear {
        background: #ffffff;
      }

      &.finished {
        grid-area: finished;
        background: $color-background;
      }

      &.zero {
        grid-area: zero;

      }
    }
  }


  // float 布局
  /*
  .buttons {
    @extend %clearFix;

    > button {
      width: 25%;
      height: 56px;
      float: left;
      background: transparent;
      border: none;

      &.finished {
        float: right;
        height: 56*2px;
      }

      &.zero {
        width: 25%*2;
      }

      $bg: #f2f2f2;

      &:nth-child(1) {
        background: $bg;
      }

      &:nth-child(2), &:nth-child(5) {
        background: darken($bg, 4%);
      }

      &:nth-child(3), &:nth-child(6), &:nth-child(9) {
        background: darken($bg, 4*2%);
      }

      &:nth-child(4), &:nth-child(7), &:nth-child(10), &:nth-child(13) {
        background: darken($bg, 4*3%);
      }

      &:nth-child(8), &:nth-child(11), &:nth-child(13) {
        background: darken($bg, 4*4%);
      }

      &:nth-child(12) {
        background: darken($bg, 4*6%);
      }

      &:nth-child(14) {
        background: darken($bg, 4*5%);
      }
    }
  }

   */
}

</style>