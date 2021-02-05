<template>
  <div class="create-container">
    <v-row wrap full-width>
      <v-col cols="12">
        <div class="create-title">
          <p>créer un groupe</p>
        </div>
      </v-col>
    </v-row>
    <div class="form-container" v-if="!showAlert">
      <v-form v-model="valid" @submit.prevent="saveGroup">
        <v-row class="wrap my-4">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="name"
              :error-messages="nameErrors"
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
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
              v-model="diocese_id"
              :rules="[() => !!diocese_id || 'This field is required']"
              :items="dioceses"
              item-value="id"
              item-text="name"
              label="sélectionner le diocèse"
              placeholder="Select..."
              background-color="white"
              required
              @change="getDioPar"
              outlined
              dense
              rounded
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="6">
            <v-autocomplete
              ref="paroisse"
              v-model="paroisse_id"
              :rules="[() => !!paroisse_id || 'This field is required']"
              :items="paroisses"
              item-value="id"
              item-text="name"
              label="sélectionner le paroisse"
              placeholder="Select..."
              background-color="white"
              :disabled="hideParoisses"
              required
              outlined
              dense
              rounded
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="maxCredit"
              outlined
              dense
              type="number"
              rounded
              background-color="white"
              label="credit maximal"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="monthlyInterest"
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
            <!-- starting date of the group -->
            <v-menu
              v-model="startMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="startDate"
                  v-on="on"
                  v-bind="attrs"
                  label="date de début"
                  append-icon="mdi-calendar"
                  background-color="white"
                  rounded
                  dense
                  outlined
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="startDate"
                @change="(startMenu = false), (showEnd = true)"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" md="6" v-if="showEnd">
            <!-- ending date of the group -->
            <v-menu
              v-model="endMenu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :value="endDate"
                  close-on-content-click="false"
                  v-on="on"
                  v-bind="attrs"
                  label="date de fin"
                  append-icon="mdi-calendar"
                  background-color="white"
                  rounded
                  dense
                  outlined
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="endDate"
                :min="startDate"
                @change="endMenu = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12">
            <v-btn
              :disabled="!valid"
              color="success"
              @click="saveGroup"
              class="mr-4"
              depressed
              rounded
            >
              enregistrer le groupe
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

    <!-- group informations -->
    <v-card outlined shaped v-if="groupInfo">
      <v-card-title> informations de groupe </v-card-title>
      <v-card-text text-center>
        <p>
          voici le code du groupe, veuillez le sauvegarder quelque part pour une
          utilisation future.
        </p>
        <h2 class="text-center">{{ groupCode }}</h2>
      </v-card-text>
      <v-card-actions>
        <v-row>
          <v-col cols="12">
            <v-btn color="success" @click="goToHome" depressed rounded block
              >close</v-btn
            >
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import ActionsService from "@/services/actions.service";
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  mixins: [validationMixin],
  data: () => ({
    dioceses: [],
    paroisses: [],
    diocese_id: "",
    paroisse_id: 1,
    name: "",
    girls: 0,
    boys: 0,
    monthlyInterest: 0,
    maxCredit: 0,
    valid: false,
    startDate: "",
    endDate: "",
    hideParoisses: true,
    alertType: "info",
    showAlert: false,
    alertMessage: "",
    showProgress: null,
    groupCode: "",
    groupInfo: false,

    //  dates management
    showEnd: false,
    startMenu: false,
    endMenu: false,
  }),

  validations: {
    name: {
      required,
      minLength: minLength(4),
    },
  },

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.minLength &&
        errors.push("Name must be at most 4 characters long");
      !this.$v.name.required && errors.push("Name is required.");
      return errors;
    },
  },

  mounted() {
    ActionsService.getDioceses().then((response) => {
      this.dioceses = response.data.data;
    });
  },
  methods: {
    save(startDate) {
      this.$refs.menu.save(startDate);
    },

    getDioPar() {
      try {
        ActionsService.getDioPar(this.diocese_id).then((response) => {
          this.paroisses = [];
          this.paroisses = response.data.data;
          this.hideParoisses = false;
        });
      } catch (error) {
        console.log(error);
      }
    },

    goToHome() {
      this.$router.push({ name: "home" });
    },

    saveGroup() {
      this.$v.$touch();
      const formData = {
        name: this.name,
        girls: this.girls,
        boys: this.boys,
        dioceseId: this.diocese_id,
        paroisseId: this.paroisse_id,
        maxCredit: this.maxCredit,
        monthlyInterest: this.monthlyInterest,
        startDate: this.startDate,
        endDate: this.endDate,
      };

      this.showProgress = true;
      this.showAlert = true;

      try {
        ActionsService.createGroup(formData).then((response) => {
          this.groupCode = response.data.data;
          this.showProgress = false;
          this.alertMessage = response.data.message;
          this.alertType = response.data.status;
          this.groupInfo = true;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
