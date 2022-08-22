<template>
  <v-responsive>
    <v-app>
      <div>
        <v-app-bar flat app color="#336699">
          <v-app-bar-nav-icon
            dark
            v-if="!$vuetify.breakpoint.xs"
            @click.stop="mini = !mini"
          />
          <v-app-bar-nav-icon dark v-else @click.stop="drawer = !drawer" />
          <v-toolbar-title>
            <img
                 class="mt-2"
              src="/kinesialogo.png"
              width="200"
              style="margin-left: -30px"
            />
          </v-toolbar-title>

          <v-spacer />

          <v-spacer />

          <div class="text-center">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn dark icon v-bind="attrs" v-on="on">
                  <v-icon style="color: #ffffff"> mdi-account </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <img
                      class="mt-2"
                      src="/kinesialogo.jpg"
                      width="60"
                      style="margin-left: -15px"
                    />
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>Usuario logueado</v-list-item-title>
                    <v-list-item-subtitle>Conectado</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="logout">
                  <v-list-item-title>
                    Cerrar sesión
                    <v-icon small> mdi-logout </v-icon>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-app-bar>
        <v-navigation-drawer
          v-if="!$vuetify.breakpoint.xs"
          v-model="drawer"
          :mini-variant.sync="mini"
          color="#336699"
          permanent
          dark
          app
        >
          <v-divider />
          <v-list>
            <v-list-item
              v-for="item in items"
              style="color: #ffffff"
              :key="item.key"
              :to="item.route"
              nuxt
              exact
            >
              <v-list-item-icon>
                <v-icon style="color: #ffffff">{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title style="color: #ffffff">{{
                  item.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon style="color: #ffffff">mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title style="color: #ffffff"
                  >Salir</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </div>
      <v-main>
        <Snackbar />
        <v-container>
          <nuxt />
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script>
import Snackbar from "~/components/layouts/Snackbar";
export default {
  components: {
    Snackbar,
  },

  data() {
    return {
      mini: false,
      drawer: false,
      items: [
        {
          title: "Ingreso",
          icon: "mdi-home-export-outline",
          route: "/Entrevista/inicio/",
          key: 1,
        },
     
        {
          title: "Entrevista",
          icon: "mdi-account-group-outline",
         
          disabled:true
        },
           {
          title: "Lista de Postulantes",
          icon: "mdi-account-group-outline",
          route: "/Entrevista/listaPost",

          key: 2,
        },
       
      ],
    };
  },

  methods: {
    async logout() {
     
      this.$router.push("/login");
     
    },
  },
};
</script>
<style scoped>
.v-btn--icon.v-size--default .v-icon,
.v-btn--fab.v-size--default .v-icon {
  color: #ffffff;
}
</style>
