<template>
  <v-card>
    <v-responsive :aspect-ratio="16 / 9">
   
      <img class="imagen" src="/ingresoDatos.svg" style="margin-top:30px" />


      <v-layout align-start>
        <v-flex>
          <!-- Tabla con la lista de Facultades y sus carreras -->
          <v-data-table
            :headers="headers"
            :items="desserts"
            :search="search"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Resultados</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field
                  class="text-xs-center"
                  v-model="search"
                  append-icon-cb="search"
                  label="Buscar"
                  single-line
                  hide-details
                >
                </v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <v-card>
                    <v-card-title>
                      <!-- <span class="text-h5">{{ formTitle }}</span> -->
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="nombre"
                              label="Empresa"
                              :rules="[() => !!nombre || 'Campo obligatorio']"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text> Cancelar </v-btn>

                      <v-btn color="blue darken-1" text> Editar </v-btn>
                    </v-card-actions>
                             <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="iniciarEntrevista"> entrevista </v-btn>

                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" text> No hay registros </v-btn>
            </template>
          </v-data-table>
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
      listaFacultades: [],
      listaCarreras: [],
      cedula: "",
      nombres: "",
      apellidos: "",
      fechaNacimiento: "", //localDate
      correo: "",
      ced: [],
      usuario: "",
      telefono: "",
      semestre: 0,
      carrera: "",
      genero: "",

      esControlador: false,

      prueba: [],
      dialog: false,
      dialogDelete: false,
      // id: "",
      // departamentoProducto: "",
      // impactoExterno: "",
      // impactoInterno: "",

      headers: [
        {
          text: "Nombres",
          value: "nombres",
        },
        {
          text: "Apellidos",
          value: "apellidos",
        },
        {
          text: "Fecha",
          value: "fecha",
          sortable: true,
        },
        // {
        //   text: "Fecha de Nacimiento",
        //   value: "fechaNacimiento",
        // },
        {
          text: "Archivo",
          value: "archivo",
        },
       
         { text: "Acciones", value: "actions", sortable: false },
      ],
      search: "",
      desserts: [],
      editedIndex: -1,
      cedula1: "",
      // editedItem: {
      //   departamentoProducto: "",
      //   impactoExterno: "",
      //   impactoInterno: "",
      // },
      // defaultItem: {
      //   departamentoProducto: "",
      //   impactoExterno: "",
      //   impactoInterno: "",
      // },
    };
  },
  mounted() {
    this.obtenerListaEst();
    this.obtenerFac();
    // this.campos();
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
    facul: function () {
      this.prueba.forEach((elementos) => {
        if (elementos.nombre === this.facul) {
          this.listaCarreras = elementos.carreras;
          if (this.listaCarreras == null) {
            this.facul = null;

            this.$cookies.remove("ROLE_ADMIN");
            this.$notifier.showMessage({
              content: `La facultad no tiene carreras ingresadas`,
              color: "error",
            });
          }
        }
      });
    },
  },

  methods: {
    iniciarEntrevista(){
window.location.href="/Entrevista/Entrevista"
    },
    validar(cedula) {
      this.$cookies.set("cedula", cedula);
      //var cedula = document.getElementById("ced").value.trim();
      console.log(cedula);

      //Preguntamos si la cedula consta de 10 digitos
      if (cedula.length == 10) {
        //Obtenemos el digito de la region que sonlos dos primeros digitos
        var digito_region = cedula.substring(0, 2);

        //Pregunto si la region existe ecuador se divide en 24 regiones
        if (digito_region >= 1 && digito_region <= 24) {
          // Extraigo el ultimo digito
          var ultimo_digito = cedula.substring(9, 10);

          //Agrupo todos los pares y los sumo
          var pares =
            parseInt(cedula.substring(1, 2)) +
            parseInt(cedula.substring(3, 4)) +
            parseInt(cedula.substring(5, 6)) +
            parseInt(cedula.substring(7, 8));

          //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
          var numero1 = cedula.substring(0, 1);
          var numero1 = numero1 * 2;
          if (numero1 > 9) {
            var numero1 = numero1 - 9;
          }

          var numero3 = cedula.substring(2, 3);
          var numero3 = numero3 * 2;
          if (numero3 > 9) {
            var numero3 = numero3 - 9;
          }

          var numero5 = cedula.substring(4, 5);
          var numero5 = numero5 * 2;
          if (numero5 > 9) {
            var numero5 = numero5 - 9;
          }

          var numero7 = cedula.substring(6, 7);
          var numero7 = numero7 * 2;
          if (numero7 > 9) {
            var numero7 = numero7 - 9;
          }

          var numero9 = cedula.substring(8, 9);
          var numero9 = numero9 * 2;
          if (numero9 > 9) {
            var numero9 = numero9 - 9;
          }

          var impares = numero1 + numero3 + numero5 + numero7 + numero9;

          //Suma total
          var suma_total = pares + impares;

          //extraemos el primero digito
          var primer_digito_suma = String(suma_total).substring(0, 1);

          //Obtenemos la decena inmediata
          var decena = (parseInt(primer_digito_suma) + 1) * 10;

          //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
          var digito_validador = decena - suma_total;

          //Si el digito validador es = a 10 toma el valor de 0
          if (digito_validador == 10) var digito_validador = 0;

          //Validamos que el digito validador sea igual al de la cedula
          if (digito_validador == ultimo_digito) {
            // document.getElementById("salida").innerHTML = "Cedula Válida";
            return true;
          } else {
            //document.getElementById("salida").innerHTML = "Cedula Inválida";
            return false;
          }
        } else {
          // imprimimos en consola si la region no pertenece
          return false;
        }
      } else {
        return false;
      }
    },

    async calculateAge() {
      var d = document.getElementById("user_date").value;
      var inDate = new Date(d);
      var anio = inDate.getFullYear();
      var fec_actual = new Date();
      var fec_anio = fec_actual.getFullYear();
      var edad = fec_anio - anio;
      if (edad >= 16) {
        this.enviar();
      } else {
        this.$notifier.showMessage({
          content: `Ingrese una edad válida`,
          color: "warning",
        });
      }
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

    // guardarMod() {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.desserts[this.editedIndex], this.editedItem);
    //   } else {
    //     this.desserts.push({
    //       departamentoProducto: this.editedItem.departamentoProducto,
    //       impactoInterno: this.editedItem.impactoInterno,
    //       impactoExterno: this.editedItem.impactoExterno,
    //     });
    //   }
    //   this.close();
    // },
    // async actualizarDat() {
    //   try {
    //     const datos = {
    //       user: this.$cookies.get("dataClient").usuario.nombreUsuario,
    //       departamentoProducto: this.editedItem.departamentoProducto,
    //       impactoInterno: this.editedItem.impactoInterno,
    //       impactoExterno: this.editedItem.impactoExterno,
    //     };

    //     await this.$axios.put(
    //       `api/sgcnegocio/formularioImpactoComparativo/actualizarImpacto/${this.editedItem.id}`,
    //       datos
    //     );
    //     this.guardarMod();
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },

    async obtenerFac() {
      this.listaFacultades.slice();
      try {
        const res = await axios.get("api/facultad", {
          headers: {
            authorization: "SGVUCE " + this.$cookies.get("ROLE_ADMIN"),
          },
        });
        // console.log(res);

        const lis = res.data;

        lis.forEach((facu) => {
          this.listaFacultades.push(`${facu.nombre}`);
        });
        this.prueba = res.data;
      } catch (err) {
        console.log(err);
        if (err.response.status == 403) {
          this.$cookies.remove("ROLE_ADMIN");
          this.$notifier.showMessage({
            content: `Su sesión ha expirado`,
            color: "error",
          });
          this.$router.push("/login");
        }
      }
    },

    async obtenerListaEst() {
      try {
        const res = await axios.get("api/estudiante", {
          headers: {
            authorization: "SGVUCE " + this.$cookies.get("ROLE_ADMIN"),
          },
        });

        this.desserts = res.data;
        // this.ced=this.res.data.cedula;
        const bus = res.data;
        bus.forEach((element) => {
          this.ced.push(`${element.cedula}`);
        });
        console.log(this.ced);
      } catch (err) {
        console.log(err);
        if (err.response.status == 404) {
          this.$notifier.showMessage({
            content: `No hay estudiantes registrados`,
            color: "error",
          });
        } else if (err.response.status == 403) {
          this.$cookies.remove("ROLE_ADMIN");
          this.$notifier.showMessage({
            content: `Su sesión ha expirado`,
            color: "error",
          });
          this.$router.push("/login");
        }
      }
    },

    llenarTabla() {
      this.desserts.push({
        nombres: this.nombres,
        apellidos: this.apellidos,
        cedula: this.cedula,
        correo: this.correo,
        fechaNacimiento: this.fechaNacimiento,
        carrera: this.carrera,
        usuario: this.usuario,
        telefono: this.telefono,
        genero: this.genero,
      });
      this.obtenerListaEst();
    },

    async enviar() {
      if (
        !this.nombres ||
        !this.apellidos ||
        !this.fechaNacimiento ||
        !this.cedula ||
        !this.correo ||
        !this.carrera ||
        !this.semestre ||
        !this.telefono ||
        !this.genero
      ) {
        this.$notifier.showMessage({
          content: "Rellene todos los datos",
          color: "warning",
        });
      } else {
        try {
          const res = await this.$axios.post(
            "api/estudiante",
            {
              nombres: this.nombres.trim(),
              apellidos: this.apellidos.trim(),
              fechaNacimiento: this.fechaNacimiento,
              cedula: this.cedula.trim(),
              correo: this.correo.trim(),
              telefono: this.telefono.trim(),
              genero: this.genero,
              semestre: this.semestre,
              carrera: this.carrera,

              esControlador: this.esControlador,
            },
            {
              headers: {
                authorization: "SGVUCE " + this.$cookies.get("ROLE_ADMIN"),
              },
            },

            (this.nombres = ""),
            (this.apellidos = ""),
            (this.fechaNacimiento = ""),
            (this.cedula = ""),
            (this.correo = ""),
            (this.telefono = ""),
            (this.genero = ""),
            (this.semestre = ""),
            (this.carrera = ""),
            (this.esControlador = false)
          );
          this.llenarTabla(),
            this.$notifier.showMessage({
              content: "Estudiante añadido con éxito",
              color: "success",
            });
        } catch (err) {
          console.log(err);
          if (
            err.response.data.mensaje ==
            "Request processing failed; nested exception is java.lang.ArrayIndexOutOfBoundsException: Index 1 out of bounds for length 1"
          ) {
            this.$notifier.showMessage({
              content: "Debe ingresar dos apellidos",
              color: "warning",
            });
          } else if (err.response.status == 500) {
            this.$notifier.showMessage({
              content: "Cédula o Correo Duplicados",
              color: "warning",
            });
          }
        }
      }
    },
    async campos() {
      let cedula1 = this.$cookies.get("cedula");
      try {
        const res = await this.$axios.get(
          `api/estudiante/buscar/${cedula1}`,

          {
            headers: {
              authorization: "SGVUCE " + this.$cookies.get("ROLE_ADMIN"),
            },
          }
        );

        console.log(res.data);
        if (res.data == true) {
          this.$notifier.showMessage({
            content: "Cédula o Correo Duplicados",
            color: "warning",
          });
        }
      } catch (err) {}
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