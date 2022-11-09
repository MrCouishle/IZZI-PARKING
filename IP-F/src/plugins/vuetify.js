import Vuetify from "vuetify/lib/framework";
import es from "vuetify/lib/locale/es";
import Vue from "vue";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#0D1A64",
        secondary: "#c72a75",
        tertiary: "5252e8",
        background: "#ececf5",
        accent: "#2B2578",
        error: "#cc0000",
        info: "#0D1A64",
        salir: "#09696e",
        success: "#4BB543",
        warning: "#FFC107",
      },
    },
  },
  lang: {
    locales: { es },
    current: "es",
  },
});
