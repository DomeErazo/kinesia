<template>
  <v-app>
    <v-main class="fondo">
      <v-container class="fill-height" fluid>
        <v-row aling="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window class="contenedor">
                <v-row class="d-flex">
                  <v-col
                    class="
                      d-flex
                      flex-column
                      align-end
                      justify-space-around
                      order-2
                    "
                    cols="12"
                    sm="12"
                    md="6"
                    lg="6"
                  >
                    <img
                      class="imagen"
                      src="entrevista.svg"
                      style="max-height: 300px; margin-top: 15px"
                    />
                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="6">
                    <v-card-text
                      class="d-flex flex-column justify-space-around"
                    >
                      <img
                        class="imagen"
                        src="kinesiatitulo.jpg"
                        style="max-height: 150px"
                      />

                      <v-form>
                        <v-text-field
                          label="Usuario"
                          name="usuario"
                          v-model="usuario"
                          type="text"
                          color="secondary"
                          style="width: 200px; margin-left: 30%"
                        />
                        <v-text-field
                          id="Contraseña"
                          label="Contraseña"
                          name="contrasena"
                          v-model="contrasena"
                          type="password"
                          color="secondary"
                          style="width: 200px; margin-left: 30%"
                        />
                      </v-form>

                      <div class="text-center mt-3">
                        <v-btn
                          @click="enviar"
                          rounded
                          color="secondary"
                          elevation="13"
                          dark
                          >inicio</v-btn
                        >
                      </div>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  layout: "login",
  data() {
    return {
      usuario: "",
      contrasena: "",
    };
  },
  async mounted(){
 this.eliminar()  

  },
  methods: {
    async eliminar(){
     this.$cookies.remove("dataClient")
     this.$cookies.remove("postUs")
     this.$cookies.remove("datoEnt")

    },
    async enviar() {
      
      try {
        const respuesta = await this.$axios.post("/api/mineria/login",
        {
            usuario: this.usuario,
            contrasena: this.contrasena,
          },
        
        );

        console.log(respuesta.data)

        let type = respuesta.data.rol;
        this.$store.commit("session/logIn", respuesta.data);
        this.alert = false;
        if (type === "admin") {
          this.$router.push("/Administrador/inicio");
        } else if (type === "adminE") {
          this.$router.push("/AdministradorEmpresarial/inicio");
        } else if (type === "psico") {
          this.$router.push("/Entrevista/inicio");
        } else {
          this.$cookies.remove("dataClient");

          this.usuario = "";
          this.contrasena = "";
          this.$notifier.showMessage({
            content: "Corrija los campos del formulario para continuar",
            color: "success",
          });
        }
      } catch (err) {
        this.usuario = "";
        this.contrasena = "";
        this.$notifier.showMessage({
          content: "Corrija los campos del formulario para continuar",
          color: "success",
        });
      }
    },
  },
};
</script>

<style>
.imagen {
  width: 100%;
}
.contenedor {
  padding: 30px;
}
.logo {
  margin-left: auto;
  margin-right: auto;
  width: 20%;
}
.fondo {
  background: #36d1dc; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #486dbf,
    #c1c1e2
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #486dbf,
    #c1c1e2
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
