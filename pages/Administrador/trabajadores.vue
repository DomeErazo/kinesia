<template>
  <v-card>
    <v-responsive :aspect-ratio="16 / 9">
      <img class="imagen" src="/trabajadores.svg" style="width:250px"/>
      <div class="container">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="15" md="8">
            <v-autocomplete
              :items="listaEmpresas"
              label="Empresas"
              outlined
              v-model="facul"
              rounded
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="15" md="8" v-if="facul">
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
                <h1 style="margin-bottom: 15px">Creación de usuario</h1>

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
                  type="password"
                  color="primary"
                ></v-text-field>
              </v-form>
            </v-card-text>

            <v-btn
              id="btn-ingreso"
              color="secondary"
              :disabled="!valid"
              type="button"
              @click="enviar"
            >
              Agregar
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <v-layout align-start>
        <v-flex>
          <!-- Tabla en la que listo los trabajadores -->
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
                <!-- //DIALOGO DE EDITAR Trabajadores -->
                <v-dialog v-model="dialog" max-width="500px">
                  <v-card>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="editedItem.nombre"
                              label="nombre"
                              :rules="[
                                () =>
                                  !!editedItem.nombre || 'Campo obligatorio',
                              ]"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="editedItem.apellido"
                              label="apellido"
                              :rules="[
                                () =>
                                  !!editedItem.apellido || 'Campo obligatorio',
                              ]"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="editedItem.telefono"
                              label="Teléfono"
                              :rules="[
                                rules.tel,
                                rules.counter,
                                rules.required,
                              ]"
                              counter
                              maxlength="10"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="editedItem.cedula"
                              :rules="[
                                rules.ced,
                                rules.counter,
                                rules.required,
                                rules.ced,
                              ]"
                              counter
                              maxlength="10"
                              color="primary"
                              label="Cédula"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-select
                              :items="generos"
                              label="Género"
                              v-model="editedItem.genero"
                              :rules="[
                                () =>
                                  !!editedItem.genero || 'Campo obligatorio',
                              ]"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="editedItem.correo"
                              label="Correo electrónico"
                              :rules="[rules.email, rules.required]"
                            ></v-text-field>
                          </v-col>
                          
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Cancelar
                      </v-btn>

                      <v-btn color="blue darken-1" text @click="actualizarDat">
                        Editar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="650px">
                  <v-card>
                    <v-card-title class="text-h7"
                      >¿Está seguro que desea cambiar el estado del
                      trabajador?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Cancelar</v-btn
                      >
                      <v-btn color="blue darken-1" text @click="estadoAdminE"
                        >Aceptar</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-update </v-icon>
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
  layout: "admin",

  data() {
    return {
      valid: true,
      facul: "",
      id: "",

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
      listaEmpresas: [],
      contrasena: "",
      idEmpresas: [],
      // listaUnida:[],
      correo: "",
      ced: [],
      usuario: "",
      telefono: "",

      genero: "",

      esControlador: false,

      prueba: [],
      dialog: false,
      dialogDelete: false,

      headers: [
        {
          text: "nombre",
          value: "nombre",
        },
        {
          text: "apellido",
          value: "apellido",
        },
        {
          text: "Cédula",
          value: "cedula",
          sortable: true,
        },

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
        {
          text: "Empresa",
          value: "empresa.nombreempresa",
        },

        {
          text: "Usuario",
          value: "usuario.usuario",
        },
        {
          text: "Estado",
          value: "usuario.estado",
        },

        { value: "actions", sortable: false },
      ],
      search: "",
      desserts: [],
      editedIndex: -1,
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
    this.obtenerAdminE();
    this.obtenerListaEmpr();
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
    limpiar() {
      (this.nombre = ""),
        (this.apellido = ""),
        (this.cedula = ""),
        (this.telefono = ""),
        (this.genero = ""),
        (this.correo = ""),
        (this.usuario = ""),
        (this.contrasena = ""),
        (this.facul = ""),
        this.$refs.form.reset();
      this.obtenerListaEmpr();
    },

    getColor(value) {
      if (value === "Activo") return "green";
      else if (value === "Inactivo") return "red";
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
    async obtenerAdminE() {
      try {
        const res = await axios.get("/api/personaRol/adminE");

        const lis = res.data;
   
        lis.forEach((facu) => {
          if (facu.usuario.estado == true) {
            facu.usuario.estado = "Activo";
          } else {
            facu.usuario.estado = "Inactivo";
          }
          this.desserts = res.data;
        });

        this.desserts = res.data;
      } catch (err) {}
    },
    async obtenerListaEmpr() {
      try {
        const res = await this.$axios.get("/api/empresa");

        const lis = res.data;
       

        lis.forEach((element) => {
          if(element.estado==true){
 this.listaEmpresas.push(`${element.nombreempresa}`);
          }
         
        
        });
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
    },

    async enviar() {
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
          const res = await this.$axios.post(`api/inPerNam/${this.facul}`, {
            nombre: this.nombre,
            apellido: this.apellido,
            genero: this.genero,
            correo: this.correo,
            telefono: this.telefono,

            rol: "adminE",
            cedula: this.cedula,

            usuario: {
              usuario: this.usuario,
              contrasena: this.contrasena,
              estado: true,
              rolIdrol: {
                id: "2",
                rol: "adminE",
              },
            },
          });
          this.obtenerAdminE();
          this.llenarTabla(),
            this.limpiar(),
            (this.id = ""),
            this.$notifier.showMessage({
              content: "Trabajador añadido con éxito",
              color: "success",
            });
        } catch (err) {
          this.$notifier.showMessage({
              content: "Asegúrese que el usuario y la cédula sean únicos",
              color: "error",
            });
        }
      }
    },
    async actualizarDat() {
      try {
        const datos = {
          nombre: this.editedItem.nombre,
          apellido: this.editedItem.apellido,
          telefono: this.editedItem.telefono,
          rol: "adminE",
          cedula: this.editedItem.cedula,
          genero: this.editedItem.genero,
          correo: this.editedItem.correo,
        };

        await this.$axios.put(`api/updatePersona/${this.editedItem.id}`, datos);

        // this.guardarMod();
        this.obtenerAdminE();
        this.close();
        this.$notifier.showMessage({
          content: "Se editó con éxito",
          color: "success",
        });
      } catch (err) {
        this.$notifier.showMessage({
          content: "Error al editar",
          color: "error",
        });
        this.close();
      }
    },
    async estadoAdminE() {
      try {
        const resp = await this.$axios.put(
          `api/desactivarUsuario/${this.editedItem.usuario.id}`
        );
        this.deleteItemConfirm();
        this.obtenerAdminE();
        this.$notifier.showMessage({
          content: `Estado actualizado`,
          color: "success",
        });
      } catch (err) {
        this.$notifier.showMessage({
          content: `Error al actualizar estado`,
          color: "error",
        });
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