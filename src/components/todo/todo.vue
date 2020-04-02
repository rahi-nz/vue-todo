<template>
  <div class="wrapper">
    <a-input
      class="todo-input"
      type="text"
      placeholder="what need to be done"
      v-model="newTodo"
      @blur="addTodo"
      @keyup.enter="addTodo"
    />
    <transition-group
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <todo-item
        v-for="(todo, index) in todosFiltered"
        v-bind:key="todo.id"
        :todo="todo"
        :index="index"
        :checkAll="!anyRemaining"
        @remove="remove"
        @finishEditing="finishEditing"
      >
      </todo-item>
    </transition-group>
    <a-divider />
    <div class="details">
      <div>
        <a-checkbox
          type="checkbox"
          :checked="!anyRemaining"
          @change="checkAllItems"
          >select all</a-checkbox
        >
      </div>
      <div>{{ remaining }} left item</div>
    </div>
    <a-divider />
    <div class="extra-container">
      <div class="filter">
        <a-button
          size="small"
          :class="{ active: filter === 'all' }"
          @click="changeFilter('all')"
        >
          All
        </a-button>
        <a-button
          size="small"
          :class="{ active: filter === 'completed' }"
          @click="changeFilter('completed')"
        >
          completed
        </a-button>
        <a-button
          size="small"
          :class="{ active: filter === 'active' }"
          @click="changeFilter('active')"
        >
          Active
        </a-button>
      </div>
      <transition name="fade">
        <a-button
          size="small"
          class="showClearCompleted"
          v-if="showClearCompleted"
          @click="clearCompleted"
        >
          clear completed
        </a-button>
      </transition>
    </div>
  </div>
</template>

<script>
import todoItem from "../todoItem/todoItem";
export default {
  name: "todo",
  data() {
    return {
      newTodo: "",
      beforeEditCache: "",
      idFor: 3
    };
  },
  components: {
    todoItem
  },
  methods: {
    addTodo() {
      if (!this.newTodo.trim()) {
        return;
      }
      this.$store.commit("addTodo", {
        id: this.idFor,
        title: this.newTodo,
        editState: false,
        complete: false
      });
      this.newTodo = "";
      this.idFor++;
    },
    changeEditState(todo) {
      this.beforeEditCache = todo.title;
      todo.editState = true;
    },
    checkAllItems() {
      this.$store.commit("checkAllItems");
    },
    clearCompleted() {
      this.$store.commit("clearCompleted");
    },
    changeFilter(filter) {
      this.$store.state.filter = filter;
    }
  },
  computed: {
    filter() {
      return this.$store.state.filter;
    },
    toDos() {
      return this.$store.state.toDos;
    },
    remaining() {
      return this.$store.getters.remaining;
    },
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    },

    todosFiltered() {
      return this.$store.getters.todosFiltered;
    },
    showClearCompleted() {
      return this.$store.getters.showClearCompleted;
    }
  }
};
</script>

<style scoped lang="scss">
@import "./todo.scss";
</style>
