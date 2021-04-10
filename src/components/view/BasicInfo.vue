<template>
  <div class="collection-component">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <!-- <v-btn icon small
      ><v-icon
        @click="moveStep(2)"
        v-text="editMode === false ? 'mdi-pencil-outline' : 'mdi-close-outline'"
      ></v-icon
    ></v-btn> -->
    <div class="editView" v-if="editMode">
      <!-- add the untaumatic fields -->

      <strong>Modifier de données de base</strong>
      <v-row wrap class="my-3">
        <v-col cols="12">
          <div class="col-title">
            <p>Date de collection</p>
          </div>
          <div class="fields">
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
                  v-model="formattedColDate"
                  label="cliquez pour sélectionner la date"
                  dense
                  :rules="[rules.required]"
                  filled
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="formattedColDate"
                @change="save"
              ></v-date-picker>
            </v-menu>
            <v-text-field
              v-model="moise_de"
              label="Mois de"
              :rules="[rules.required]"
              clearable
              type="text"
              filled
              dense
              class="mx-2"
            ></v-text-field>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="contents" v-else>
      <div class="cont-title">
        <p>
          Membres du groupe
        </p>
      </div>
      <div>
        <ul class="comp-data">
          <li>
            <div class="ctitle">
              Membres inscrits dans le mois précédent
            </div>
            <v-spacer></v-spacer>
            <div class="cdata">
              <v-chip color="primary" small label class="mx-3"
                ><v-icon>mdi-human-female</v-icon> {{ prevRegG }}</v-chip
              >
              <v-chip color="primary" small label
                ><v-icon>mdi-human-male</v-icon> {{ prevRegB }}</v-chip
              >
            </div>
          </li>
          <li>
            <div class="ctitle">
              Abandons au cours du mois actuel
            </div>
            <v-spacer></v-spacer>
            <div class="cdata">
              <v-chip color="primary" small label class="mx-3"
                ><v-icon>mdi-human-female</v-icon> {{ abG }}</v-chip
              >
              <v-chip color="primary" small label
                ><v-icon>mdi-human-male</v-icon> {{ abB }}</v-chip
              >
            </div>
          </li>
          <li>
            <div class="ctitle">
              Taux d’abandon mensuel (%)
            </div>
            <v-spacer></v-spacer>
            <div class="cdata">
              <v-chip color="secondary" small label>Tot: {{ abmT }} %</v-chip>
              <v-chip color="primary" small label class="mx-2"
                ><v-icon>mdi-human-female</v-icon> {{ abmG }}</v-chip
              >
              <v-chip color="primary" label
                ><v-icon>mdi-human-male</v-icon> {{ abmB }}</v-chip
              >
            </div>
          </li>
          <li>
            <div class="ctitle">
              Nouveaux membres enregistrés dans le mois
            </div>
            <v-spacer></v-spacer>
            <div class="cdata">
              <v-chip color="secondary" small label>Tot: {{ nmT }} %</v-chip>
              <v-chip color="primary" small label class="mx-2"
                ><v-icon>mdi-human-female</v-icon> {{ nmG }}</v-chip
              >
              <v-chip color="primary" small label
                ><v-icon>mdi-human-male</v-icon> {{ nmB }}</v-chip
              >
            </div>
          </li>
          <li>
            <div class="ctitle">
              Membres actuels inscrits
            </div>
            <v-spacer></v-spacer>
            <div class="cdata">
              <v-chip color="secondary" small label
                >Tot: {{ actB + actG }}</v-chip
              >
              <v-chip color="primary" small label class="mx-2"
                ><v-icon>mdi-human-female</v-icon> {{ actG }}</v-chip
              >
              <v-chip color="primary" label
                ><v-icon>mdi-human-male</v-icon> {{ actB }}</v-chip
              >
            </div>
          </li>
          <li>
            <div class="ctitle">
              Membres présents en réunion à la date de collecte de données
            </div>
            <v-spacer></v-spacer>
            <div class="cdata">
              <v-chip color="secondary" small label
                >Tot: {{ prB + prG }}</v-chip
              >
              <v-chip color="primary" small label class="mx-2"
                ><v-icon>mdi-human-female</v-icon> {{ prG }}</v-chip
              >
              <v-chip color="primary" small label
                ><v-icon>mdi-human-male</v-icon> {{ prB }}</v-chip
              >
            </div>
          </li>
          <li>
            <div class="ctitle">
              Taux de participation à la réunion
            </div>
            <v-spacer></v-spacer>
            <div class="cdata">
              <v-chip color="secondary" small label>Tot: {{ tauxT }}</v-chip>
              <v-chip color="primary" small label class="mx-2"
                ><v-icon>mdi-human-female</v-icon> {{ tauxG }}</v-chip
              >
              <v-chip color="primary" small label
                ><v-icon>mdi-human-male</v-icon> {{ tauxB }}</v-chip
              >
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import store from "@/store/index";

export default {
  name: "basicInfoView",
  props: [
    "collectionId",
    "collectionDate",
    "prevRegG",
    "prevRegB",
    "abG",
    "abB",
    "abmT",
    "abmG",
    "abmB",
    "nmG",
    "nmB",
    "nmT",
    "actG",
    "actB",
    "actT",
    "prB",
    "prG",
    "tauxG",
    "tauxB",
    "tauxT",
    "moisDe"
  ],

  computed: {
    formattedColDate: {
      get: function() {
        let d = this.formatTime(this.colDate);
        return d;
      },

      set: function(newValue) {
        let dat = newValue;
        this.colDate = dat;
      }
    }
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },

  methods: {
    save(collectionDate) {
      this.$refs.menu.save(collectionDate);
    },


    moveStep(stepy) {
      store.commit("updateSteps", stepy);
      this.$router.push({ name: "data-collection" });
    },

    formatTime(value) {
      if (value) {
        return moment(value).format("YYYY-MM-DD");
      }
    }
  },

  mounted() {
    this.colDate = this.collectionDate;
    this.moise_de = this.moisDe;
    
  },

  data() {
    return {
      editMode: false,
      menu: false,
      colDate: "",
      moise_de: "",
      rules: {
        required: value => !!value || "obligatoire!"
      },
      dioceses: [],
      paroisses: [],
      diocese_id: null,
      paroisse_id: null,
      overlay: false,
      loading: false,
      groups: [],
      groupId: undefined
    };
  }
};
</script>
