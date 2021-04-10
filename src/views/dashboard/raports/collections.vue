<template>
  <div class="container">
    <div class="main-title">
      <h2>collections</h2>
    </div>
    <div class="collections" v-if="loaded">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Date de collection
              </th>
              <th class="text-left">
                Nom du groupe
              </th>
              <th class="text-left">
                Diocese
              </th>
              <th class="text-left">
                Paroisse
              </th>
              <th class="text-left">
                état de la collection
              </th>
              <th class="text-left">
                Nom du collecteur
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in collections"
              :key="item.id"
              @click="viewCollection(item.id)"
            >
              <td>
                <p v-if="item.collection_date !== null">
                  {{ item.collection_date | formatDate }}
                </p>
                <p v-else>-</p>
              </td>
              <td>
                <p v-if="item.group !== null">
                  {{ item.group.name }}
                </p>
                <p v-else>-</p>
              </td>
              <td>
                <p v-if="item.group !== null">{{ item.group.diocese.name }}</p>
                <p v-else>-</p>
              </td>
              <td>
                <p v-if="item.group !== null">{{ item.group.paroisse.name }}</p>
                <p v-else>-</p>
              </td>
              <td>
                <v-btn
                  depressed
                  color="primary darken-2"
                  small
                  rounded
                  v-if="item.verified"
                >
                  <v-icon left>mdi-checkbox-marked-circle</v-icon>
                  complète
                </v-btn>
                <v-btn
                  depressed
                  color="red darken-2"
                  class="white--text"
                  small
                  rounded
                  v-else
                >
                  <v-icon left color="white">mdi-checkbox-blank-circle</v-icon>
                  incomplète
                </v-btn>
              </td>
              <td>{{ item.collector_name }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <!-- <div class="text-center">
        <v-pagination v-model="page" :length="lastPage" circle></v-pagination>
      </div> -->
      <!-- <v-data-table
        :headers="headers"
        :items="collections"
        :items-per-page="perPage"
        :page.sync="page"
        @page-count="pageCount = $event"
        :total-visible="totalVisible"
        item-key="id"
        class="elevation-1"
      >
        <template v-slot:[`item.collection_date`]="{ item }">
          {{ item.collection_date | formatDate }}
        </template>
      </v-data-table> -->
    </div>
    <div class="loading ma-5" v-else>
      <v-skeleton-loader class="mx-auto" type="table"></v-skeleton-loader>
    </div>
  </div>
</template>

<script>
import ActionsService from "@/services/actions.service";
export default {
  data() {
    return {
      search: "",
      calories: "",
      collections: [],
      loaded: false,
      page: 1,
      lastPage: 1,
      perPage: 10,
      pageCount: 0,
      totalVisible: 10,
      headers: [
        {
          text: "date de collection",
          align: "start",
          sortable: false,
          value: "collection_date",
        },
        {
          text: " Nom du groupe",
          align: "left",
          value: "group.name",
          sortable: true,
        },
        {
          text: "Diocese",
          align: "left",
          value: "group.diocese.name",
          sortable: true,
        },
        {
          text: "Paroisse",
          align: "left",
          value: "group.paroisse.name",
          sortable: true,
        },
        {
          text: "Nom du collecteur",
          align: "left",
          value: "collector_name",
          sortable: true,
        },
      ],
    };
  },

  watch: {
    options: {
      handler() {
        this.getCollections();
      },
      deep: true,
    },
  },

  mounted() {
    this.getCollections();
  },
  methods: {
    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value
          .toString()
          .toLocaleLowerCase()
          .indexOf(search) !== -1
      );
    },

    viewCollection(colid) {
      return this.$router.push({
        name: "single-collection",
        params: { colid },
      });
    },

    getCollections() {
      ActionsService.getCollections(this.pageCount).then((response) => {
        if (response.statusText === "OK") {
          this.collections = response.data.data.data;
          this.page = response.data.data.page;
          this.lastPage = response.data.data.lastPage;
          this.perPage = response.data.data.perPage;
          this.totalVisible = response.data.data.total;
          this.loaded = true;
        } else {
          alert("data not found");
        }
      });
    },
  },
};
</script>
