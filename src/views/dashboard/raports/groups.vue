<template>
  <div class="container">
    <v-data-table
      :headers="headers"
      :items="groupes"
      sort-by="name"
      class="elevation-1"
      :search="search"
      @click:row="handleClick"
      v-if="showTable"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>TOUS LES GROUPES</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer />
          <v-btn color="success" depressed rounded router to="/create/groupe">
            <v-icon plus>mdi-plus</v-icon> Nuveau</v-btn
          >
          <v-dialog v-model="dialog" max-width="800px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Nom"
                        outlined
                        rounded
                        dense
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="editedItem.credit_group_max_time"
                        label="Duree maximale"
                        outlined
                        type="number"
                        rounded
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="editedItem.monthly_interest"
                        label="Interets mansuel"
                        outlined
                        type="number"
                        rounded
                        dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="editedItem.end_date"
                        label="Date de Fin"
                        outlined
                        type="date"
                        rounded
                        dense
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- DELETION -->
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="font-weight-bold"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-text-field
          v-model="search"
          label="recherche par nom"
          outlined
          max-width="500"
          dense
          class="mx-4"
        ></v-text-field>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
    <loading v-else type="table" />
  </div>
</template>
<script>
import ActionsService from "@/services/actions.service";
import loading from "@/components/layouts/loaders.vue";
export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    showTable: false,
    groupes: [],
    headers: [
      {
        text: "Nom",
        align: "start",
        sortable: false,
        value: "name",
        cellClass: "font-weight-black caption",
      },
      {
        text: "Code",
        value: "group_code",
        cellClass: "font-weight-black caption",
      },
      { text: "Diocese", value: "diocese.name" },
      { text: "Paroisse", value: "paroisse.name" },
      {
        text: "Duree maximale",
        value: "credit_group_max_time",
      },
      { text: "Taux Mensuel", value: "monthly_interest" },
      { text: "date créée", value: "start_date", cellClass: "dateField" },
      {
        text: "fin du cycle actuel",
        value: "end_date",
        cellClass: "dateField",
      },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    itemId: 0,
    editedItem: {
      name: "",
      credit_group_max_time: 0,
      monthly_interest: 0,
      end_date: "",
    },
    defaultItem: {
      name: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Group" : "Editer le groupe";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },
  components: {
    loading,
  },

  methods: {
    initialize() {
      ActionsService.getGroups().then((response) => {
        if (response.statusText === "OK") {
          const data = response.data.data;
          this.groupes = data;
          this.showTable = true;
        }
      });
    },

    handleClick(row) {
      const groupId = row.id;
      return this.$router.push({
        name: "group-view",
        params: { groupId: groupId },
      });
    },

    editItem(item) {
      this.editedIndex = this.groupes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.itemId = item.id;
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = item.id;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      const gid = this.editedIndex;
      ActionsService.deleteGroup(gid).then((response) => {
        if (response.statusText === "OK") {
          this.closeDelete();
          location.reload();
        } else {
          alert("the group is not deleted");
        }
      });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.groupes[this.editedIndex], this.editedItem);
        const formData = {
          maxCredit: this.editedItem.credit_group_max_time,
          monthlyInterest: this.editedItem.monthly_interest,
          name: this.editedItem.name,
          endDate: this.editedItem.end_date,
        };
        ActionsService.editGroup(this.itemId, formData).then((response) => {
          console.log(response.statusText);
        });
      } else {
        this.groupes.push(this.editedItem);
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }
      this.close();
    },
  },
};
</script>


<style lang="scss" scoped>
.dateField {
  overflow: hidden;
  display: none;
  font-weight: bold;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
}
</style>