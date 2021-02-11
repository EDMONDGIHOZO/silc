<template>
  <div class="container">
    <v-row wrap class="pa-3">
      <v-col cols="12" class="titler">
        <h3 class="text-left">utilisateurs du système</h3>
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="success" depressed rounded v-bind="attrs" v-on="on">
              <v-icon left>mdi-account-plus</v-icon> NEW USER</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span class="text-center">New User</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="Legal first name*"
                      required
                      v-model="user.firstname"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="Legal last name*"
                      v-model="user.lastname"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Email*"
                      required
                      v-model="user.email"
                      type="email"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Password*"
                      type="password"
                      v-model="user.password"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      label="user name*"
                      type="text"
                      v-model="user.username"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-autocomplete
                      :items="roles"
                      item-value="id"
                      item-text="name"
                      label="Role"
                      multiple
                      v-model="user.role_id"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="danger darken-1" text @click="dialogView">
                ferme
              </v-btn>
              <v-btn color="blue darken-1" text @click="saveUser">
                enregistrer
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row wrap class="my-5" v-if="loaded">
      <v-col cols="12" md="4" v-for="user in users" :key="user.id">
        <v-card class="mx-auto" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline text-left">
                {{ user.firstname }} {{ user.lastname }}
              </div>
              <v-list-item-subtitle class="text-left">{{
                user.role.name
              }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar color="secondary white--text">
              {{ user.__meta__.collections_count }}
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn
              rounded
              text
              color="danger"
              @click="disableUser(user.id, user.active)"
              v-if="user.active"
            >
              DESACTIVE
            </v-btn>
            <v-btn
              rounded
              text
              color="primary"
              @click="disableUser(user.id, user.active)"
              v-else
            >
              ACTIVATE
            </v-btn>
            <v-spacer></v-spacer>
            <small class="mx-1">status</small>
            <v-icon :color="user.active ? 'primary' : 'danger'"
              >mdi-checkbox-blank-circle</v-icon
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" md="4" v-for="(i, index) in 6" :key="index">
        <loading type="card" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ActionsService from "@/services/actions.service";
import loading from "@/components/layouts/loaders.vue";
export default {
  name: "users",
  data: () => ({
    users: [],
    loaded: false,
    dialog: false,
    roles: [
      { id: 1, name: "admin" },
      { id: 2, name: "collector" },
    ],
    user: {
      username: "",
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      role_id: 0,
    },
  }),

  components: {
    loading,
  },

  mounted() {
    this.getUsers();
  },

  methods: {
    getUsers() {
      ActionsService.getUsers().then((response) => {
        if (response.statusText === "OK") {
          let users = response.data.data;
          this.users = users;
          this.loaded = true;
        }
      });
    },

    disableUser(id, currentStat) {
      this.loaded = false;
      const formData = {
        status: !currentStat,
      };
      ActionsService.updateUser(id, formData).then((response) => {
        if (response.statusText === "OK") {
          this.loaded = true;
          this.getUsers();
        }
      });
    },

    saveUser() {
      const formData = {
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        role_id: this.user.role_id,
      };

      ActionsService.saveUser(formData).then((response) => {
        if (response.statusText === "OK") {
          this.user = {
            username: "",
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            role_id: 0,
          };
          this.dialog = false;
          this.getUsers();
        } else if (response.data.status === "danger") {
          console.log(response.data.status);
        }
      });
    },

    dialogView() {
      this.user = {
        username: "",
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        role_id: 0,
      };
      this.dialog = !this.dialog;
    },
  },
};
</script>
<style scoped>
.titler {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(14, 253, 174);
}
</style>