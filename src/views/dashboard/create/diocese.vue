<template>
  <div class="create-container">
    <v-row wrap full-width>
      <v-col cols="12">
        <div class="create-title">
          <p>créer un Diocese</p>
        </div>
      </v-col>
    </v-row>
    <div class="form-container">
      <v-form v-model="valid" @submit.prevent="register" v-if="!response">
        <v-row class="wrap my-4">
          <v-col cols="12">
            <v-text-field
              label="Nom"
              dense
              rounded
              outlined
              background-color="white"
              v-model="name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-btn
              color="success"
              class="mr-4"
              @click="register"
              rounded
              depressed
            >
              enregistrer le diocese
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
      <div class="responseArea" v-if="response">
        <v-progress-circular
          size="70"
          width="7"
          centered
          v-if="showProgress"
          color="primary"
          indeterminate
        ></v-progress-circular>
        <v-alert :type="alertType" v-if="showAlert">{{ alertMessage }}</v-alert>
      </div>
    </div>
  </div>
</template>
<script>
import ActionsService from "@/services/actions.service";
export default {
  data() {
    return {
      name: "",
      valid: false,
      alertType: "info",
      showAlert: true,
      alertMessage: "",
      showProgress: null,
      response: false,
    };
  },

  methods: {
    register() {
      const formData = { name: this.name.toLowerCase() };

      try {
        ActionsService.createDiocese(formData).then((response) => {
          if (response.statusText === "OK") {
            this.response = true;
            this.showProgress = true;
            this.showProgress = false;
            this.showAlert = true;
            this.name = "";
            this.alertType = response.data.status;
            this.alertMessage = response.data.message;

            setTimeout(() => this.$router.push({ name: "home" }), 4000);
          }
        });
      } catch (error) {
        console.log(error.response.data.message);
      }
    },

    cancel() {
      return this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style lang="scss" scoped>
.responseArea {
  padding: 10px;
  border-radius: 20px;
  text-align: center;
}
.v-progress-circular {
  margin: 1rem;
}
</style>
