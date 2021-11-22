<template>
  <div>
    <label class="comments">
      <input type="text" placeholder="备注">
    </label>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Comments'
};
</script>

<style lang="scss" scoped>
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