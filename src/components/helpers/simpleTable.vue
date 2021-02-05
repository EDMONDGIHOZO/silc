<template>
  <div class="table-container">
    <v-row>
      <v-col cols="12" md="5">
        <!-- sidebar informations -->
        <div v-if="singleDiocese.loaded">
          <v-row wrap elevation-1 class="title-bar mb-5">
            <v-col cols="12" class="col1">
              <h3>Diocese de {{ singleDiocese.data.name }}</h3>
              <v-chip class="ma-2" color="primary"
                >{{
                  singleDiocese.data.__meta__.paroisses_count
                }}
                Paroisses</v-chip
              >
              <v-chip class="ma-2" color="primary"
                >{{
                  singleDiocese.data.__meta__.total_diocese_groups
                }}
                groupe(s)</v-chip
              >
            </v-col>
            <v-col cols="12" class="col2">
              <dio-edit
                :dioId="singleDiocese.data.id"
                :dioName="singleDiocese.data.name"
              />
              <v-dialog
                v-model="deleteDialog"
                persistent
                max-width="350"
                v-if="singleDiocese.data.__meta__.total_diocese_groups < 1"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="red"
                    class="white--text mx-3"
                    depressed
                    rounded
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon left>mdi-delete</v-icon>Delete
                  </v-btn>
                </template>
                <v-card v-if="!gone">
                  <v-card-title class="diolog-title">
                    Voulez-vous vraiment supprimer ce diocèse?
                  </v-card-title>
                  <v-card-text
                    >tous les paroisses, groupes et collections de données liés
                    à ce diocèse auront disparu pour toujours!
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="green darken-1"
                      text
                      small
                      @click="deleteDialog = false"
                    >
                      retourner
                    </v-btn>
                    <v-btn
                      color="red"
                      rounded
                      outlined
                      text
                      class="mx-4"
                      small
                      @click="deleteDio(singleDiocese.data.id)"
                    >
                      continuer à supprimer
                    </v-btn>
                  </v-card-actions>
                </v-card>
                <v-card v-else>
                  <v-card-title>
                    {{ responseMessage }}
                  </v-card-title>
                  <v-card-actions>
                    <v-btn
                      color="green darken-1"
                      text
                      small
                      @click="returnback"
                    >
                      retourner
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="12" :md="singleDiocese.loaded ? 7 : 12">
        <!-- table informations informations -->
        <v-simple-table fixed-header v-if="singleDiocese.loaded">
          <template v-slot:default>
            <thead>
              <tr>
                <th
                  class="text-left"
                  v-for="header in headers"
                  :key="header.id"
                >
                  {{ header.title }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="paroisse in singleDiocese.data.paroisses"
                :key="paroisse.id"
              >
                <td>{{ paroisse.name }}</td>
                <td>{{ paroisse.__meta__.total_groups }}</td>
                <td>
                  <v-btn
                    color="info"
                    small
                    depressed
                    rounded
                    @click="goToPar(paroisse.id)"
                    >voir plus</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <div class="empty" v-else>
          <v-icon large class="ma-5">mdi-cursor-default-click</v-icon>
          <h4>
            sélectionnez le diocèse ci-dessus pour afficher ses paroisses ici
          </h4>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EditDio from "@/components/creation/dioceseEdit.vue";
import ActionsService from "@/services/actions.service";

export default {
  props: ["headers"],
  name: "tables",
  data: () => ({
    empty: true,
    deleteDialog: false,
    gone: false,
    responseMessage: "deleted successfully",
  }),
  components: {
    "dio-edit": EditDio,
  },
  computed: mapState(["singleDiocese"]),

  methods: {
    returnback() {
      this.deleteDialog = false;
      location.reload();
    },
    deleteDio(id) {
      ActionsService.deleteDiocese(id).then((response) => {
        if (response.statusText === "OK") {
          this.gone = true;
          this.$store.dispatch("getDioceses");
        }
      });
    },
    editDio(id) {
      this.$store.dispatch("editDiocese", id);
    },

    goToPar(parId) {
      return this.$router.push({ name: "paroisse", params: { parid: parId } });
    },
  },
};
</script>
<style lang="scss" scoped>
.title-bar {
  padding: 10px;
}
.title-bar .col1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(238, 237, 237);
}

.title-bar .col1 h3 {
  font-size: 16px;
}

.title-bar .col2 {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fcfcfc;
}
</style>