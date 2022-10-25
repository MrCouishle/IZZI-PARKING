<template>
  <div>
    <v-navigation-drawer fixed expand-on-hover permanent class="mt-16">
      <v-list>
        <div v-for="(item, index) in menu" :key="index">
          <v-list-item v-if="!item.sub" link :to="item.to" exact>
            <v-list-item-icon class="mr-3 my-3">
              <v-icon size="23" :color="item.icon_color" class="botone">{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-title">
              <h5>{{ item.text }}</h5>
            </v-list-item-title>
          </v-list-item>
          <v-list-group v-else>
            <template v-slot:activator>
              <v-list-item-icon class="mr-3 my-3">
                <v-icon size="23" :color="item.icon_color" class="botone">{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="text-title">
                <h5>{{ item.text }}</h5>
              </v-list-item-title>
            </template>
            <v-list-item link v-for="(el, index) in item.sub" :key="'sub-' + index" exact :to="el.to">
              <v-list-item-icon class="mr-3 my-3">
                <v-icon size="23" :color="el.icon_color" class="botone">{{ el.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="text-title">
                <h5>{{ el.text }}</h5>
              </v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-divider color="black" class="mx-2"></v-divider>
        </div>
        <v-divider vertical></v-divider>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { current_user } from "@/global";
import Menu from "@/menus/menu.json";

export default {
  name: "Nav",
  data: () => ({
    current_user: current_user,
    menu: [],
  }),
  created() {
    ["SP", "ADMIN"].includes(this.current_user.level_user)
      ? (this.menu = JSON.parse(JSON.stringify(Menu.menu_admin)))
      : (this.menu = JSON.parse(JSON.stringify(Menu.menu_user)));
  },
};
</script>
<style>
.sticky {
  position: sticky;
  top: 0px;
  z-index: 1;
}
</style>
