<template>
  <a-locale-provider locale="locale">
    <div class="home">
      <todo></todo>
    </div>
  </a-locale-provider>
</template>

<script>
// @ is an alias to /src
import todo from "../components/todo/todo";
import Persian from "ant-design-vue/lib/locale-provider/fa_IR";

export default {
  name: "home",
  components: {
    todo
  },
  data() {
    return {
      locale: Persian
    };
  }
};
</script>
<style>
.home {
  width: 600px;
  margin: auto;
}
</style>
