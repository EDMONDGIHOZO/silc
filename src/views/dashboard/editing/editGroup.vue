<template>
  <div class="container">
    <loading-data type="card" v-if="!loaded" />
    <div class="comp-data" v-else>
      <v-card
        class="ma-5 pa-4"
        max-width="700"
        outlined
        color="green lighten-5"
      >
        <v-card-title>
          MODIFIER LA GROUPE
          <span class=" mx-4 green--text text-uppercase">{{ groupName }}</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-form @submit.prevent="updateInfo" ref="groupForm">
            <v-row wrap>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Nom"
                  required
                  outlined
                  dense
                  background-color="white"
                  v-model="groupName"
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
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="maxCredit"
                  outlined
                  :rules="[rules.required]"
                  dense
                  type="number"
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
                  background-color="white"
                  label="Date de création du groupe"
                  required
                  :hint="`date actuelle: ${creationDate}`"
                  persistent-hint
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="startDate"
                  outlined
                  :rules="[rules.required]"
                  dense
                  type="date"
                  background-color="white"
                  label="date de début du cycle"
                  required
                  :hint="`date actuelle: ${startDate}`"
                  persistent-hint
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="endDate"
                  outlined
                  :rules="[rules.required]"
                  dense
                  type="date"
                  background-color="white"
                  label="Date de fin du cycle actuel"
                  required
                  :hint="`date actuelle: ${endDate}`"
                  persistent-hint
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="monthlyInterest"
                  outlined
                  dense
                  type="number"
                  :rules="[rules.required]"
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
                  background-color="white"
                  label="Filles"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="success" @click="saveUpdates" depressed block
            >Enregistre</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import ActionsService from "@/services/actions.service";
import Loading from "@/components/layouts/loaders.vue";
import moment from "moment";
export default {
  name: "single-group",
  props: ["id"],
  components: {
    "loading-data": Loading,
  },

  data() {
    return {
      overlay: false,
      creationDate: "",
      groupe: null,
      collections: null,
      loaded: false,
      groupName: "",
      diocese_id: "",
      paroisse_id: undefined,
      dioceses: [],
      paroisses: [],
      taux: "",
      girls: 0,
      boys: 0,
      monthlyInterest: 0,
      maxCredit: 0,
      startDate: "",
      endDate: "",
      hideParoisses: true,
      startMenu: false,
      endMenu: false,
      rules: {
        required: (value) => !!value || "obligatoire!",
      },
    };
  },

  mounted() {
    this.getInfo();
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

    end() {
      let d = this.formatTime(this.endDate);
      return d;
    },
    start() {
      let d = this.formatTime(this.startDate);
      return d;
    },
    creation() {
      let d = this.formatTime(this.creationDate);
      return d;
    },
  },

  methods: {
    getInfo() {
      ActionsService.getSgroup(this.id).then((response) => {
        if (response.statusText === "OK") {
          const groupe = response.data.data;
          this.groupName = groupe.name;
          this.diocese_id = groupe.diocese_id;
          this.paroisse_id = groupe.paroisse_id;
          this.girls = groupe.initial_girls_number;
          this.boys = groupe.initial_boys_number;
          this.monthlyInterest = groupe.monthly_interest;
          this.maxCredit = groupe.credit_group_max_time;
          this.startDate = groupe.start_date;
          this.endDate = groupe.end_date;
          this.creationDate = groupe.Date_de_creation;
          this.loaded = true;
          this.getDioPar();
        }
      });
    },

    formatTime(value) {
      if (value) {
        return moment(value).format("YYYY-MM-DD");
      }
    },

    viewGroup() {
      const groupId = this.id;
      return this.$router.push({
        name: "group-view",
        params: { groupId: groupId },
      });
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

    // saving the updates
    saveUpdates() {
      const formData = {
        name: this.groupName,
        dioceseId: this.diocese_id,
        paroisseId: this.paroisse_id,
        boys: this.boys,
        girls: this.girls,
        maxCredit: this.maxCredit,
        startDate: this.startDate,
        endDate: this.end,
        creationDate: this.creation,
        monthlyInterest: this.monthlyInterest,
      };
      this.overlay = true;
      try {
        ActionsService.editGroup(this.id, formData).then((response) => {
          if (response.data.message === "updated") {
            alert("saved the updates");
            this.overlay = false;
            this.viewGroup();
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.comp-data {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
