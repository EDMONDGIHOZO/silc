<template>
  <div class="login-container">
    <v-alert
      border="top"
      :color="alertColor"
      :type="alertType"
      dark
      v-if="error"
    >
      {{ status }}
    </v-alert>
    <div class="form-title">
      <p>LOGIN</p>
    </div>
    <form class="login-form">
      <v-text-field
        v-model="username"
        :error-messages="usernameErrors"
        label="Username"
        required
        outlined
        rounded
        dense
        @input="$v.username.$touch()"
        @blur="$v.username.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :error-messages="passwordErrors"
        label="Password"
        required
        type="password"
        outlined
        rounded
        dense
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      ></v-text-field>
      <v-btn
        class="mr-4"
        @click="login"
        block
        color="primary"
        rounded
        depressed
      >
        Login
      </v-btn>
    </form>
    <small class="right my-4">
      <a href="mailto:edtech250@hotmail.com">forgot password ?</a>
    </small>
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
    username: "",
    password: "",
    status: "",
    error: false,
    alertColor: "",
    alertType: "",
  }),

  /** computation */

  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Username is required.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
  },

  methods: {
    login() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.alertColor = "red";
        this.alertType = "error";
        this.error = true;
        this.status = "username or password is wrong";
      } else {
        // do your submit logic here
        this.alertColor = "primary";
        this.alertType = "success";
        this.error = true;
        this.status = "PENDING";
        // setTimeout(() => {
        //   this.status = "OK";
        // }, 5000);
        this.$router.push({name: 'main-holder'})
      }
    },
  },
};
</script>