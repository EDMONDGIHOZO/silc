<template>
  <div class="create-container">
    <v-row wrap full-width>
      <v-col cols="12">
        <div class="create-title">
          <p>créer un Paroisse</p>
        </div>
      </v-col>
    </v-row>
    <div class="form-container" v-if="!response">
      <v-form v-model="valid" @submit.prevent="register">
        <v-row class="wrap my-4">
          <v-col cols="12">
            <v-text-field
              label="Nom"
              dense
              rounded
              :error-messages="nameErrors"
              outlined
              background-color="white"
              v-model="name"
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              ref="diocese"
              v-model="diocese_id"
              :rules="[() => !!diocese_id || 'This field is required']"
              :items="dioceses"
              item-value="id"
              item-text="name"
              label="sélectionner le diocèse"
              placeholder="Select..."
              background-color="white"
              required
              outlined
              dense
              rounded
            ></v-autocomplete>
          </v-col>

          <v-col cols="12">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="register"
              rounded
              depressed
            >
              enregistrer le paroisse
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
    <div class="responseArea" v-else>
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
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import ActionsService from "@/services/actions.service";
export default {
  mixins: [validationMixin],
  validations: {
    name: { required, minLength: minLength(4) },
  },
  data() {
    return {
      name: "",
      diocese_id: "",
      dioceses: [],
      valid: false,
      commonRules: [(v) => v.length <= 25 || "Max 25 characters"],
      alertType: "info",
      showAlert: true,
      alertMessage: "",
      showProgress: null,
      response: false
    };
  },

  mounted() {
    ActionsService.getDioceses().then((response) => {
      this.dioceses = response.data.data;
    });
  },

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.minLength &&
        errors.push("Name must be at least 4 characters long.");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
  },
  methods: {
    register() {
      const formData = {
        name: this.name.toLowerCase(),
        dioceseId: this.diocese_id,
      };
      this.response = true;
      this.showProgress = true;
      try {
        ActionsService.createParoisse(formData).then((response) => {
          this.showProgress = false;
          this.showAlert = true;
          this.name = "";
          this.alertType = response.data.status;
          this.alertMessage = response.data.message;

          setTimeout(() => this.$router.push({ name: "home" }), 4000);
        });
      } catch (error) {
        console.log(error);
      }
    },
    cancel() {
      return this.$router.push({ name: "home" });
    },
  },
};
</script>
