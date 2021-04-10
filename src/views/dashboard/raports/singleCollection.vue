<template>
  <div class="all">
    <div class="container" v-if="loaded">
      <v-card flat tile>
        <v-toolbar color="primary" flat rounded>
          <v-toolbar-title class="white--text"
            ><strong>
              Collection de {{ collectionInfo.collection_date | formatDate }}
            </strong>
          </v-toolbar-title>

          <v-spacer></v-spacer>
          <v-btn
            depressed
            color="orange darken-2"
            @click="editCollection"
            dark
            class="mx-3"
            rounded
          >
            <v-icon left>mdi-pencil-circle</v-icon>
            Modifier
          </v-btn>
          <v-btn
            depressed
            color="primary darken-2"
            rounded
            v-if="collectionInfo.verified"
          >
            <v-icon left>mdi-checkbox-marked-circle</v-icon>
            vérifié
          </v-btn>
          <v-btn depressed color="primary darken-2" rounded v-else>
            <v-icon left>mdi-checkbox-blank-circle</v-icon>
            marquer comme vérifié
          </v-btn>
        </v-toolbar>
      </v-card>
      <!---------------------------------------------------------------- end of collection title -------------------------------------------->
      <!---------------------------------------------------------------- the adding the collection components -------------------------------------------->
      <v-row wrap>
        <v-col cols="12" md="8">
          <div class="comps-container">
            <div id="basic">
              <basic-info
                :prevRegG="collectionInfo.prev_registered_girls"
                :prevRegB="collectionInfo.prev_registered_boys"
                :abG="collectionInfo.abandoned_boys"
                :abB="collectionInfo.abandoned_girls"
                :abmB="abandonboysTaux"
                :abmG="abandongirlsTaux"
                :abmT="abandonTauxTotal"
                :nmT="collectionInfo.new_girls + collectionInfo.new_boys"
                :nmG="collectionInfo.new_girls"
                :nmB="collectionInfo.new_boys"
                :actG="collectionInfo.actual_girls"
                :actB="collectionInfo.actual_boys"
                :prB="collectionInfo.attended_boys"
                :prG="collectionInfo.attended_girls"
                :collectionDate="collectionInfo.collection_date"
                :moisDe="collectionInfo.mois_de"
                :tauxG="girlsTaux"
                :tauxB="boysTaux"
                :tauxT="tauxTotal"
              />
            </div>

            <div class="epargne" id="epargne">
              <epargne
                v-if="collectionInfo.epargne !== null"
                :info="collectionInfo.epargne"
                :collectionId="collectionInfo.id"
              />
            </div>
            <div class="credit" id="credits">
              <credit-interne
                v-if="collectionInfo.credit !== null"
                :info="collectionInfo.credit"
                :collectionId="collectionInfo.id"
              />
            </div>
            <div id="relation">
              <relation-instution
                v-if="collectionInfo.relation !== null"
                :info="collectionInfo.relation"
                :collectionId="collectionInfo.id"
              />
            </div>
            <div class="entraide" id="entraide">
              <entraide
                v-if="collectionInfo.entaraide !== null"
                :info="collectionInfo.entraide"
                :collectionId="collectionInfo.id"
              />
            </div>
            <div class="penalites" id="penalite">
              <penality-view
                v-if="collectionInfo.penalites !== null"
                :info="collectionInfo.penalites"
                :collectionId="collectionInfo.id"
              />
            </div>
            <div class="caisse" id="caisse">
              <caisse
                v-if="collectionInfo.caisse !== null"
                :info="collectionInfo.caisse"
                :collectionId="collectionInfo.id"
                :epargneEntre="collectionInfo.epargne.period_released_amount"
                :rebursedCapitalInterest="
                  collectionInfo.credit.rebursed_capital_interest
                "
                :entreSolidalite="collectionInfo.entraide.valeur_entrees"
                :entrePenalite="
                  collectionInfo.penalites.Montant_des_penalites_payees
                "
                :grantedCredit="collectionInfo.credit.granted_credit"
                :sortieSolidalite="collectionInfo.entraide.valeur_sorties"
              />
            </div>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <div class="liens">
            <v-list flat id="liens">
              <v-subheader>Liens rapides</v-subheader>
              <v-list-item-group v-model="selectedItem" color="primary">
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  v-scroll-to="`${item.ref}`"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
            <v-fab-transition>
              <v-btn
                color="primary"
                @click="goTop"
                class="topper"
                sticky
                ref="fab"
                fab
                right
                absolute
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
            </v-fab-transition>
          </div>
        </v-col>
        <v-col cols="12"> </v-col>
      </v-row>
    </div>
    <div class="loading ma-5" v-else>
      <v-skeleton-loader class="mx-auto" type="card"></v-skeleton-loader>
    </div>
  </div>
</template>

<script>
import ActionsService from "@/services/actions.service";
import store from "@/store/index";

// views
import Epargne from "@/components/view/Epargne.vue";
import BasicInfo from "@/components/view/BasicInfo.vue";
import Credit from "@/components/view/Credits.vue";
import Relation from "@/components/view/Relation.vue";
import Entraide from "@/components/view/Entraide.vue";
import Penality from "@/components/view/Penality.vue";
import Caisse from "@/components/view/Caisse.vue";

export default {
  name: "single-collection",
  props: ["colid"],

  components: {
    Epargne,
    "basic-info": BasicInfo,
    "credit-interne": Credit,
    "relation-instution": Relation,
    Entraide,
    "penality-view": Penality,
    Caisse,
  },

  data() {
    return {
      collectionInfo: {},
      loaded: false,
      nulls: [],
      selectedItem: {},
      items: [
        { text: "Membres du groupe", icon: "mdi-clock", ref: "#basic" },
        { text: "Epargnes", icon: "mdi-account", ref: "#epargne" },
        { text: "Crédits internes", icon: "mdi-flag", ref: "#credits" },
        {
          text: "Relations avec institutions financières",
          ref: "#relation",
          icon: "mdi-flag",
        },
        { text: "Caisse d’entraide", icon: "mdi-flag", ref: "#caisse" },
        { text: "Pénalités / amandes", icon: "mdi-flag", ref: "#penalite" },
      ],
    };
  },

  mounted() {
    this.getCollection();
    this.fillInfo();
  },

  computed: {
    abandonboysTaux() {
      if (this.collectionInfo.abandoned_boys > 0) {
        //   calculate percentage
        return (
          this.percentager(
            this.collectionInfo.abandoned_boys,
            this.collectionInfo.prev_registered_boys
          ) + "%"
        );
      } else {
        return 0 + "%";
      }
    },

    prevMembers() {
      return this.summer(
        this.collectionInfo.prev_registered_girls,
        this.collectionInfo.prev_registered_boys
      );
    },

    abandongirlsTaux() {
      if (this.collectionInfo.abandoned_girls > 0) {
        //   calculate percentage
        return (
          this.percentager(
            this.collectionInfo.abandoned_girls,
            this.collectionInfo.prev_registered_girls
          ) + "%"
        );
      } else {
        return 0 + "%";
      }
    },

    abandonTauxTotal() {
      let x = parseInt(this.collectionInfo.abandoned_girls);
      let y = parseInt(this.collectionInfo.abandoned_boys);
      let z = parseInt(this.prevMembers);
      const tot = (x + y) * 100;
      let ave = tot / z;
      if (ave > 0) {
        return ave.toFixed(1);
      } else {
        return 0;
      }
    },

    girlsTaux() {
      if (this.collectionInfo.attended_girls > 0) {
        //   calculate percentage
        return (
          this.percentager(
            this.collectionInfo.attended_girls,
            this.collectionInfo.actual_girls
          ) + "%"
        );
      } else {
        return 0 + "%";
      }
    },

    boysTaux() {
      if (this.collectionInfo.attended_boys > 0) {
        //   calculate percentage
        return (
          this.percentager(
            this.collectionInfo.attended_boys,
            this.collectionInfo.actual_boys
          ) + "%"
        );
      } else {
        return 0 + "%";
      }
    },

    // fait le taux total
    tauxTotal() {
      // abaje
      let presentGirls = parseInt(this.collectionInfo.attended_girls);
      let presentBoys = parseInt(this.collectionInfo.attended_boys);
      let presentTotal = presentGirls + presentBoys;
      // actual registered
      let actualBoys = parseInt(this.collectionInfo.actual_boys);
      let actualGirls = parseInt(this.collectionInfo.actual_girls);
      let actualTotal = actualBoys + actualGirls;

      const final = (presentTotal * 100) / actualTotal;
      if (final > 0) {
        return final.toFixed(1);
      } else {
        return 0;
      }
    },
  },

  methods: {
    goto(refName) {
      alert(refName);
    },
    goToEdit() {
      this.$router.push({ name: "data-collection" });
    },
    goTop() {
      let options = {
        top: 0,
        left: 0,
        behavior: "smooth",
      }; // left and top are coordinates
      window.scroll(options);
    },
    getCollection() {
      ActionsService.getCollection(this.colid).then((response) => {
        if (response.statusText === "OK") {
          this.collectionInfo = response.data.data;
          this.loaded = true;
        } else {
          alert("data not found");
        }
      });
    },

    // when we want to edit
    fillInfo() {
      let data = this.collectionInfo;
      if (data !== null) {
        console.log(data);
      }
    },

    editCollection() {
      let stepy = 1;
      store.commit("setCurrentCollectionInfo", this.collectionInfo);
      this.$router.push({ name: "data-collection" });
      store.commit("updateSteps", stepy);
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
  },
};
</script>

<style lang="scss" scoped>
.comps-container {
  background: #119f4a;
  border: 1px solid #ececec;
  box-sizing: border-box;
  border-radius: 6px;
  padding: 15px;
  margin-top: 20px;
}

.liens {
  position: fixed;
}

.topper {
  margin-top: 250px;
}
</style>
