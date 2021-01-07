<template>
  <div class="create-container">
    <v-row wrap full-width>
      <v-col cols="12">
        <div class="create-title">
          <p>créer un utilisateur</p>
        </div>
      </v-col>
    </v-row>
    <div class="form-container">
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
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
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
            <v-autocomplete
              ref="userRole"
              v-model="userRole"
              :rules="[() => !!userRole || 'This field is required']"
              :items="roles"
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
            <v-btn color="success" class="mr-4" depressed rounded>
              enregistrer
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    roles: ["Collecteur", "Administrateur"],
    userRole: "",
    lastName: "",
    firstName: "",
    rules: {
      required: (value) => !!value || "Required.",
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
  }),

  beforeDestroy() {
    window.onbeforeunload = () => (this.unsavedChanges ? true : null);
  },
};
</script>
