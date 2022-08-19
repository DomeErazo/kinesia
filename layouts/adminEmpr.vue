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
              src="/imagen4.png"
              width="60"
              style="margin-left: -15px"
            />
          </v-toolbar-title>

          <v-spacer />
       
          <v-spacer />
          
          <div class="text-center">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn dark icon v-bind="attrs" v-on="on">
                  <v-icon style="color: #33CCFF"> mdi-account </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item >
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
              style="color: #33CCFF"
              :key="item.key"
              :to="item.route"
              nuxt
              exact
            >
              <v-list-item-icon>
                <v-icon style="color: #33CCFF">{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title style="color: #33CCFF">{{
                  item.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon style="color: #33CCFF">mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title style="color: #33CCFF"
                  >Salir</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
        <!-- <v-navigation-drawer v-else v-model="drawer" color="secondary" dark app>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img
                src="https://www.labicok.com/wp-content/uploads/2020/06/default-user-image.png"
              />
            </v-list-item-avatar>
          </v-list-item>
          <v-divider />
          <v-list>
            <v-list-item
              v-for="item in items"
              :key="item.key"
              :to="item.route"
              nuxt
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Salir</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer> -->
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
          title: "Inicio",
          icon: "mdi-home-export-outline",
          route: "/AdministradorEmpresarial/inicio/",
          key: 1,
        },
        
        {
          title: "Trabajadores",
          icon: "mdi-account-group-outline",
          route: "/AdministradorEmpresarial/trabajadoresEmpr",
          key: 2,
        },
        {
          title: "Resultados",
          icon: "mdi-account-group-outline",
          route: "/AdministradorEmpresarial/resultados",
          key: 3,
        },
        // {
        //   title: "Administradores",
        //   icon: "mdi-account-edit",
        //   route: "/creacionAdminCon",
        //   key: 4,
        // },
        // {
        //   title: "Plan Vacunación",
        //   icon: "mdi-clipboard-check-multiple-outline",
        //   route: "/planVacunas",
        //   key: 5,
        // }, {
        //   title: "Estadísticas",
        //   icon: "mdi-chart-bar",
        //   route: "/App",
        //   key: 6,
        // },
        // { title: 'Liderazgo', icon: 'mdi-pen', route: '/userUniversidad/liderazgo', key: 4 },
        // { title: 'Paso 2 - Actividades Prioritarias', icon: 'mdi-account-supervisor-outline', route: '/userUniversidad/pasoDos', key: 4 },
        // { title: 'Paso 3 - Recursos Escenciales', icon: 'mdi-ab-testing', route: '/userUniversidad/pasoTres', key: 5 },
        // { title: 'Paso 4 - Evaluacion de Riesgos', icon: 'mdi-notebook-edit-outline', route: '/userUniversidad/riesgos', key: 6 },
        // { title: 'Paso 5 - Protección ante Desastres', icon: 'mdi-alert', route: '/userUniversidad/mitigacion', key: 7 },
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
  color: #33CCFF;
}
</style>
