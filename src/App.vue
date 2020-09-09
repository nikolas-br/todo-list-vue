<template>
  <div class="App">
    <header>
      <h2>#toDo</h2>
    </header>

    <Navigation
      @changeShowListType="changeShowListType"
      :showListType="showListType"
    />

    <form @submit.prevent="addEntry">
      <input v-model="entry" value="entry" />
      <button type="submit">+</button>
    </form>

    <AllList
      v-if="showListType === SHOW_LIST_TYPES.ALL"
      :list="list"
      @toggleActive="toggleActive"
    />

    <ActiveList
      v-if="showListType === SHOW_LIST_TYPES.ACTIVE"
      :list="activeList"
      @toggleActive="toggleActive"
    />

    <CompletedList
      v-if="showListType === SHOW_LIST_TYPES.COMPLETED"
      :list="completedList"
      @toggleActive="toggleActive"
      @removeItem="removeItem"
    />

    <a class="blogLink" href="https://www.nikolas-blog.com">
      nikolas-blog.com
    </a>
  </div>
</template>

<script>
import Navigation from "./components/Navigation";
import AllList from "./components/AllList";
import ActiveList from "./components/ActiveList";
import CompletedList from "./components/CompletedList";
import { SHOW_LIST_TYPES, DEMO_ENTRIES } from "./constants";
import MyWebStorageAPI from "./WebStorageAPI";

const myWebStorage = new MyWebStorageAPI();
let showListType = SHOW_LIST_TYPES.ALL;
let list = DEMO_ENTRIES;
let entry = "";

export default {
  name: "App",
  components: {
    Navigation,
    AllList,
    ActiveList,
    CompletedList,
  },
  mounted: function() {
    const storedList = myWebStorage.getList();
    if (!storedList.length) return;

    this.list = storedList;
  },
  data: function() {
    return { showListType, list, entry, SHOW_LIST_TYPES };
  },
  methods: {
    changeShowListType: function(type) {
      this.showListType = type;
    },
    toggleActive: function(id) {
      this.list.forEach((e) => {
        if (e.id === id) e.isActive = !e.isActive;
      });

      myWebStorage.saveList(this.list);
    },
    removeItem: function(id) {
      const newList = this.list.filter((e) => e.id !== id);
      myWebStorage.saveList(newList);

      this.list = newList;
    },
    addEntry: function() {
      if (!this.entry.length) return;

      const newEntry = {
        text: this.entry,
        isActive: true,
        id: this.entry + Math.random(),
      };
      this.list.push(newEntry);
      this.entry = "";

      if (this.showListType === SHOW_LIST_TYPES.COMPLETED)
        this.showListType = SHOW_LIST_TYPES.ACTIVE;

      myWebStorage.saveList(this.list);
    },
  },
  computed: {
    activeList: function() {
      return this.list.filter((e) => e.isActive);
    },
    completedList: function() {
      return this.list.filter((e) => !e.isActive);
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap");

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: "Poppins", sans-serif;
}

.App {
  max-width: 520px;
  margin: auto;
  margin-top: 100px;
  padding: 20px;
  color: rgb(78, 78, 78);
}

header {
  font-size: 3rem;
  text-align: center;
  font-style: italic;
  margin-bottom: 50px;
}

header h2 {
  background: -webkit-linear-gradient(
    30deg,
    rgb(97, 97, 255),
    rgb(255, 81, 203)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

form {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

form input {
  width: 100%;
  font-size: 1rem;
  padding-left: 10px;
  border-radius: 10px;
  margin-right: 10px;
  color: rgb(97, 97, 255);
  font-style: italic;
  border: 1px solid grey;
}

form input:focus {
  outline: none;
}

form button {
  width: 60px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background-color: rgb(97, 97, 255);
  color: white;
  font-size: 1.5rem;
}

form button:focus {
  outline: none;
}

form button:hover {
  cursor: pointer;
}

.blogLink {
  display: flex;
  justify-content: center;
  margin-top: 200px;
}

@media only screen and (max-width: 500px) {
  .App {
    margin-top: 20px;
  }
}
</style>
