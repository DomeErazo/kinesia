<template>
  <v-card>
    <v-responsive :aspect-ratio="16 / 9">
      <h1 style="text-align: center; margin-bottom: 10px">
        Ingreso de Datos del nuevo postulante
      </h1>
      <img class="imagen" src="/ingresoDatos.svg" style="margin-top:30px" />
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
      facul: "",

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

      esControlador: false,

      prueba: [],
      dialog: false,
      dialogDelete: false,
   

      search: "",
      editedIndex: -1,
        cedula1: "",
      estado: true,
      idEmpresa: "",
      contrasena: "",
      cedula1: "",
    editedItem: {
        nombre: "",
        apellido: "",
        telefono: "",
        cedula: "",
        genero: "",
        correo: "",
      },
      defaultItem: {
        nombre: "",
        apellido: "",
        telefono: "",
        cedula: "",
        genero: "",
        correo: "",
      },
    };
  },
  mounted() {
 
    this.obtenerPost();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Registro" : "Editar Registro";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },

  },

  methods: {
    iniciarEntrevista(){
window.location.href="/Entrevista/Entrevista"
    },
    
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

  

    async obtenerPost() {
      try {
        const res = await axios.get("/api/personaRlEm/post/toxicosgroupSADO");

        const lis = res.data;
        console.log(lis);
        lis.forEach((element) => {
          if (element.usuario.estado == true) {
            element.usuario.estado = "Activo";
          } else {
            element.usuario.estado = "Inactivo";
          }
          this.desserts = res.data;
        });

        this.desserts = res.data;
     

        //  this.llenarTabla();
      } catch (err) {
      }
    },

    llenarTabla() {
         this.desserts.push({
        nombre: this.nombre,
        apellido: this.apellido,
        cedula: this.cedula,
        correo: this.correo,

        usuario: this.usuario,
        telefono: this.telefono,
        genero: this.genero,
      });
      this.obtenerPost();
    },

    async agregarPost() {
    if (
        !this.nombre ||
        !this.apellido ||
        !this.cedula ||
        !this.correo ||
        !this.telefono ||
        !this.genero ||
        !this.usuario ||
        !this.contrasena
      ) {
        this.$notifier.showMessage({
          content: "Rellene todos los datos",
          color: "warning",
        });
      } else {
        try {
          const res = await this.$axios.post(`api/insertPersona/4`, {
            nombre: this.nombre,
            apellido: this.apellido,
            genero: this.genero,
            correo: this.correo,
            telefono: this.telefono,

            rol: "post",
            cedula: this.cedula,

            usuario: {
              usuario: this.usuario,
              contrasena: this.contrasena,
              estado: true,
              rolIdrol: {
                id: "4",
                rol: "post",
              },
            },
          });
          this.obtenerPost();
            this.limpiar(),
            (this.id = ""),
            this.$notifier.showMessage({
              content: "Postulante añadido con éxito",
              color: "success",
            });
        } catch (err) {}
      }
      },
   

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