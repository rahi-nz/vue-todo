<template>
  <div class="todo-item">
    <div class="item-wrapper">
      <a-checkbox v-model="complete" @change="editDone" />
      <div
        v-if="!editState"
        @dblclick="changeEditState"
        :class="{ complete: complete }"
      >
        {{ title }}
      </div>
      <a-input
        v-else
        v-focus
        type="text"
        v-model="title"
        @blur="editDone"
        @keyup.enter="editDone"
        @keyup.esc="cancelEdit"
      />
    </div>
    <div class="actions">
      <a-icon
        class="icons"
        type="delete"
        v-if="!editState"
        @click="remove(index)"
      />
      <a-icon
        class="icons"
        type="edit"
        v-if="!editState"
        @click.once="changeEditState"
      />
      <a-icon class="icons" type="check" v-if="editState" @click="editDone" />
      <a-icon class="icons" type="close" v-if="editState" @click="cancelEdit" />
    </div>
  </div>
</template>

<script>
export default {
  name: "todo-item",
  props: {
    todo: {
      type: Object,
      require: true
    },
    index: {
      type: Number,
      require: true
    },
    checkAll: {
      type: Boolean,
      require: true
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      editState: this.todo.editState,
      complete: this.todo.complete,
      beforeEditCache: ""
    };
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },
  watch: {
    // watches for props change
    checkAll() {
      this.complete = this.checkAll ? true : this.todo.complete;
    }
  },
  methods: {
    remove(index) {
      this.$store.commit("remove", index);
    },
    changeEditState() {
      this.beforeEditCache = this.title;
      this.editState = true;
    },
    editDone() {
      if (!this.title.trim()) {
        this.title = this.beforeEditCache;
      }
      this.$store.commit("editDone", {
        id: this.id,
        title: this.title,
        complete: this.complete,
        editState: this.editState
      });
      this.editState = false;
    },
    cancelEdit() {
      this.title = this.beforeEditCache;
      this.editState = false;
    }
  }
};
</script>

<style scoped lang="scss">
@import "./todoItem";
</style>
