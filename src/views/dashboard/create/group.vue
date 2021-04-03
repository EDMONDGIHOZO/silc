<template>
  <div class="create-container">
    <v-row wrap full-width>
      <v-col cols="12">
        <div class="create-title">
          <p>créer un groupe</p>
          <p>Total des membres: {{ totalMembers }}</p>
        </div>
      </v-col>
    </v-row>
    <div class="form-container" v-if="!showAlert">
      <v-form @submit.prevent="saveGroup" ref="groupForm">
        <v-row class="wrap my-4">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="name"
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
            <v-autocomplete
              ref="diocese"
              v-model="diocese_id"
              :rules="[rules.required]"
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
              :rules="[rules.required]"
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
              :rules="[rules.required]"
              dense
              type="number"
              rounded
              background-color="white"
              label="Durée maximale credit (mois) "
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="creationDate"
              outlined
              :rules="[rules.required]"
              dense
              type="date"
              rounded
              background-color="white"
              label="Date de création du groupe "
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="monthlyInterest"
              outlined
              dense
              type="number"
              :rules="[rules.required]"
              rounded
              background-color="white"
              label="intérêt mensuel (%)"
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
              :rules="[rules.required]"
              rounded
              background-color="white"
              label="Garçons"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="girls"
              append-icon="mdi-human-female"
              outlined
              type="number"
              :rules="[rules.required]"
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
                  label="date de début du cycle"
                  append-icon="mdi-calendar"
                  background-color="white"
                  rounded
                  :rules="[rules.required]"
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
                  :rules="[rules.required]"
                  label="Date de fin du cycle actuel"
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
export default {
  data: () => ({
    dioceses: [],
    paroisses: [],
    rules: {
      required: (value) => !!value || "obligatoire!",
    },
    creationDate: "",
    diocese_id: "",
    paroisse_id: undefined,
    name: "",
    girls: 0,
    boys: 0,
    monthlyInterest: 0,
    maxCredit: 0,
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

  mounted() {
    ActionsService.getDioceses().then((response) => {
      this.dioceses = response.data.data;
    });
  },

  computed: {
    totalMembers() {
      let girls = parseInt(this.girls);
      let boys = parseInt(this.boys);
      let total = girls + boys;
      if (total > 0) {
        return total;
      } else {
        return 0;
      }
    },
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
      if (this.$refs.groupForm.validate() & this.paroisse_id !== undefined) {
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
          creationDate: this.creationDate,
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
      }
    },
  },
};
</script>

<style scoped>
.create-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
