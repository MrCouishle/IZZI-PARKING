<template>
  <v-app :style="{ background: '#eceef9' }">
    <spinner />
    <router-view />
  </v-app>
</template>

<script>
import spinner from "../src/components/Spinner.vue";
export default {
  name: "App",
  components: {
    spinner,
  },
  data: () => ({}),
};
</script>
<style lang="scss">
@import "./assets/app/style";
</style>
