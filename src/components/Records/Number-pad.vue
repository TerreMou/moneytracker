<template>
  <div class="number-pad">
    <div class="output">{{ display }}</div>
    <div class="buttons">
      <button @click=" inputContent ">1</button>
      <button @click=" inputContent ">2</button>
      <button @click=" inputContent ">3</button>
      <button @click=" deleteContent " class="delete">
        <Icon name="delete"/>
      </button>
      <button @click=" inputContent ">4</button>
      <button @click=" inputContent ">5</button>
      <button @click=" inputContent ">6</button>
      <button @click=" clearContent " class="clear">清空</button>
      <button @click=" inputContent ">7</button>
      <button @click=" inputContent ">8</button>
      <button @click=" inputContent ">9</button>
      <button @click=" finishedContent " class="finished">完成</button>
      <button @click=" inputContent " class="zero">0</button>
      <button @click=" inputContent ">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  display = '0';

  inputContent(event: MouseEvent): void {
    const button = event.target as HTMLButtonElement;
    const input = button.textContent as string;
    if (this.display.length === 16) {return;}
    if (this.display === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.display = input;
      } else {
        this.display += input;
      }
      return;
    }
    if (this.display.indexOf('.') >= 0 && input === '.') {return;}
    this.display += input;
  }

  deleteContent(): void {
    if (this.display.length === 1) {
      this.display = '0';
    } else {
      this.display = this.display.slice(0, -1);
    }
  }

  clearContent(): void {
    this.display = '0';
  }

  finishedContent():void {
    this.$emit('update:value', this.display)
  }

}
</script>

<style lang="scss" scoped>
@import "../../assets/style/helper.scss";

.number-pad {
  .output {
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    color: $color-background;
    height: 72px;
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
      color: #333;
      font-size: 18px;

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