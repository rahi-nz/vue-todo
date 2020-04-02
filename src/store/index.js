import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
  },
  mutations: {
    addTodo(state, toDos) {
      state.toDos.push({
        id: toDos.id,
        title: toDos.title,
        complete: toDos.complete,
        editState: toDos.editState
      });
    },
    remove(state, index) {
      state.toDos.splice(index, 1);
    },
    editDone(state, data) {
      const index = state.toDos.findIndex(item => item.id === data.id);
      state.toDos.splice(index, 1, {
        id: data.id,
        title: data.title,
        complete: data.complete,
        editState: data.editState
      });
      this.editState = false;
    },
    checkAllItems(state) {
      state.toDos.forEach(todo => (todo.complete = event.target.checked));
    },
    clearCompleted(state) {
      state.toDos = state.toDos.filter(todo => !todo.complete);
    }
  },
  actions: {},
  modules: {},
  getters: {
    remaining(state) {
      return state.toDos.filter(todo => !todo.complete).length;
    },
    anyRemaining(state, getters) {
      return getters.remaining !== 0;
    },

    todosFiltered(state) {
      switch (state.filter) {
        case "all":
          return state.toDos;
        case "active":
          return state.toDos.filter(el => !el.complete);
        case "completed":
          return state.toDos.filter(el => el.complete);
        default:
          return state.toDos;
      }
    },
    showClearCompleted(state) {
      return state.toDos.filter(todo => todo.complete).length > 0;
    }
  }
});
