<template>
  <nav>
    <ul>
      <NavElement
        text="All"
        :index="SHOW_LIST_TYPES.ALL"
        :showListType="showListType"
        underlineColor="rgb(255, 81, 203)"
        @changeShowListType="changeShowListType"
      />

      <NavElement
        text="Active"
        :index="SHOW_LIST_TYPES.ACTIVE"
        :showListType="showListType"
        underlineColor="rgb(97, 97, 255)"
        @changeShowListType="changeShowListType"
      />

      <NavElement
        text="Completed"
        :index="SHOW_LIST_TYPES.COMPLETED"
        :showListType="showListType"
        underlineColor="rgb(226, 226, 226)"
        @changeShowListType="changeShowListType"
      />
    </ul>
  </nav>
</template>

<script>
import NavElement from "./NavElement";
import { SHOW_LIST_TYPES } from "../constants";

export default {
  name: "Navigation",
  components: {
    NavElement,
  },
  props: {
    showListType: Number,
  },
  data: function() {
    return { SHOW_LIST_TYPES };
  },
  methods: {
    changeShowListType: function(type) {
      this.$emit("changeShowListType", type);
    },
  },
};
</script>

<style scoped>
nav {
  border-bottom: 1px solid rgb(180, 180, 180);
}

nav ul {
  height: 35px;
  list-style: none;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
