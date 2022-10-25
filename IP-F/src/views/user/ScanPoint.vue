<template>
  <v-container fluid>
    <v-row justify="center" class="pt-4 ml-16 mr-2">
      <v-col cols="12" lg="12" sm="12" md="12">
        <v-card elevation="4">
          <qrcode-stream :camera="camera" @init="onInit" @decode="onDecode">
            <div class="loading-indicator" v-if="loading">Cargando...</div></qrcode-stream
          >
        </v-card>
      </v-col>
    </v-row>
    <ALERT
      @cancelAlert="cancelAlert()"
      @confirm="confirm()"
      @exitEsc="cancel()"
      @cancel="cancel()"
      v-if="alert.state"
      :alert="alert"
    ></ALERT>
  </v-container>
</template>
<script>
import { current_user } from "@/global";
import { Alert } from "@/mixins/alert";
import { mapActions } from "vuex";
import moment from "moment";

export default {
  name: "scan-point",

  mixins: [Alert],
  data: () => ({
    current_user: current_user,
    loading: false,
    camera: "auto",
    error: "",
  }),
  computed: {
    date() {
      moment.locale("es");
      let date = moment().format("YYYY-MM-DD");
      return date;
    },
  },
  methods: {
    ...mapActions({
      postRecord_: "record/postRecord_",
    }),
    cancel() {
      this.deletAlert();
      this.$router.push("/home");
    },
    async onInit(promise) {
      // show loading indicator
      this.loading = true;
      try {
        const { capabilities } = await promise;
        // successfully initialized
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "user denied camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "no suitable camera device installed";
        } else if (error.name === "NotSupportedError") {
          this.error = "page is not served over HTTPS (or localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "maybe camera is already in use";
        } else if (error.name === "OverconstrainedError") {
          this.error = "did you requested the front camera although there is none?";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "browser seems to be lacking features";
        }
      } finally {
        this.loading = false;
      }
    },
    async onDecode(content) {
      const CONTENT = await content;
      try {
        let time_date = moment().format("LTS");
        let data_qr = JSON.parse(CONTENT);
        const { last_name, name } = current_user;
        let watchman = `${last_name} ${name} `.split(" ");
        const DATA = {
          point_name: data_qr.point_name,
          zone_id: data_qr.zone_id,
          name_zone: data_qr.name_zone,
          id_watchman: this.current_user._id,
          date: this.date,
          time_date: time_date,
          name_watchman: `${watchman[0]} ${watchman[2]}`,
          document_watchman: this.current_user.document,
        };
        this.turnCameraOff();
        const RES = await this.postRecord_({ DATA });
        if (RES == "s") {
          return this.sendAlert("qr_0", "success");
        }
      } catch (error) {
        this.sendAlert("qr_1", "error");
        console.error(error);
      }
    },
    turnCameraOff() {
      this.camera = "off";
    },
  },
};
</script>
<style scoped>
button {
  margin-bottom: 20px;
}

.loading-indicator {
  font-weight: bold;
  font-size: 2rem;
  text-align: center;
}
</style>
