<template>
  <v-card>
    <v-responsive :aspect-ratio="16 / 9">
      <h1 style="text-align: center; margin-bottom: 10px">
        Ingreso de nuevo personal
      </h1>
      <img class="imagen" src="/trabajadores.svg" />
      <div class="container">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="15" md="8">
            <v-card-text class="elevation-12" id="card-in">
              <v-form ref="form" v-model="form">
                <p>Por favor ingrese los datos del nuevo trabajador:</p>
                <v-text-field
                  ref="nombre"
                  label="Nombres"
                  outlined
                  rounded
                  v-model="nombre"
                  type="text"
                  color="primary"
                >
                </v-text-field>
                <v-text-field
                  ref="apellido"
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
                
                <v-text-field
                  ref="usuario"
                  label="Usuario"
                  outlined
                  rounded
                  v-model="usuario"
                  type="text"
                                  color="primary"
                >
                </v-text-field>
                       <v-text-field
                  ref="contrasena"
                  label="Contraseña"
                  outlined
                  rounded
                  v-model="contrasena"
                  type="text"
                  color="primary"
                ></v-text-field>
              </v-form>
            </v-card-text>

            <v-btn id="btn-ingreso" color="secondary" @click="agregarPsic">
              Agregar Trabajador
            </v-btn>
          </v-col>
        </v-row>
        <!-- <v-row> -->
        <!-- <v-col cols="12">
            <v-chip class="ma-2" color="#6398E4" outlined>
              <v-icon left> mdi-office-building </v-icon>
              Si no encuentra la facultad requerida, ingrese una nueva
              <v-switch
                style="margin-left: 6px; padding-bottom: 15px"
                v-model="ok"
                color="#CCD5E2"
                value="secondary"
                hide-details
              ></v-switch>
            </v-chip>
          </v-col> -->
        <!-- </v-row> -->
        <!-- <v-row align="center" justify="center">
          <v-col cols="12" sm="15" md="8">
            <v-card-text
              class="elevation-12"
              id="card-in"
              :single-expand="singleExpand"
              v-if="ok"
            >
              <v-form ref="form" v-model="form">
                <p>Ingrese una facultad:</p>
                <v-text-field
                  ref="facultad"
                  label="Facultad"
                  outlined
                  rounded
                  v-model="nombref"
                  :rules="[() => !!nombref || 'Campo obligatorio']"
                  type="text"
                  color="primary"
                >
                </v-text-field>
              </v-form>
              <v-btn id="btn-ingreso" color="secondary" @click="agregarFac">
                Agregar
              </v-btn>
            </v-card-text>
          </v-col>
        </v-row> -->
      </div>

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
                <v-toolbar-title>Lista de Trabajadores</v-toolbar-title>
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
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:[`item.usuario.estado`]="{ item }">
              <v-chip :color="getColor(item.usuario.estado)" dark>
                {{ item.usuario.estado }}
              </v-chip>
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
  layout: "adminEmpr",

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
      nombre: "",
      apellido: "",
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
          value: "nombre",
        },
        {
          text: "Apellidos",
          value: "apellido",
        },
        {
          text: "Cédula",
          value: "cedula",
          sortable: true,
        },
        // {
        //   text: "Fecha de Nacimiento",
        //   value: "fechaNacimiento",
        // },
        {
          text: "Género",
          value: "genero",
        },
        {
          text: "Correo",
          value: "correo",
        },
        {
          text: "Teléfono",
          value: "telefono",
        },
        // {
        //   text: "Carrera",
        //   value: "carrera",
        // },

        {
          text: "Usuario",
          value: "usuario.usuario",
        },
        {
          text: "Estado",
          value: "usuario.estado",
        },
        { text: "Acciones", value: "actions", sortable: false },
      ],
      search: "",
      desserts: [],
      editedIndex: -1,
      cedula1: "",
      estado: true,
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
    // this.obtenerListaEst();
    // this.obtenerFac();
    this.obtenerPsic();
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
  },

  methods: {
    getColor(value) {
      if (value === "Activo") return "green";
      else if (value === "Inactivo") return "red";
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
    async obtenerPsic() {
      try {
        const res = await axios.get("/api/personaRlEm/psico/74");

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
        this.obtenerUsuario();

        //  this.llenarTabla();
      } catch (err) {
        console.log(err);
      }
    },
 

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
        nombre: this.nombre,
        apellido: this.apellido,
        cedula: this.cedula,
        correo: this.correo,
       
        usuario: this.usuario,
        telefono: this.telefono,
        genero: this.genero,
      });
      this.obtenerListaEst();
    },

    async agregarPsic() {
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
      } else {
        try {
          const res = await this.$axios.post(
            "api/inseruser",
            {
              nombre: this.nombre.trim(),
                apellido: this.apellido.trim(),
                telefono: this.telefono.trim(),
                rol: "psico",
                cedula: this.cedula.trim(),
                genero:this.generos,
                correo:this.correo,
usuario:{
              usuario: this.usuario,
              contrasena: this.contrasena,
              estado: true,
             },
         
            },
           

            (this.nombre = ""),
            (this.apellido = ""),
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