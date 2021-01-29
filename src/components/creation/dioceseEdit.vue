<template>
  <div class="container">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="orange"
          class="white--text"
          depressed
          rounded
          max-width="100"
          v-bind="attrs"
          v-on="on"
        >
          <v-icon left>mdi-pencil</v-icon>Edit
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="editing-title"
            >modifier les informations du diocèse {{ dioName }}</span
          >
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form lazy-validation @submit.prevent ref="form">
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="name"
                    :placeholder="dioName"
                    label="Diocese name*"
                    :error-messages="nameErrors"
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>

          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="editDio(dioId)">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { required, maxLength } from "vuelidate/lib/validators";
import ActionsService from "@/services/actions.service";
import { validationMixin } from "vuelidate";
export default {
  props: ["dioId", "dioName"],
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(20) },
  },

  data: () => ({
    dialog: false,
    name: "",
    submitStatus: true,
    title: "single",
  }),

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength &&
        errors.push("Name must be at most 10 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
  },



  methods: {
    editDio(id) {
      const formData = {
        name: this.name,
      };
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = "ERROR";
      } else {
        // do your submit logic here
        ActionsService.editDiocese(id, formData).then((response) => {
          if (response.statusText === "OK") {
            this.$store.dispatch("getDioceses");
            this.$store.dispatch("getDiocese", this.dioId);
            this.$v.$reset();
            this.name = "";
            this.dialog = false;
          }
        });
      }
    },
  },
};
</script>