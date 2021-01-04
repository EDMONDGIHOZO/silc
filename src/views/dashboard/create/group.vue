<template>
  <div class="create-container">
    <v-row wrap full-width>
      <v-col cols="12">
        <div class="create-title">
          <p>créer un groupe</p>
        </div>
      </v-col>
    </v-row>
    <div class="form-container">
      <v-form v-model="valid">
        <v-row class="wrap my-4">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="name"
              :rules="commonRules"
              outlined
              dense
              rounded
              background-color="white"
              label="Nom"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-autocomplete
              ref="diocese"
              v-model="diocese"
              :rules="[() => !!diocese || 'This field is required']"
              :items="dioceses"
              label="sélectionner le diocèse"
              placeholder="Select..."
              background-color="white"
              required
              outlined
              dense
              rounded
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="maxCredit"
              :rules="commonRules"
              outlined
              dense
              rounded
              background-color="white"
              label="credit maximal"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="monthlyInterest"
              :rules="commonRules"
              outlined
              dense
              type="number"
              rounded
              background-color="white"
              label="intérêt mensuel"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="boys"
              append-icon="mdi-human-male"
              :rules="commonRules"
              outlined
              dense
              type="number"
              rounded
              background-color="white"
              label="Garcons"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="girls"
              :rules="commonRules"
              append-icon="mdi-human-female"
              outlined
              type="number"
              dense
              rounded
              background-color="white"
              label="Filles"
              required
            ></v-text-field>
          </v-col>
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
                  dense
                  rounded
                  outlined
                  background-color="white"
                  v-model="startDate"
                  label="Date de début"
                  append-icon="mdi-clock-start"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="startDate"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
              ></v-date-picker>
            </v-menu>
          </v-col>
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
                  dense
                  rounded
                  outlined
                  background-color="white"
                  v-model="endDate"
                  label="Date de fin"
                  append-icon="mdi-calendar-check"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="endDate"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
              depressed
              rounded
            >
              enregistrer le groupe
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
    dioceses: ["Gisagara", "Nyaruguru"],
    diocese: "",
    name: "",
    commonRules: [(v) => v.length <= 25 || "Max 25 characters"],
    menu: false,
    endMenu: false,
    valid: false,
    startDate: null,
    endDate: null,
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  methods: {
    save(startDate) {
      this.$refs.menu.save(startDate);
    },

    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>

