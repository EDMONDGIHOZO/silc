<template>
  <div class="contents">
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-form @submit.prevent class="data-create-container" ref="dataForm">
      <v-row class="wrap my-4">
        <v-col cols="12">
          <h3>Membres du groupe</h3>
        </v-col>
        <v-col cols="12" md="6">
          <div class="form-col">
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
                    v-model="collectionDate"
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
                  v-model="collectionDate"
                  @change="save"
                ></v-date-picker>
              </v-menu>
              <v-text-field
                v-model="moisDe"
                label="Mois de"
                :rules="[rules.required]"
                clearable
                type="text"
                filled
                dense
                class="mx-2"
              ></v-text-field>
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="6">
          <div class="form-col">
            <div class="col-title">
              <p>Sélectionnez le Diocèse et Paroisse</p>
            </div>
            <div class="fields">
              <v-select
                :items="dioceses"
                label="Diocèse"
                @click="getDiocese"
                @change="getSingleDiocese"
                append-icon="mdi-church"
                filled
                item-text="name"
                item-value="id"
                :rules="[rules.required]"
                dense
                v-model="diocese_id"
              ></v-select>
              <v-select
                :items="paroisses"
                label="Paroisse"
                append-icon="mdi-stairs"
                @change="getParoisse"
                class="mx-2"
                filled
                item-text="name"
                item-value="id"
                :rules="[rules.required]"
                dense
                v-model="paroisse_id"
              ></v-select>
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="form-col">
            <div class="col-title">
              <p>Sélectionnez un groupe</p>
            </div>
            <div class="fields">
              <v-select
                :items="groups"
                label="Sélectionnez un groupe"
                append-icon="mdi-account-group"
                filled
                item-text="name"
                item-value="id"
                :rules="[rules.required]"
                dense
                v-model="groupId"
              ></v-select>
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="6">
          <div class="form-col">
            <div class="col-title">
              <p>Membres inscrits dans le mois précédent</p>
            </div>
            <div class="fields">
              <v-text-field
                v-model="prevRegisteredBoys"
                label="Garçons"
                :rules="[rules.required]"
                clearable
                type="number"
                filled
                dense
                class="mx-2"
              ></v-text-field>
              <v-text-field
                v-model="prevRegisteredGirls"
                label="Filles"
                clearable
                :rules="[rules.required]"
                filled
                type="number"
                dense
                class="mx-2"
              ></v-text-field>
            </div>
            <v-chip color="black" dark>Total : {{ prevMembers }} </v-chip>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="form-col">
            <div class="col-title">
              <p>Abandons au cours du mois actuel</p>
            </div>
            <div class="fields">
              <v-text-field
                v-model="abandonedBoys"
                label="Garçons"
                :rules="[rules.required]"
                clearable
                type="number"
                filled
                dense
                class="mx-2"
              ></v-text-field>
              <v-text-field
                v-model="abandonedGirls"
                label="Filles"
                clearable
                :rules="[rules.required]"
                filled
                type="number"
                dense
                class="mx-2"
              ></v-text-field>
            </div>
            <v-chip color="black" dark>Total : {{ abandonedMembers }} </v-chip>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-card flat outlined>
            <v-card-title class="col-title">
              Taux d’abandon mensuel (%)
            </v-card-title>
            <v-card-text class="taux">
              <table width="100%">
                <tr>
                  <td>Garçons</td>
                  <td>{{ abandonboysTaux }}</td>
                </tr>
                <tr>
                  <td colspan="2">
                    <v-divider></v-divider>
                  </td>
                </tr>
                <tr>
                  <td>Filles</td>
                  <td>{{ abandongirlsTaux }}</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>{{ abandonTauxTotal }}</td>
                </tr>
              </table>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <div class="form-col">
            <div class="col-title">
              <p>Nouveaux membres enregistrés dans le mois</p>
            </div>
            <div class="fields">
              <v-text-field
                v-model="newBoys"
                label="Garçons"
                :rules="[rules.required]"
                clearable
                type="number"
                filled
                dense
                class="mx-2"
              ></v-text-field>
              <v-text-field
                v-model="newGirls"
                label="Filles"
                clearable
                :rules="[rules.required]"
                filled
                type="number"
                dense
                class="mx-2"
              ></v-text-field>
            </div>
            <v-chip color="black" dark>Total : {{ newMembers }} </v-chip>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="form-col">
            <div class="col-title">
              <p>Membres actuels inscrits</p>
            </div>
            <div class="fields">
              <v-text-field
                v-model="actualBoys"
                disabled
                label="Garçons"
                :rules="[rules.required]"
                clearable
                type="number"
                filled
                dense
                class="mx-2"
              ></v-text-field>
              <v-text-field
                v-model="actualGirls"
                disabled
                label="Filles"
                clearable
                :rules="[rules.required]"
                filled
                type="number"
                dense
                class="mx-2"
              ></v-text-field>
            </div>
            <v-chip color="black" dark>Total : {{ actualMembers }} </v-chip>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <div class="form-col">
            <div class="col-title">
              <p>
                Membres présents en réunion à la date de collecte de données
              </p>
            </div>
            <div class="fields">
              <v-text-field
                v-model="attendedBoys"
                label="Garçons"
                :rules="[rules.required]"
                clearable
                type="number"
                filled
                dense
                class="mx-2"
              ></v-text-field>
              <v-text-field
                v-model="attendedGirls"
                label="Filles"
                clearable
                :rules="[rules.required]"
                filled
                type="number"
                dense
                class="mx-2"
              ></v-text-field>
            </div>
            <v-chip color="black" dark>Total : {{ attendedMembers }} </v-chip>
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-card flat outlined>
            <v-card-title class="col-title">
              Taux de participation à la réunion
            </v-card-title>
            <v-card-text class="taux">
              <table width="100%">
                <tr>
                  <td>Garçons</td>
                  <td>{{ boysTaux }}</td>
                </tr>
                <tr>
                  <td colspan="2">
                    <v-divider></v-divider>
                  </td>
                </tr>
                <tr>
                  <td>Filles</td>
                  <td>{{ girlsTaux }}</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>{{ tauxTotal }}</td>
                </tr>
              </table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-btn
        color="primary"
        type="submit"
        :loading="loading"
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
import store from "@/store/index";
import ActionsService from "@/services/actions.service";
export default {
  data: () => ({
    menu: false,
    overlay: false,
    loading: false,
    groups: [],
    moisDe: "",
    stepy: 2,
    commonRules: [(v) => v.length <= 1 || "Max 25 characters"],
    // data to be collected
    collectionDate: "",
    prevRegisteredBoys: 0,
    prevRegisteredGirls: 0,
    groupId: 0,
    newBoys: 0,
    newGirls: 0,
    abandonedGirls: 0,
    abandonedBoys: 0,
    attendedBoys: 0,
    attendedGirls: 0,
    collectorName: "",
    // validation rules
    rules: {
      required: (value) => !!value || "obligatoire!",
    },

    // frontend collections
    dioceses: [],
    paroisses: [],
    diocese_id: null,
    paroisse_id: null,
  }),

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  computed: {
    UserInfo() {
      return this.$store.state.UserInfo;
    },
    actualGirls() {
      let prgils = parseInt(this.prevRegisteredGirls);
      let newgils = parseInt(this.newGirls);
      let abands = parseInt(this.abandonedGirls);
      // calculate the actual girls
      const actuals = prgils - abands + newgils;
      return actuals;
    },
    actualBoys() {
      let prboys = parseInt(this.prevRegisteredBoys);
      let newboys = parseInt(this.newBoys);
      let abands = parseInt(this.abandonedBoys);
      // calculate the actual girls
      const actuals = prboys - abands + newboys;
      return actuals;
    },

    newMembers() {
      return this.summer(this.newBoys, this.newGirls);
    },
    prevMembers() {
      return this.summer(this.prevRegisteredGirls, this.prevRegisteredBoys);
    },
    actualMembers() {
      return this.summer(this.actualGirls, this.actualBoys);
    },
    attendedMembers() {
      return this.summer(this.attendedGirls, this.attendedBoys);
    },
    abandonedMembers() {
      return this.summer(this.abandonedGirls, this.abandonedBoys);
    },

    girlsTaux() {
      if (this.attendedGirls > 0) {
        //   calculate percentage
        return this.percentager(this.attendedGirls, this.actualGirls) + "%";
      } else {
        return 0 + "%";
      }
    },

    boysTaux() {
      if (this.attendedBoys > 0) {
        //   calculate percentage
        return this.percentager(this.attendedBoys, this.actualBoys) + "%";
      } else {
        return 0 + "%";
      }
    },

    // fait le taux total
    tauxTotal() {
      // abaje
      let presentGirls = parseInt(this.attendedGirls);
      let presentBoys = parseInt(this.attendedBoys);
      let presentTotal = presentGirls + presentBoys;
      // actual registered
      let actualBoys = parseInt(this.actualBoys);
      let actualGirls = parseInt(this.actualGirls);
      let actualTotal = actualBoys + actualGirls;

      const final = (presentTotal * 100) / actualTotal;
      if (final > 0) {
        return final.toFixed(1);
      } else {
        return 0;
      }
    },

    abandonboysTaux() {
      if (this.abandonedBoys > 0) {
        //   calculate percentage
        return (
          this.percentager(this.abandonedBoys, this.prevRegisteredBoys) + "%"
        );
      } else {
        return 0 + "%";
      }
    },
    abandongirlsTaux() {
      if (this.abandonedBoys > 0) {
        //   calculate percentage
        return (
          this.percentager(this.abandonedGirls, this.prevRegisteredGirls) + "%"
        );
      } else {
        return 0 + "%";
      }
    },

    abandonTauxTotal() {
      let x = parseInt(this.abandonedGirls);
      let y = parseInt(this.abandonedBoys);
      let z = parseInt(this.prevMembers);
      const tot = (x + y) * 100;
      let ave = tot / z;
      if (ave > 0) {
        return ave.toFixed(1);
      } else {
        return 0;
      }
    },
  },
  methods: {
    save(collectionDate) {
      this.$refs.menu.save(collectionDate);
    },

    getDiocese() {
      this.overlay = true;
      ActionsService.getDioceses().then((response) => {
        this.dioceses = response.data.data;
        this.overlay = false;
        this.collectorName = this.UserInfo.username;
      });
    },

    getSingleDiocese() {
      this.overlay = true;
      if (this.diocese_id !== null) {
        ActionsService.getDiocese(this.diocese_id).then((response) => {
          this.paroisses = response.data.data.paroisses;
          this.overlay = false;
        });
      }
    },
    getParoisse() {
      this.overlay = true;
      if (this.paroisse_id !== null) {
        ActionsService.getPar(this.paroisse_id).then((response) => {
          console.log(response.data);
          if (response.data.data.groups.length > 0) {
            this.groups = response.data.data.groups;
            this.overlay = false;
          } else {
            alert("cette paroisse n'a pas de groupes");
            this.paroisse_id = undefined;
            this.overlay = false;
          }
        });
      }
    },

    percentager(percent, total) {
      return ((percent * 100) / total).toFixed(1);
    },

    summer(x, b) {
      let number1 = parseInt(x);
      let number2 = parseInt(b);
      if (number2 >= 0 && number1 >= 0) {
        return number1 + number2;
      } else {
        return 0;
      }
    },

    browserSave(keyname, value) {
      localStorage.setItem(keyname, value);
    },

    saveGenInfo() {
      // do validation first
      if (this.$refs.dataForm.validate()) {
        const formData = {
          //  to be added soon
          collectionDate: this.collectionDate,
          groupId: this.groupId,
          newBoys: this.newBoys,
          newGirls: this.newGirls,
          prevRegisteredBoys: this.prevRegisteredBoys,
          prevRegisteredGirls: this.prevRegisteredGirls,
          abandonedGirls: this.abandonedGirls,
          abandonedBoys: this.abandonedGirls,
          attendedBoys: this.attendedBoys,
          attendedGirls: this.attendedGirls,
          collectorName: this.collectorName,
          actualGirls: this.actualGirls,
          actualBoys: this.actualBoys,
          moisDe: this.moisDe,
        };

        ActionsService.SaveGenInfo(formData).then((response) => {
          // save collection id in localStorage,for later usage
          let collectionId = response.data.data.id;
          // save the current collection in memory
          this.browserSave("collectionId", collectionId);
          const info = response.data.data;
          this.$store.commit("setCurrentCollectionInfo", info);
          this.$store.commit("updateSteps", this.stepy);
        });
      } else {
        alert("assurez-vous que, il n'y a pas de champ vide!");
      }
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

<style scoped>
.col-title {
  font-size: 16px;
  color: rgb(0, 0, 0);
  font-style: italic;
  text-align: center;
  font-weight: bold;
}



.taux {
  font-size: 20px;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 15px;
}
</style>
