<template>
  <div class="create-container">
    <v-row wrap full-width>
      <v-col cols="12">
        <div class="create-title">
          <p>créer un utilisateur</p>
        </div>
      </v-col>
    </v-row>
    <div class="form-container" v-if="!alert.status">
      <v-form v-model="valid">
        <v-row class="wrap my-4">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="firstName"
              :rules="[rules.required]"
              outlined
              dense
              rounded
              background-color="white"
              label="Nom"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="lastName"
              :rules="[rules.required]"
              outlined
              dense
              rounded
              @input="makeUserName"
              background-color="white"
              label="Prenom"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="email"
              outlined
              :rules="[rules.required, rules.email]"
              dense
              rounded
              background-color="white"
              label="Email"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="userName"
              outlined
              :rules="[rules.required]"
              dense
              rounded
              :value="userName"
              :placeholder="userName"
              background-color="white"
              label="User name"
              persistent-hint
              required
              hint="you can edit suggested username by your own!"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="password"
              outlined
              clearable
              :rules="[rules.required]"
              dense
              append-icon="mdi-account-key"
              rounded
              background-color="white"
              label="Mot de passe"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              ref="role_id"
              v-model="role_id"
              :rules="[() => !!role_id || 'This field is required']"
              :items="roles"
              item-text="name"
              item-value="id"
              label="sélectionner le role"
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
              color="success"
              class="mr-4"
              :disabled="!valid"
              depressed
              rounded
              @click="registerUser"
            >
              enregistrer
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
    <v-alert outlined class="ma-3" :type="alert.type" v-else>
      <span v-for="mess in alert.messages" :key="mess.field">
          {{mess.message}}
      </span>
    </v-alert>
  </div>
</template>

<script>
import ActionsService from "@/services/actions.service";
export default {
  data: () => ({
    userName: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    role_id: null,
    valid: false,
    alert: {
      type: "error",
      messages: [],
      status: false,
    },
    roles: [],
    role: {},
    rules: {
      required: (value) => !!value || "Required.",
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),

  mounted() {
    ActionsService.getRoles().then((response) => {
      this.roles = response.data.data;
    });
  },

  methods: {
    makeUserName() {
      this.userName = this.firstName.charAt(0) + this.lastName;
    },

    registerUser() {
      const formData = {
        firstname: this.firstName,
        lastname: this.lastName,
        username: this.userName,
        password: this.password,
        email: this.email,
        role_id: this.role_id,
      };

      ActionsService.createUser(formData).then((response) => {
        const status = response.data.status;

        if (status == "danger") {
          this.alert.type = "error";
          this.alert.status = true
        } else {
            this.alert.type = "success"
            this.alert.messages = [{"message": "bien enregistrer"}];
            this.alert.status = true
            setTimeout(() => this.$router.push({ name: "home" }), 4000);
        }
      });
    },
  },

  beforeDestroy() {
    window.onbeforeunload = () => (this.unsavedChanges ? true : null);
  },
};
</script>
