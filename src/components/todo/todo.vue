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
          @click="filter = 'all'"
        >
          All
        </a-button>
        <a-button
          size="small"
          :class="{ active: filter === 'completed' }"
          @click="filter = 'completed'"
        >
          completed
        </a-button>
        <a-button
          size="small"
          :class="{ active: filter === 'active' }"
          @click="filter = 'active'"
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
      idFor: 3,
      filter: "all",
      toDos: [
        {
          id: 1,
          title: "Start a Meditation Practice.",
          complete: false,
          editState: false
        },
        {
          id: 2,
          title: "be a creative developer",
          complete: false,
          editState: false
        }
      ]
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
      this.toDos.push({
        id: this.idFor,
        title: this.newTodo,
        editState: false,
        complete: false
      });
      this.newTodo = "";
      this.idFor++;
    },
    remove(index) {
      this.toDos.splice(index, 1);
    },
    changeEditState(todo) {
      this.beforeEditCache = todo.title;
      todo.editState = true;
    },
    checkAllItems() {
      this.toDos.forEach(todo => (todo.complete = event.target.checked));
    },
    clearCompleted() {
      this.toDos = this.toDos.filter(todo => !todo.complete);
    },
    finishEditing(data) {
      console.log("data:", data);
      this.toDos.splice(data.index, 1, data.toDos);
    }
  },
  computed: {
    remaining() {
      return this.toDos.filter(todo => !todo.complete).length;
    },
    anyRemaining() {
      return this.remaining !== 0;
    },

    todosFiltered() {
      switch (this.filter) {
        case "all":
          return this.toDos;
        case "active":
          return this.toDos.filter(el => !el.complete);
        case "completed":
          return this.toDos.filter(el => el.complete);
        default:
          return this.toDos;
      }
    },
    showClearCompleted() {
      return this.toDos.filter(todo => todo.complete).length > 0;
    }
  }
};
</script>

<style scoped lang="scss">
@import "./todo.scss";
</style>
