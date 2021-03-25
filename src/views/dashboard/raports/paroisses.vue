<template>
  <div class="container">
    <div class="title-container">
      <h4>Toutes les Paroisses</h4>
      <v-btn color="success" router to="/create/paroisse" rounded depressed
        ><v-icon>mdi-plus</v-icon> Nouvelle</v-btn
      >
    </div>
    <div class="table-container" v-if="showTable">
      <v-data-table :headers="headers" :items="paroisses" :items-per-page="10">
        <template v-slot:item.actions="{ item }">
          <v-btn
            color="info"
            depressed
            rounded
            small
            @click="goToPar(item)"
            class="mr-2"
            >voir plus</v-btn
          >
          <v-btn
            color="red"
            depressed
            dark
            rounded
            small
            @click="deleteItem(item)"
            class="mr-2"
            >supprimer</v-btn
          >
        </template>
      </v-data-table>

      <v-dialog v-model="dialogDelete" max-width="600px">
        <v-card>
          <v-card-title class="font-weight-bold"
            >Êtes-vous sûr de vouloir supprimer cette paroisse?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeDelete"
              >Annuler</v-btn
            >
            <v-btn color="blue darken-1" text @click="deleteItemConfirm"
              >OK</v-btn
            >
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <loading v-else type="table" />
  </div>
</template>

<script>
import ActionsService from "@/services/actions.service";
import loading from "@/components/layouts/loaders.vue";
export default {
  data() {
    return {
      dialogDelete: false,
      headers: [
        {
          text: "Paroisse",
          sortable: true,
          align: "start",
          value: "name",
          cellClass: "font-weight-black",
        },
        { text: "diocese", value: "diocese.name", align: "center" },
        {
          text: "nombres de groupes",
          value: "__meta__.total_groups",
          align: "center",
        },
        {
          text: "Fois de collecte des données",
          value: "__meta__.collections_count",
          align: "center",
        },
        { text: "Actions", align: "center", value: "actions", sortable: false },
      ],
      paroisses: [],
      showTable: false,
      editedIndex: -1,
      editedItem: {},
    };
  },

  mounted() {
    this.getData();
  },

  components: {
    loading,
  },
  methods: {
    getData() {
      ActionsService.allParoisses().then((response) => {
        if (response.statusText === "OK") {
          const data = response.data.data;
          this.paroisses = data;
          this.showTable = true;
        }
      });
    },

    goToPar(item) {
      this.editedIndex = this.paroisses.indexOf(item);
      const pid = item.id;
      return this.$router.push({ name: "paroisse", params: { parid: pid } });
    },
    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.editedIndex = item.id;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      const pid = this.editedIndex;
      ActionsService.deleteParoisse(pid).then((response) => {
        if (response.statusText === "OK") {
          this.paroisses.splice(this.editedIndex);
          this.closeDelete();
          alert("la paroisse a été supprimée avec succès");
          location.reload();
        } else {
          alert("paroisse is not deleted");
        }
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>
