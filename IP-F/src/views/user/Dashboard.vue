<template>
  <v-container fluid>
    <v-row justify="center" class="pt-4 ml-16 mr-2">
      <v-col cols="12" lg="12" sm="12" md="12">
        <v-card elevation="4">
          <v-card-text class="text-title primary--text mt-0">
            <h3 class="text-start">
              <v-icon color="primary" class="mb-1">mdi-account-circle</v-icon>
              Inicio > Bienvenido {{ name_complete }}
            </h3>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="12" md="12" sm="12">
        <v-card elevation="4" @click="$router.push('/scan-point')">
          <v-alert border="top" colored-border type="info" elevation="4">
            <lottie-animation
              :animationData="welcome"
              class="mx-auto botone"
              style="height: 150px"
              ref="anim_user"
              :autoPlay="true"
              id="anim_user"
              :loop="true"
              :speed="2"
              content
            />
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import welcomes from "@/assets/image/segurity.json";
import LottieAnimation from "lottie-web-vue";
import { current_user } from "@/global";

export default {
  data: () => ({
    name: `${current_user.name} ${current_user.last_name}`,
    welcome: welcomes,
  }),
  components: {
    LottieAnimation,
  },
  computed: {
    name_complete() {
      let name = this.name.split(" ");
      name = name.map((p) => p[0].toUpperCase() + p.slice(1).toLowerCase());
      return name.join(" ");
    },
  },
};
</script>

<style></style>
