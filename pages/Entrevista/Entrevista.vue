<template>
  <v-responsive :aspect-ratio="16 / 9">
    <div>
      <v-card class="mx-auto" tile>
        <v-row
          class="text-md-center"
          style="
            height: 100px;
            background-color: #8ea6ae;
            margin-left: 15px;
            margin-right: 15px;
            margin-top: 15px;
          "
        >
          <v-col cols="2"></v-col>
          <v-col cols="8">
            <h1
              style="
                color: white;

                font-size: 50px;
              "
              class="text-md-center"
            >
              Entrevista
            </h1>
          </v-col>
          <v-col cols="2"></v-col>
        </v-row>
      </v-card>

      <v-card class="text-center">
        <v-card-text>
          <video
            id="video"
            playsinline
            autoplay
            style="width: 300px; height: 300px"
          ></video>
       
          <!-- AQUI TOMA LA CAPTURA -->
          <canvas
            id="canvas"
            width="400"
            height="400"
            style="max-width: 100%"
            hidden
          ></canvas>
          <!-- AQUI SE ESTA GUARDANDO LA CAPTURA DEL CANVAS-->
          <canvas id="otrocanvas" v-show="false" width="300" height="300">otrocanvas</canvas>
   
          <!--IMPRIMO EL RESULTADO -->
       <div id="resul" style="font-size: 1px"></div>

          <v-btn color="primary" @click="cargarEntrevista">Finalizar</v-btn>
        </v-card-text>
      </v-card>
      <v-dialog v-model="dialog" max-width="750px">
        <v-card>
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                Tu entrevista ha finalizado con éxito
              </v-list-item-title>
              <v-spacer></v-spacer>
              <v-list-item-subtitle
                >A continuación tus resultados serán entregados al entrevistador
                a cargo, si haz sido favorecido te estaremos informando para que
                formes parte de nuestro equipo</v-list-item-subtitle
              >
              <h5>Gracias por tu colaboración</h5>
            </v-list-item-content>

            <v-list-item-avatar size="100">
              <img src="/k-logo.png" />
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn outlined rounded text @click="enviarResults">
              Continuar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    
    </div>
  </v-responsive>
</template>
<script>
import * as tf from "@tensorflow/tfjs";
import axios from "axios";
export default {
  layout: "entrevista",
  data() {
    return {
      overlay: false,
      isPlaying: false,
      value: [1000, 213],
      facingMode: "user",
      tamano: 100,
      currentStream: undefined,
      dialog: false,
      video: undefined,
      photo: undefined,
      photo: undefined,
      otrocanvas: undefined,
      ctx: undefined,
      prediction: "-",
      modelo: null,
      category: null,
      modelReady: false,
      percentage: 0,
      resultados: [],
    };
  },
  async mounted() {
    await this.initModel();
    this.mostrarCamara();
    
  },
  methods: {
    async initModel() {
      
      this.overlay = true;
      this.modelo = await tf.loadLayersModel("/modelo/model1.json");
      this.overlay = false;
   
    },
    
    async cargarEntrevista() {
      let entre = this.$cookies.get("datoEnt").id;
      const res = await axios.put(`/api/mineria/entrevistaGestos/${entre}`,
      {
    resultados:this.resultados
      },{
        headers:{
          Authorization:`Bearer `+this.$cookies.get("dataClient").token
        }
      }
      );
       this.dialog = true;
    },
    mostrarCamara() {
      this.video = document.querySelector("#video");
      this.canvas = document.querySelector("#canvas");
      this.otrocanvas = document.querySelector("#otrocanvas");
      this.photo = document.querySelector("#photo");
      this.ctx = this.canvas.getContext("2d");

      const opciones = {
        audio: false,
        video: {
          width: 400,
          height: 400,
        },
      };

      if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia(opciones)
          .then((localMediaStream) => {
            this.currentStream = localMediaStream;
            this.video.srcObject = localMediaStream;
       
            this.procesarCamara();
            // this.video.play();
            this.predecir();
          })
          .catch(function (err) {
            alert("No se pudo utilizar la camara :(");
            alert(err);
          });
      } else {
        alert("No existe la funcion getUserMedia");
      }
    },
    procesarCamara() {
      this.ctx.drawImage(this.video, 0, 0, 400, 400, 0, 0, 400, 400);
      setTimeout(this.procesarCamara, 20);
    },
    predecir() {
      if (this.modelo != null) {
        //REASIGNAMOS EL CANVAS A 300*300
        this.resamplesingle(this.canvas, 300, 300, this.otrocanvas);
        setTimeout(this.predecir, 8000);

        //Hacer la predicción

        const ctx2 = this.otrocanvas.getContext("2d");

       
        const imgData = ctx2.getImageData(0, 0, 300, 300);

        let arr = []; //ARREGLO COMPLETO PARA RECORRER LOS PIXELES
        let arr300 = []; //AL LLEGAR AL ARR300 POSICIONES SE PONE EN ARR COMO UN NUEVO INDICE
        for (let p = 0; p < imgData.data.length; p += 4) {
          const red = imgData.data[p] / 255;
          const green = imgData.data[p + 1] / 255;
          const blue = imgData.data[p + 2] / 255;

          arr300.push([red, green, blue]);
          if (arr300.length === 300) {
            arr.push(arr300);
            arr300 = [];
          }
        }

        arr = [arr];

        // const tensor = tf.tensor4d(arr);
        const tfarray = tf.tensor4d(arr);
        const resul = this.modelo.predict(tfarray).dataSync();
        // let resul = this.modelo.predict(tfarray).dataSync();
        let mayorIndice = resul.indexOf(Math.max.apply(null, resul));
        const class_names = [
          "aceptacion",
          "confianza",
          "inseguridad",
          "nervioso",
          "verdad",
        ];
        document.getElementById("resul").innerHTML = class_names[mayorIndice];
        if (mayorIndice == 0) {
          this.resul = "aceptacion";
        } else if (mayorIndice == 1) {
          this.resul = "confianza";
        }  else if (mayorIndice == 3) {
          this.resul = "inseguridad";
        }  else if (mayorIndice == 5) {
          this.resul = "nervioso";
        } else if (mayorIndice == 6) {
          this.resul = "verdad";
        }
      }

      this.resultados.push(this.resul);
    
      //
    },

  
  

    resamplesingle(canvas, width, height, resize_canvas) {
      const width_source = canvas.width;
      const height_source = canvas.height;
      width = Math.round(width);
      height = Math.round(height);
      const ratio_w = width_source / width;
      const ratio_h = height_source / height;
      const ratio_w_half = Math.ceil(ratio_w / 2);
      const ratio_h_half = Math.ceil(ratio_h / 2);

      const ctx = canvas.getContext("2d");
      const ctx2 = resize_canvas.getContext("2d");
      const img = ctx.getImageData(0, 0, width_source, height_source);
      const img2 = ctx2.createImageData(width, height);
      const data = img.data;
      const data2 = img2.data;

      for (let j = 0; j < height; j++) {
        for (let i = 0; i < width; i++) {
          const x2 = (i + j * width) * 4;
          let weight = 0;
          let weights = 0;
          let weights_alpha = 0;
          let gx_r = 0;
          let gx_g = 0;
          let gx_b = 0;
          let gx_a = 0;
          let center_y = (j + 0.5) * ratio_h;
          let yy_start = Math.floor(j * ratio_h);
          let yy_stop = Math.ceil((j + 1) * ratio_h);
          for (let yy = yy_start; yy < yy_stop; yy++) {
            let dy = Math.abs(center_y - (yy + 0.5)) / ratio_h_half;
            let center_x = (i + 0.5) * ratio_w;
            let w0 = dy * dy; //pre-calc part of w
            let xx_start = Math.floor(i * ratio_w);
            let xx_stop = Math.ceil((i + 1) * ratio_w);
            for (let xx = xx_start; xx < xx_stop; xx++) {
              let dx = Math.abs(center_x - (xx + 0.5)) / ratio_w_half;
              let w = Math.sqrt(w0 + dx * dx);
              if (w >= 1) {
                //pixel too far
                continue;
              }
              //hermite filter
              weight = 2 * w * w * w - 3 * w * w + 1;
              let pos_x = 4 * (xx + yy * width_source);
              //alpha
              gx_a += weight * data[pos_x + 3];
              weights_alpha += weight;
              if (data[pos_x + 3] < 255)
                weight = (weight * data[pos_x + 3]) / 250;
              gx_r += weight * data[pos_x];
              gx_g += weight * data[pos_x + 1];
              gx_b += weight * data[pos_x + 2];
              weights += weight;
            }
          }
          data2[x2] = gx_r / weights;
          data2[x2 + 1] = gx_g / weights;
          data2[x2 + 2] = gx_b / weights;
          data2[x2 + 3] = gx_a / weights_alpha;
        }
      }
      ctx2.putImageData(img2, 0, 0);
    },
    async enviarResults() {
      this.video.pause();
      window.location.href = "/Entrevista/listaPost";
    },
  },
};
</script>
<style scoped>
