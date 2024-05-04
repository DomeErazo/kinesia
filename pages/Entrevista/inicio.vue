<template>
  <v-card>
    <v-responsive :aspect-ratio="16 / 9">
      <h1 style="text-align: center; margin-bottom: 10px">
        Ingreso de Datos del nuevo postulante
      </h1>
      <img class="imagen" src="/ingresoDatos.svg" style="margin-top:30px; width: 300px;" />
      <div class="container">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="15" md="8">
            <v-card-text class="elevation-12" id="card-in" style="margin-top:30px">
              <v-form ref="form" v-model="form">
                <p>Por favor ingrese los datos del postulante:</p>
                <v-text-field
                  ref="nombres"
                  label="Nombres"
                  outlined
                  rounded
                  v-model="nombre"
                  type="text"
                  color="primary"
                >
                </v-text-field>
                <v-text-field
                  ref="apellidos"
                  label="Apellidos"
                  outlined
                  rounded
                  v-model="apellido"
                  type="text"
                  color="primary"
                >
                </v-text-field>
                <v-text-field
                  ref="cedula"
                  label="Cédula"
                  outlined
                  rounded
                  v-model="cedula"
                  :rules="[rules.ced]"
                  counter
                  maxlength="10"
                  color="primary"
                >
                </v-text-field>
                <v-text-field
                  ref="telefono"
                  label="Teléfono"
                  outlined
                  rounded
                  v-model="telefono"
                  maxlength="10"
                  :rules="[rules.tel]"
                  counter
                  color="primary"
                >
                </v-text-field>
                <v-select
                  :items="generos"
                  label="Género"
                  outlined
                  rounded
                  v-model="genero"
                ></v-select>

                <v-text-field
                  ref="correo"
                  label="Correo electrónico"
                  outlined
                  rounded
                  v-model="correo"
                  type="email"
                  :rules="[rules.email]"
                  color="primary"
                >
                </v-text-field>
           
              </v-form>
            </v-card-text>

            <v-btn id="btn-ingreso" color="secondary" @click="agregarPost">
              Agregar postulante
            </v-btn>
            <v-dialog v-model="dialog" max-width="750px">
            <v-card
    class="mx-auto"
    max-width="750"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          Gracias por añadir un nuevo postulante
        </div>
        <v-list-item-title class="text-h5 mb-1">
         A continuación será dirigido al proceso de entrevista
        </v-list-item-title>
        <v-spacer></v-spacer>
        <v-list-item-subtitle>Por favor dirija la computadora al postulante y no olvide mencionarle que la entrevista será con la cámara encendida</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar size="100">
             <img src="/k-logo.png"/>
      </v-list-item-avatar>
   
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
        @click="iniciarEntrevista"
      >
        Continuar
      </v-btn>
    </v-card-actions>
  </v-card>
          
            </v-dialog>
          </v-col>
        </v-row>
       
      </div>

    </v-responsive>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  layout: "entrevista",

  data() {
    return {
      valid: true,
     
      rules: {
        required: (value) => !!value || "Campo Requerido.",

        counter: (value) => value.length == 10 || "Se requiere 10 dígitos",
        ced: (value) => {
          const pattern = /^[0-9]*$/;
          return pattern.test(value) || "Solo números";
        },
        tel: (value) => {
          const pattern = /^([0])+(9)+([0-9])*$/;
          return pattern.test(value) || "No es un número telefónico válido";
        },
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "No es un correo válido.";
        },
        cedula: (value) => this.validar(value) || "Cédula inválida",
      },

      generos: ["Masculino", "Femenino"],
      cedula: "",
      nombre: "",
      apellido: "",
      correo: "",
      usuario: "",
      telefono: "",
      genero: "",
dialog:false,
  
      prueba: [],
    

      search: "",
      editedIndex: -1,
        cedula1: "",
      estado: true,
      idEmpresa: "",
      contrasena: "",
      cedula1: "",
    
    };
  },
  mounted() {
 console.log(this.$cookies.get("dataClient").empresa);
    
  },
  computed: {
 
  },

  watch: {


  },

  methods: {
  


   iniciarEntrevista() {
      window.location.href = "/Entrevista/consejos";
    },
     async agregarPost() {
    if (
        !this.nombre ||
        !this.apellido ||
        !this.cedula ||
        !this.correo ||
        !this.telefono ||
        !this.genero 
      ) {
        this.$notifier.showMessage({
          content: "Rellene todos los datos",
          color: "warning",
        });
        this.dialog=false
      } else {
        let Nempresa = this.$cookies.get("dataClient").persona.empresa.id;
        try {
          const res = await this.$axios.post(`/api/mineria/insertPersona/${Nempresa}/4`, {
            nombre: this.nombre,
            apellido: this.apellido,
            genero: this.genero,
            correo: this.correo,
            telefono: this.telefono,

            rol: "post",
            cedula: this.cedula,

            usuario: {
              usuario:null,
              contrasena: null,
              estado: true,
            },
          });
        
       this.limpiar();
      
            this.dialog=true;
            this.$cookies.set('postUs', res.data)
        } catch (err) {
            this.$notifier.showMessage({
              content: "Asegúrese que la cédula sea única",
              color: "error",
            });
        }
      }
      },
      async limpiar(){
         (this.nombre = ""),
        (this.apellido = ""),
        (this.cedula = ""),
        (this.telefono = ""),
        (this.genero = ""),
        (this.correo = ""),
        this.$refs.form.reset();
      }
   

  },
};
</script>
<style >
.imagen {
  margin-left: 35%;
  width: 30%;
}
#btn-ingreso {
  margin-top: 2%;
  margin-left: 40%;
}
</style>