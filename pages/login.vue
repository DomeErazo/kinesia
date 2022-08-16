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
                                       <img class="imagen" src="entrevista.svg" style="max-height:300px; margin-top: 15px;"/>

                  </v-col>
                  <v-col cols="12" sm="12" md="6" lg="6">
                    <v-card-text
                      class="d-flex flex-column justify-space-around"
                    >
   
                       <img class="imagen" src="kinesiatitulo.jpg" style="max-height:150px"/>
                        
                      <v-form>
                        <v-text-field
                          label="Usuario"
                          name="usuario"
                          v-model="username"
                          type="text"
                          color="secondary"
                          style="width:200px; margin-left: 30%;"
                        />
                        <v-text-field
                          id="Contraseña"
                          label="Contraseña"
                          name="password"
                          v-model="password"
                          type="password"
                          color="secondary"
                          style="width:200px; margin-left: 30%;"
                        
                        />
                      </v-form>

                      <div class="text-center mt-3">
                        <v-btn
                          @click="enviar"
                          rounded
                          color="secondary"
                          elevation="13"
                          dark
                          >Iniciar Sesión</v-btn
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
    
      username: "",
      password: "",
     
    };
  },
  methods: {
    async enviar() {
      try {
        const respuesta = await this.$axios.post("api/sgv/login", {
          username: this.username,
          password: this.password,
        });
        console.log(respuesta);

        let type = respuesta.data.maximo_role;

        if (type === "ROLE_ADMIN") {
          this.$router.push("/adminGlobal");
          
        } else if (type === "ROLE_USER") {
          this.$router.push("/adminEmpr");
       
        } else {
          this.$router.push("/Entrevista");
          
        }
      } catch (err) {
        console.log(err);
        if (err.response.status == 401) {
          this.$notifier.showMessage({
            content: "Datos incorrectos, por favor corrija para continuar",
            color: "error",
          });
        }
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
