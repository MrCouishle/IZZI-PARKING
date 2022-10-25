<template>
  <v-container filled>
    <v-card elevation="24" width="200" shaped>
      <v-container>
        <v-card class="ma-2 text-title" dark width="80" color="green" label text-color="white">
          <v-icon left> mdi-checkbox-multiple-marked-circle </v-icon>
          Libre
        </v-card>

        <v-card class="ma-2 text-title" dark width="80" close color="red" label text-color="white">
          <v-icon left> mdi-close-octagon </v-icon>
          Uso.
        </v-card>
        <v-card class="ma-2 text-title" dark width="130" color="orange" label text-color="white">
          <v-icon left> mdi-gesture-spread </v-icon>
          Reservado
        </v-card>
      </v-container>
    </v-card>

    <v-row>
      <v-col cols="12" sm="12">
        <v-card elevation="24" color="primary" dark class="mx-auto ma-4" width="300">
          <h3 class="white--text text-center text-md-h5 ma-1 text-caption zoomIt">Parqueadero de carros</h3>
        </v-card>
        <v-card shaped elevation="24" width="800" class="mx-auto">
          <v-list flat transition="fab-transition">
            <v-list-item-group shaped>
              <v-row justify="space-around" class="ma-5">
                <v-list rounded flat transition="scale-transition">
                  <v-list-item-group>
                    <v-row justify="space-around">
                      <v-menu v-for="(item, i) in _getStation('get_station')" :key="i" offset-y>
                        <template v-slot:activator="{}">
                          <v-hover v-slot="{ hover }" open-delay="10">
                            <v-card :elevation="hover ? 24 : 0" width="92" height="47" shaped outline style="margin: 2px" color="white">
                              <v-divider></v-divider>
                              <v-btn
                                width="20"
                                text
                                :color="item.estado == 0 ? 'green' : item.estado == 1 ? 'red' : 'orange'"
                                class="mx-4 my-2 zoomIt"
                              >
                                <v-icon>mdi-car </v-icon>
                                <h4>-{{ item.text }}</h4>
                              </v-btn>
                            </v-card>
                          </v-hover>
                        </template>
                      </v-menu>
                    </v-row>
                  </v-list-item-group>
                </v-list>
              </v-row>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "puestosdisponibles",
  data: () => ({
    color: "",
    Visible: false,
    puestosmotos: [],
  }),
  computed: {
    ...mapGetters({ _getStation: "parking/_getStation" }),
  },
  components: {},

  methods: {
    ...mapActions({
      _loadStation: "parking/_loadStation",
    }),
  },
  mounted() {
    this._loadStation();
  },
};
</script>
