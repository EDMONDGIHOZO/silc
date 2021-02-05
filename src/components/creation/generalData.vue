<template>
  <div class="contents">
    <v-form v-model="valid" @submit.prevent class="data-create-container">
      <v-row class="wrap my-4">
        <v-col cols="12">
          <h3>Reference du groupe</h3>
        </v-col>
        <v-col cols="12" md="4">
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
            v-model="debutEpargne"
            background-color="white"
            outlined
            dense
            rounded
            label="Date de début d’épargne du cycle actuel"
            required
            type="date"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="finEpargneCycle"
            background-color="white"
            outlined
            dense
            rounded
            label="Date probable de fin du cycle actuel"
            required
            type="date"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="maximalTimeCredit"
            background-color="white"
            outlined
            dense
            rounded
            label="Durée maximale convenue de crédit  (mois)"
            required
            type="number"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="currentRegisteredBoys"
            append-icon="mdi-account-multiple"
            background-color="white"
            outlined
            dense
            rounded
            label="Membres actuels inscrits(Garçons)"
            required
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="currentRegisteredGirls"
            append-icon="mdi-account-multiple"
            background-color="white"
            outlined
            dense
            rounded
            label="Membres actuels inscrits(Filles)"
            required
            type="number"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="registeredPreviousMonthBoys"
            append-icon="mdi-account-multiple"
            background-color="white"
            outlined
            dense
            rounded
            label="inscrits dans le mois précédent(Garçons)"
            required
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="registeredPreviousMonthGirls"
            append-icon="mdi-account-multiple"
            background-color="white"
            outlined
            dense
            rounded
            label="inscrits dans le mois précédent(Filles)"
            required
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="newMembersGirls"
            append-icon="mdi-account-multiple-plus"
            background-color="white"
            outlined
            dense
            rounded
            label="nouveaux membres(Filles)"
            required
            type="number"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="newMembersBoys"
            append-icon="mdi-account-multiple-plus"
            background-color="white"
            outlined
            dense
            rounded
            label="Nouveaux membres enregistrés (Garcons)"
            required
            type="number"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="abandonCurrentMonthBoys"
            append-icon="mdi-account-multiple-minus"
            background-color="white"
            outlined
            dense
            rounded
            label="membres abandonnés(Garcons)"
            required
            type="number"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="abandonCurrentMonthGirls"
            append-icon="mdi-account-multiple-minus"
            background-color="white"
            outlined
            dense
            rounded
            label="membres abandonnés(Filles)"
            required
            type="number"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="presentBoys"
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
            v-model="presentGirls"
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
    // data to be collected
    collectionDate: "",
    groupId: null,
    debutEpargne: "",
    finEpargneCycle: "",
    maximalTimeCredit: null,
    registeredPreviousMonthBoys: null,
    registeredPreviousMonthGirls: null,
    abandonCurrentMonthBoys: null,
    abandonCurrentMonthGirls: null,
    newMembersBoys: null,
    newMembersGirls: null,
    currentRegisteredBoys: null,
    currentRegisteredGirls: null,
    presentGirls: null,
    presentBoys: null,
    collectorName: "",
    latest: false,
    valid: false,
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
    },

    saveGenInfo() {
      const formData = {
        collectionDate: this.collectionDate,
        groupId: this.groupId,
        debutEpargne: this.debutEpargne,
        finEpargneCycle: this.finEpargneCycle,
        maximalTimeCredit: this.maximalTimeCredit,
        registeredPreviousMonthBoys: this.registeredPreviousMonthBoys,
        registeredPreviousMonthGirls: this.registeredPreviousMonthGirls,
        abandonCurrentMonthBoys: this.abandonCurrentMonthBoys,
        abandonCurrentMonthGirls: this.abandonCurrentMonthGirls,
        newMembersBoys: this.newMembersBoys,
        newMembersGirls: this.newMembersGirls,
        currentRegisteredBoys: this.currentRegisteredBoys,
        currentRegisteredGirls: this.currentRegisteredGirls,
        presentGirls: this.presentGirls,
        presentBoys: this.presentBoys,
        collectorName: this.collectorName,
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
