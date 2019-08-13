<template>
  <v-app id="app">
    <v-navigation-drawer
      app
      class="nsys-navigation-drawer"
    >
      <div class="nsys-navigation-drawer-title">
        <img
          src="./assets/icom_logo.svg"
          alt
        />
      </div>

      <v-list dense>
        <v-list-group :value="true">
          <template v-slot:activator>
            <v-list-item-title class="nsys-list-group-item-title">Projects</v-list-item-title>
          </template>
          <v-list-item @click="true">
            <v-list-item-icon style="margin-right: 8px !important;">
              <v-icon>mdi-google-circles-extended</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>INSYS #1</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="true">
            <v-list-item-icon style="margin-right: 8px !important;">
              <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>New Project</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title class="nsys-list-group-item-title">Manage</v-list-item-title>
          </template>
          <v-list-item to="/manage/devices">
            <v-list-item-content>
              <v-list-item-title>Devices</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/">
            <v-list-item-content>
              <v-list-item-title>Virtual Private Networks</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title class="nsys-list-group-item-title">Account</v-list-item-title>
          </template>
          <v-list-item to="/">
            <v-list-item-content>
              <v-list-item-title>Profile</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/">
            <v-list-item-content>
              <v-list-item-title>Organisation</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/">
            <v-list-item-content>
              <v-list-item-title>Users</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/">
            <v-list-item-content>
              <v-list-item-title>Billing</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item-title class="nsys-list-group-item-title">Administration</v-list-item-title>
          </template>
          <v-list-item to="/administration/organisations">
            <v-list-item-content>
              <v-list-item-title>Organisations</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/administration/users">
            <v-list-item-content>
              <v-list-item-title>Users</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      class="nsys-app-bar"
    >
      <v-spacer></v-spacer>
      <!-- <v-toolbar-items> -->
      <v-menu
        v-model="menuDropdown"
        :close-on-content-click="true"
        :nudge-width="200"
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            color="light-green"
            dark
            depressed
            v-on="on"
            class="mr-2"
          >
            Create
            <v-icon right>{{ menuDropdown ? 'mdi-chevron-up' : 'mdi-chevron-down'}}</v-icon>
          </v-btn>
        </template>

        <v-card
          class="mx-auto"
          max-width="400"
          tile
        >
          <v-list>
            <v-list-item
              two-line
              @click.stop="menuDropdown = false; $router.replace({name: 'manage-devices', query: { create: true }});"
            >
              <v-list-item-content>
                <v-list-item-title>Device</v-list-item-title>
                <v-list-item-subtitle>Create a new managed device</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
      <!-- </v-toolbar-items> -->
      <v-btn
        icon
        color="primary"
      >
        <v-icon>mdi-help-circle-outline</v-icon>
      </v-btn>
      <v-btn
        icon
        color="primary"
      >
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
      <v-btn
        icon
        color="primary"
      >
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content class="nsys-content">
      <v-container
        fluid
        grid-list-xs
      >
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      menuDropdown: false,
      items: [
        { title: "Dashboard", icon: "fas fa-home" },
        { title: "Photos", icon: "far fa-images" },
        { title: "About", icon: "far fa-address-card" }
      ],
      right: null
    };
  }
};
</script>

<style scoped>
.nsys-navigation-drawer {
  background-color: #ececec !important;
}
.nsys-navigation-drawer-title {
  padding-top: 8px;
  padding-left: 10px;
  margin-bottom: -6px;
}
.nsys-navigation-drawer-title > img {
  height: 48px;
}
.nsys-app-bar {
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0),
    0px 1px 1px 0px rgba(0, 0, 0, 0), 0px 1px 3px 0px rgba(0, 0, 0, 0.1) !important;
}
.nsys-content {
  background-color: #ffffff !important;
  margin-top: 24px;
}
.nsys-list-group-item-title {
  color: #666 !important;
  text-transform: uppercase !important;
  font-size: 0.75rem !important;
}
/*.v-list-item--active {
  background-color: #ffe0b2;
  color: #e65100;
}*/
</style>
