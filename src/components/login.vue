<template>
  <div class="login-container">
    <v-alert border="top" color="info" type="alertType" dark v-if="error">
      {{ status }}
    </v-alert>
    <div class="form-title">
      <p>s'identifier</p>
    </div>
    <form class="login-form" @submit.prevent>
      <v-text-field
        v-model="email"
        class="my-5"
        label="Email"
        :rules="emailRules"
        required
        dense
      ></v-text-field>

      <v-text-field
        v-model="password"
        :error-messages="passwordErrors"
        class="my-5"
        label="Password"
        required
        type="password"
        dense
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>

      <div class="buttons">
        <v-btn
          class="mr-4"
          @click="login"
          color="primary"
          depressed
          type="submit"
        >
          Login
        </v-btn>
        <v-btn
          class="ma-4"
          @click="forgotPassword"
          color="primary"
          text
          outlined
          depressed
          type="submit"
        >
          Mot de passe oublié?
        </v-btn>
        <v-snackbar v-model="snackbar" color="primary" top>
          {{ forgotMessage }}

          <template v-slot:action="{ attrs }">
            <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
              fermer
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </form>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  /** validation  */
  validations: {
    username: { required },
    password: {
      required,
      minLength: minLength(6),
    },
  },

  /** end validation */
  /** data management */
  data: () => ({
    email: "",
    password: "",
    snackbar: false,
    status: [],
    error: false,
    alertColor: "",
    forgotMessage: "ok, pouvez-vous simplement appeler le technicien pour changer votre mot de passe ?? 😴",
    alertType: "info",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),

  /** computation */

  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },

  created() {
    if (this.loggedIn) {
      this.$router.push({ name: "home" });
    }
  },

  methods: {
    login() {
      const userInfo = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch("auth/login", userInfo).then((res) => {
        if (res.status === "success") {
          this.$router.push({ name: "home" });
        } else {
          this.error = true;
          this.status = res.message;
        }
      });
    },

    forgotPassword() {
      this.snackbar = true;
    },
  },
};
</script>

<style scoped>
.dnp {
  padding: 20px 0px;
}
.buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  margin: 5px;
  overflow: hidden;
}
</style>
