<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card @keydown="checkKey">
      <v-col cols="12" sm="12" md="12">
        <v-row>
          <v-form class="mx-auto" ref="form" v-model="valid" lazy-validation style="margin-top: 10px; margin-bottom: 50px">
            <v-card-title class="primary--text" justify="center">
              Crea una cuenta en Izzi Parking &nbsp;
              <v-icon color="primary">mdi-car-hatchback</v-icon>
            </v-card-title>
            <v-text-field
              ref="nombre"
              prepend-icon="mdi-account-details-outline"
              autofocus
              v-model="nombre"
              :counter="30"
              v-on:keydown.enter="pasoapellido()"
              :rules="nombreRules"
              label="Nombres"
              required
              maxlength="31"
            ></v-text-field>
            <v-text-field
              ref="apellido"
              v-on:keydown.enter="pasoemail()"
              prepend-icon="mdi-account-details"
              v-model="apellido"
              :counter="30"
              :rules="apellidoRules"
              label="Apellidos"
              required
            ></v-text-field>

            <v-text-field
              ref="email"
              v-on:keydown.enter="pasopassword()"
              v-model="email"
              :rules="emailRules"
              label="Correo Electronico"
              required
              prepend-icon="mdi-email"
            ></v-text-field>

            <v-text-field
              ref="password"
              v-on:keydown.enter="pasopasswordconfir()"
              v-model="contraseña"
              required
              maxlength="15"
              :rules="contraseñaRules"
              placeholder="Ingresa Contraseña"
              counter="15"
              label="Contraseña"
              color="primary"
              autocomplete="true"
              prepend-icon="mdi-lock"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <v-text-field
              ref="passwordcon"
              v-model="confirmarContraseña"
              required
              maxlength="15"
              :rules="[() => contraseña == confirmarContraseña || 'La contraseña no coinciden']"
              placeholder="Ingresa Contraseña"
              counter="15"
              label="Confirmar contraseña"
              color="primary"
              autocomplete="true"
              prepend-icon="mdi-lock"
              :type="showPassword1 ? 'text' : 'password'"
              :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword1 = !showPassword1"
              style="margin-bottom: 30px"
            ></v-text-field>
            <v-btn text :disabled="!valid" color="success" class="mr-1" @click="saveUser" :loading="isLoading">
              Crear&nbsp;
              <v-icon small>mdi-account-plus</v-icon>
            </v-btn>
            <v-btn text x-small color="primary" class="mr-1" @click="reset">
              Limpiar
              <v-icon small>mdi-file-refresh-outline</v-icon>
            </v-btn>
            <v-btn text x-small color="error" @click="aceptar">
              ¿Tienes cuenta?&nbsp;
              <v-icon small>mdi-exit-run</v-icon>
            </v-btn>
          </v-form>
        </v-row>
      </v-col>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapMutations, mapState, mapActions } from "vuex";

export default {
  name: "dialogo_registrar",
  data: () => ({
    valid: true,
    showPassword: false,
    showPassword1: false,
    nombre: "",
    nombreRules: [(v) => !!v || "Nombre es requerido", (v) => (v && v.length <= 30) || "Nombre no puede tener mas de 30 letras"],
    apellido: "",
    apellidoRules: [(v) => !!v || "Apellido es requerido", (v) => (v && v.length <= 30) || "Apellido no puede tener mas de 30 letras"],
    contraseña: "",
    contraseñaRules: [
      (v) => !!v || "Contraseña es requerida",
      (v) => (v && v.length <= 30) || "Contraseña no valida",
      (v) => (v && v.length >= 5) || "Contraseña muy corta",
    ],
    confirmarContraseña: "",
    email: "",
    emailRules: [(v) => !!v || "Correo es requerido", (v) => /.+@.+\..+/.test(v) || "Correo invalido"],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
  }),
  props: {
    dialog: Boolean,
  },

  computed: { ...mapState("journal", ["isLoading"]) },
  methods: {
    pasoapellido() {
      this.$refs.apellido.focus();
    },
    pasoemail() {
      this.$refs.email.focus();
    },
    pasopassword() {
      this.$refs.password.focus();
    },
    pasopasswordconfir() {
      this.$refs.passwordcon.focus();
    },
    async saveUser() {
      await this.validate();

      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Guardando usuarios");
      this.cargar();
    },
    ...mapMutations("journal", ["cargar"]),
    ...mapMutations("journal", ["cargartrue"]),

    aceptar() {
      this.$emit("cancelarSalir");
    },

    salir() {
      this.$router.push("/login");
    },
    cancelar() {
      this.$emit("cancelarSalir");
    },

    validate() {
      this.cargartrue();
      return this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },

  created() {
    console.log("DialogRegistrarCuenta", this.dialog);
  },
  watch: {
    dialog() {
      if (!this.dialog) return;
      requestAnimationFrame(() => {
        this.$refs.select.$el.focus();
      });
    },
  },
};
</script>
