<template>
  <v-app :style="{ background: '#eceef9' }">
    <AppBar />
    <Nav />
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar";
import Nav from "@/components/Nav";
export default {
  name: "Home",
  components: {
    AppBar,
    Nav,
  },
};
</script>
