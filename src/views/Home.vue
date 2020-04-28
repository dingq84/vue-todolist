<template lang="pug">
  div
    router-link(to='/search') search 
    router-link(to='/about') about
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>
