<template>
  <v-form v-model="valid">
    <v-row class="wrap my-4">
      <v-col cols="12" md="6">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="collectionDate"
              label="Date de collection"
              append-icon="mdi-calendar"
              readonly
              outlined
              dense
              rounded
              background-color="white"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            ref="picker"
            v-model="collectionDate"
            :max="new Date().toISOString().substr(0, 10)"
            min="2000-01-01"
            @change="save"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="collectorName"
          :rules="commonRules"
          append-icon="mdi-feather"
          :placeholder="currentUser.userName"
          background-color="white"
          label="Nom du Collecteur"
          required
          outlined
          dense
          rounded
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          :items="groups"
          label="Sélectionnez un groupe"
          append-icon="mdi-account-group"
          background-color="white"
          item-text="name"
          item-value="id"
          required
          outlined
          dense
          rounded
          v-model="groupId"
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="newMembers"
          :rules="commonRules"
          append-icon="mdi-account-multiple-plus"
          background-color="white"
          outlined
          dense
          rounded
          label="nouveaux membres"
          required
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="abandons"
          :rules="commonRules"
          append-icon="mdi-account-multiple-minus"
          background-color="white"
          outlined
          dense
          rounded
          label="membres abandonnés"
          required
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="registeredMembes"
          :rules="commonRules"
          append-icon="mdi-account-multiple-check"
          background-color="white"
          outlined
          dense
          rounded
          label="membres inscrits"
          required
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="registeredMembes"
          :rules="commonRules"
          append-icon="mdi-human-male"
          background-color="white"
          label="garçons présents"
          outlined
          dense
          rounded
          required
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="registeredMembes"
          :rules="commonRules"
          append-icon="mdi-human-female"
          background-color="white"
          label="garçons présents"
          outlined
          dense
          rounded
          required
          type="number"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    collectionDate: null,
    menu: false,
    groups: [
      {
        id: 1,
        name: "abizeye",
      },
      {
        id: 12,
        name: "abaswa",
      },
    ],
    groupId: null,
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },

  computed: mapState(["currentUser"]),
  methods: {
    save(collectionDate) {
      this.$refs.menu.save(collectionDate);
    },

    clear() {
      this.collectionDate = null;
    },
  },
};
</script>