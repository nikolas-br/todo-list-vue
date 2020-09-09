<template>
  <div class="completedList">
    <div class="itemWrapper" v-for="item of list" v-bind:key="item.id">
      <div class="item" @click="() => toggle(item.id)">
        {{ item.text }}
      </div>
      <div class="deleteButton" @click="() => remove(item.id)">
        Delete
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompletedList",
  props: {
    list: Array,
    toggleActive: Function,
    removeItem: Function,
  },
  methods: {
    toggle: function(id) {
      this.$emit("toggleActive", id);
    },
    remove: function(id) {
      this.$emit("removeItem", id);
    },
  },
};
</script>

<style scoped>
.completedList {
  margin-top: 20px;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
}

.completedList .itemWrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.completedList .item {
  padding: 10px;
  display: flex;
  flex: 1;
  margin-right: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  border: 1px solid rgb(226, 226, 226);
  border-radius: 10px;
}

.completedList .itemCompleted {
  background-color: rgb(226, 226, 226);
  opacity: 0.3;
  color: black;
}

.completedList .item:hover {
  border: 1px solid rgb(97, 97, 255);
  cursor: pointer;
}

.completedList .itemWrapper .deleteButton {
  width: 60px;
  height: 50px;
  border-radius: 10px;
  background-color: rgb(255, 81, 203);
  color: white;
  font-size: 15px;
  text-align: center;
  padding-top: 12px;
}

.completedList .itemWrapper .deleteButton:hover {
  cursor: pointer;
}
</style>
