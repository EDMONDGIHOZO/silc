<template>
  <div class="contents">
    <v-form v-model="valid" @submit.prevent>
      <v-row class="wrap my-4">
        <v-col cols="12">
          <h3>Reference du groupe</h3>
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
              @change="save"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="collectorName"
            :rules="commonRules"
            append-icon="mdi-feather"
            :placeholder="UserInfo.username"
            disabled
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
            v-model="registeredMembers"
            append-icon="mdi-account-multiple"
            background-color="white"
            outlined
            dense
            rounded
            label="membres actuellement inscrits"
            required
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="newMembers"
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
            v-model="boysAttended"
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
            v-model="girlsAttended"
            append-icon="mdi-human-female"
            background-color="white"
            label="Filles présents"
            outlined
            dense
            rounded
            required
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="wrap my-4">
        <v-col cols="12">
          <h3>Penalites/Amandes</h3>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="punishedMembers"
            append-icon="mdi-account-cash"
            background-color="white"
            label="Membres Punis"
            outlined
            dense
            rounded
            required
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
        <v-text-field
          v-model="paidPenalities"
          append-icon="mdi-cash-100"
          background-color="white"
          label="Montant de penalites payees"
          outlined
          dense
          rounded
          required
          type="number"
        ></v-text-field>
      </v-col>
      </v-row>
      <v-btn
        color="primary"
        type="submit"
        depressed
        rounded
        @click="saveGenInfo()"
      >
        Continue
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store/index";
import ActionsService from "@/services/actions.service";
export default {
  data: () => ({
    menu: false,
    groups: [],
    stepy: 2,
    commonRules: [(v) => v.length <= 1 || "Max 25 characters"],
    // data collection
    collectionDate: null,
    collectorName: "",
    newMembers: null,
    registeredMembers: null,
    boysAttended: null,
    girlsAttended: null,
    abandons: null,
    groupId: null,
    valid: false,
    // penalites
    punishedMembers: null,
    paidPenalities: 0,
    latest: true
  }),

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },

  mounted() {
    ActionsService.getGroupes().then((response) => {
      this.groups = response.data.data;
      this.collectorName = this.UserInfo.username;
    });
  },

  computed: mapState(["UserInfo"]),
  methods: {
    save(collectionDate) {
      this.$refs.menu.save(collectionDate);
    },

    browserSave(keyname, value) {
      localStorage.setItem(keyname, value);
      localStorage.setItem("step", JSON.stringify(2));
    },

    saveGenInfo() {
      const formData = {
        collectionDate: this.collectionDate,
        collectorName: this.collectorName,
        newMembers: this.newMembers,
        groupId: this.groupId,
        abandons: this.abandons,
        registeredMembers: this.registeredMembers,
        boysAttended: this.boysAttended,
        girlsAttended: this.girlsAttended,
        punishedMembers: this.punishedMembers,
        paidPenalities: this.paidPenalities,
        latest: this.latest,
      };

      // post data to the server
      ActionsService.SaveGenInfo(formData).then((response) => {
        // save collection id in localStorage,for later usage
        let collectionId = response.data.data.id;
        this.browserSave("collectionId", collectionId);
        store.commit("updateSteps", this.stepy);
      });
    },

    moveStep(stepy) {
      store.commit("updateSteps", stepy);
    },

    clear() {
      this.collectionDate = null;
    },
  },
};
</script>
