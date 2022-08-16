<template>
  <v-card>
    <v-responsive :aspect-ratio="16 / 9">
      <h1 style="text-align: center; margin-bottom: 10px">
        Ingreso de nuevas Empresas
      </h1>
      <img class="imagen" src="/empresa.svg" />
      <div class="container">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="15" md="8">
            <v-card-text class="elevation-12" id="card-in">
              <v-form ref="form" v-model="form">
                <p>Ingrese los datos de la empresa:</p>
                <v-text-field
                  ref="empresa"
                  label="Nombre de la Empresa"
                  outlined
                  rounded
                  v-model="nombre"
                  :rules="[() => !!nombre || 'Campo obligatorio']"
                  type="text"
                  color="primary"
                >
                </v-text-field>
                <v-text-field
                  ref="telefono"
                  label="Teléfono"
                  outlined
                  rounded
                  v-model="carreras"
                  :rules="[rules.tel, rules.counter]"
                  
                  type="text"
                  color="primary"
                >
                </v-text-field>
              </v-form>
            </v-card-text>

            <v-btn id="btn-ingreso" color="secondary" @click="agregarCarr">
              Agregar Empresa
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
                <v-toolbar-title>Lista de Empresas</v-toolbar-title>
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
  layout: "admin",
  data() {
    return {
      ok: false,
      nombre: "",
      carreras: [],

      listaFacultades: [],
      dialog: false,
      dialogDelete: false,

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
      headers: [
        {
          text: "Empresa",
          value: "nombre",
        },
        {
          text: "Teléfono",
          value: "telefono",
        },
              {
          text: "Estado",
          value: "estado",
        },

        { text: "Acciones", value: "actions", sortable: false },
      ],
      search: "",
      desserts: [],
      editedIndex: -1,
    
    };
  },
  mounted() {
    this.obtenerListaFac();
  },

  methods: {
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
    async obtenerListaFac() {
      try {
        const res = await axios.get("api/facultad", {
          headers: {
            authorization: "SGVUCE " + this.$cookies.get("ROLE_ADMIN"),
          },
        });
        const lis = res.data;
        this.desserts = res.data;

        lis.forEach((nombre) => {
          this.listaFacultades.push(`${nombre.nombre}`);
        });
      } catch (err) {
        console.log(err);
        if (err.response.status == 404) {
          this.$notifier.showMessage({
            content: `No se ha ingresado facultades`,
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

    // async eliminarDat() {
    //   try {
    //     const datos = {
    //       user: this.$cookies.get("dataClient").usuario.nombreUsuario,
    //       departamentoProducto: this.editedItem.departamentoProducto,
    //       impactoInterno: this.editedItem.impactoInterno,
    //       impactoExterno: this.editedItem.impactoExterno,
    //     };
    //     const resp = await this.$axios.delete(
    //       `api/sgcnegocio/formularioImpactoComparativo/eliminarImpacto/${this.editedItem.id}`,
    //       datos
    //     );
    //     this.deleteItemConfirm();
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    llenarTabla() {
      this.desserts.push({
        nombre: this.nombre,
        carreras: this.carreras,
       
      });
    },
   
    async agregarFac() {
      if (!this.nombref) {
        this.$notifier.showMessage({
          content: "Rellene todos los datos",
          color: "error",
        });
      } else {
        try {
          
          
          console.log(this.carreras.type);
          await this.$axios.post(
            "api/facultad",
            {
              nombre: this.nombref.trim(),
              // carreras: this.carreras,
            },

            {
              headers: {
                authorization: "SGVUCE " + this.$cookies.get("ROLE_ADMIN"),
              },
            }
          );

          this.nombref = " ";

          this.obtenerListaFac();
          this.llenarTabla();
          this.$notifier.showMessage({
            content: "Facultad añadida",
            color: "success",
          });
        
        } catch (err) {
          console.log(err);
          if (err.response.status == 500) {
            this.$notifier.showMessage({
              content: `La facultad ${this.nombref} ya existe`,
              color: "error",
            });
          }
        }
      }
    },
    async agregarCarr() {
      if (!this.nombre || !this.carreras) {
        this.$notifier.showMessage({
          content: "Rellene todos los datos",
          color: "error",
        });
      } else {
        try {
          await this.$axios.put(
            `api/facultad/${this.nombre}/${this.carreras}`,
            {
              nombre: this.nombre,
              carreras: this.carreras.trim(),
            },

            {
              headers: {
                authorization: "SGVUCE " + this.$cookies.get("ROLE_ADMIN"),
              },
            }
          );

          this.obtenerListaFac();
          this.carreras.trim(),
            (this.nombre = " "),
            (this.carreras = " "),
            this.$notifier.showMessage({
              content: "Carrera añadida",
              color: "success",
            });
        } catch (err) {
          if (err.response.status == 400) {
            this.$notifier.showMessage({
              content: `La carrera ${this.carreras} ya existe`,
              color: "error",
            });
          }
        }
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