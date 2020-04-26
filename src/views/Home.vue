<template lang="pug">
  div.d-flex.home
    div.green.sidebar
    div.blue.flex-grow-1
      router-link(to='/search') search 
      router-link(to='/about') about
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style scoped>
.home {
  height: 100%;
}
.sidebar {
  width: 400px;
}
</style>
