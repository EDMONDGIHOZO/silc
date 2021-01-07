<template>
  <div class="create-container">
    <v-row wrap full-width>
      <v-col cols="12">
        <div class="create-title">
          <p>créer un Paroisse</p>
        </div>
      </v-col>
    </v-row>
    <div class="form-container">
      <v-form v-model="valid">
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
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  validations: {
    name: { required, minLength: minLength(4) },
  },
  data() {
    return {
      name: "",
      valid: false,
    };
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
    register(){
        return this.$router.push ({name: "home"})
    },
    cancel() {
      return this.$router.push({ name: "home" });
    }
  }
};
</script>
