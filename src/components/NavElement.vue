<template>
  <li @click="changeShowListType" :style="styled">
    {{ text }}
  </li>
</template>

<script>
export default {
  name: "NavElement",
  props: {
    text: String,
    showListType: Number,
    index: Number,
    underlineColor: String,
  },
  methods: {
    changeShowListType: function() {
      this.$emit("changeShowListType", this.index);
    },
  },
  computed: {
    styled: function() {
      if (this.showListType !== this.index) return {};
      else
        return {
          borderBottom: "5px solid " + this.underlineColor,
          marginBottom: "-5px",
        };
    },
  },
};
</script>

<style scoped>
li {
  width: 100px;
  text-align: center;
  font-weight: 500;
}

li:hover {
  border-bottom: 5px solid rgb(226, 226, 226);
  margin-bottom: -5px;
  cursor: pointer;
}
</style>
