<template>
  <div class="list">
    <div
      v-for="item of list"
      :class="[item.isActive ? 'item' : 'item itemCompleted']"
      @click="() => toggle(item.id)"
      v-bind:key="item.id"
    >
      <label :style="[item.isActive ? {} : { textDecoration: 'line-through' }]">
        {{ item.text }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllList",
  props: {
    list: Array,
    toggleActive: Function,
  },
  methods: {
    toggle: function(id) {
      this.$emit("toggleActive", id);
    },
  },
};
</script>

<style scoped>
.list {
  margin-top: 20px;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
}

.list .item {
  margin-top: 10px;
  padding: 10px;
  display: flex;
  /* flex-direction: row; */
  justify-content: space-between;
  align-items: center;
  height: 50px;
  border: 1px solid rgb(226, 226, 226);
  border-radius: 10px;
  overflow: hidden;
}

.list .itemCompleted {
  background-color: rgb(226, 226, 226);
  opacity: 0.3;
  color: black;
}

.list .item:hover {
  border: 1px solid rgb(97, 97, 255);
  cursor: pointer;
}
</style>
