<template>
  <v-card>
    <v-responsive :aspect-ratio="16 / 9">
      <v-layout align-start>
        <v-flex>
          <v-card class="mx-auto" tile>
            <v-row
              class="text-md-center"
              style="
                height: 200px;
                background-color: #336699;
                margin-left: 15px;
                margin-right: 15px;
                margin-top: 15px;
              "
            >
              <v-col cols="2"></v-col>
              <v-col cols="8">
                <h1
                  style="
                    height: 100%;
                    color: white;
                    margin-top: 30px;
                    font-size: 50px;
                  "
                  class="text-md-center"
                >
                  Consejos para la entrevista de trabajo
                </h1>
              </v-col>
              <v-col cols="2"></v-col>
            </v-row>

            <v-row
              class="text-md-center"
              style="
                height: 200px;
                margin-left: 15px;
                margin-right: 15px;
                margin-top: 25px;
              "
            >
              <v-col><img src="/1.svg" width="100%" /></v-col>
              <v-col cols="9">
                <h1 style="color: #336699; margin-top: 30px">
                  1. Escucha las recomendaciones del entrevistador
                </h1>
                <p>
                  La primera impresión que causarás al entrevistador dependerá
                  de tu colaboración y atención a sus recomendaciones, recuerda
                  hacerle las preguntas necesarias para que no te quedes con
                  dudas, ya que una vez iniciada la entrevista no podrán ser
                  resueltas
                </p>
              </v-col>
            </v-row>

            <v-row
              class="text-md-center"
              style="
                height: 200px;
                margin-left: 15px;
                margin-right: 15px;
                margin-top: 25px;
              "
            >
              <v-col cols="9">
                <h1 style="color: #3baa9b; margin-top: 30px">
                  2. Mira a la cámara
                </h1>
                <p>
                  Al comenzar la entrevista se encenderá la cámara y se iniciará
                  el proceso de análisis psicológico, por lo que es importante
                  que al responder las preguntas en lugar dirigirte al
                  entrevistardor, mires directamente a la cámara
                </p>
              </v-col>
              <v-col><img src="/2.svg" width="100%" /></v-col>
            </v-row>
            <v-row
              class="text-md-center"
              style="
                height: 200px;
                margin-left: 15px;
                margin-right: 15px;
                margin-top: 25px;
              "
            >
              <v-col><img src="/3.svg" width="70%" /></v-col>
              <v-col cols="9">
                <h1 style="color: #6264aa; margin-top: 30px">
                  3. Actúa con naturalidad
                </h1>
                <p>
                  Es cierto que el tener que dirigirte a la cámara en muchas
                  ocasiones puede resultar incómodo, sin embargo, te
                  recomendamos actuar con la mayor naturalidad posible ya que
                  serán rasgos que puedan afectar al resultado final. No te
                  preocupes que la entrevista no será grabada, por lo que una
                  vez terminado este proceso los únicos datos registrados serán
                  los de tu análisis psicológico
                </p>
              </v-col>
            </v-row>
            <v-row
              class="text-md-center"
              style="
                height: 200px;
                margin-left: 15px;
                margin-right: 15px;
                margin-top: 25px;
              "
            >
              <v-col cols="9">
                <h1 style="color: #a8e0d7; margin-top: 30px">4. Sé sincero</h1>
                <p>
                  Además de actuar con normalidad es muy importante que seas
                  sincero en tus respuestas, recuerda que la persona que te está
                  entrevistando estará atenta a tu comportamiento y
                  posteriormente hará una comparación de lo que vió con los
                  resultados obtenidos a partir de la aplicación
                </p>
              </v-col>
              <v-col><img src="/4.svg" width="100%" /></v-col>
            </v-row>
            <v-row
              class="text-md-center"
              style="margin-left: 15px; margin-right: 15px; margin-top: 25px"
            >
              <v-col>
                <p>
                  Si estás de acuerdo con todos los puntos explicados por el
                  entrevistador y escritos anteriormente, por favor haz click en
                  "continuar" y empezaremos con la entrevista. ¡Éxito!
                </p>
              </v-col>
            </v-row>
            <v-row
              class="text-md-center"
              style="margin-left: 15px; margin-right: 15px; margin-bottom: 25px"
            >
              <v-col cols="5"></v-col>
              <v-col cols="2">
                <v-btn color="primary" @click="guardarEntrevista">
                  Continuar</v-btn
                >
              </v-col>
              <v-col cols="5"></v-col>
            </v-row>
          </v-card>
        </v-flex>
      </v-layout>
    </v-responsive>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  layout: "entrevista",
  data() {
    return {
      cedula:"",
      nombre:"",
      apellido:"",
    };
  },
  methods: {

    async guardarEntrevista() {
    
      const hoy = new Date();

      const fechaEntrevista=hoy;

      let ced = this.$cookies.get("postUs").cedula;
      let entre = this.$cookies.get("dataClient").nombre;
      let enteA = this.$cookies.get("dataClient").apellido;
      try {
          const res = await this.$axios.post(`api/entrevistaPst?cedula=${ced}`, {
        nombreEntrevistador: entre +" "+ enteA,
        gestos: null,
        fechaEntrevista: fechaEntrevista,
      });
      this.$cookies.set('datoEnt', res.data)
      window.location.href = "/Entrevista/Entrevista";
      } catch (error) {
        
      }


    },
  },
};
</script>
<style >
</style>