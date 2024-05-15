<template>
  <v-card>
    <v-responsive :aspect-ratio="16 / 9">
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
                <v-toolbar-title>Lista de Postulantes</v-toolbar-title>
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
                              v-model="editedItem.personaIdoersona.nombre"
                              label="nombre"
                              :rules="[
                                () =>
                                  !!editedItem.personaIdoersona.nombre || 'Campo obligatorio',
                              ]"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="editedItem.personaIdoersona.apellido"
                              label="apellido"
                              :rules="[
                                () =>
                                  !!editedItem.personaIdoersona.apellido || 'Campo obligatorio',
                              ]"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="editedItem.personaIdoersona.telefono"
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
                              v-model="editedItem.personaIdoersona.cedula"
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
                              v-model="editedItem.personaIdoersona.genero"
                              :rules="[
                                () =>
                                  !!editedItem.personaIdoersona.genero || 'Campo obligatorio',
                              ]"
                            ></v-select>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="editedItem.personaIdoersona.correo"
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
                    <v-card-title class="text-h7"></v-card-title>

                    <v-card-text>
                      <v-row>
                        <v-icon
                          color="blue darken-1"
                          text
                          @click="closeDelete"
                          style="margin-left: 95%; margin-bottom: 15px"
                          >mdi-close</v-icon
                        >
                      </v-row>
                      <v-row>
                        <v-col cols="10" style="margin-top: -25px">
                          <v-text-field
                            v-model="
                              editedItem.personaIdoersona.empresa.nombreempresa
                            "
                            disabled
                          />
                        </v-col>
                        <v-col cols="2" style="margin-top: -25px">
                          <img src="/userHombre.png" id="img1" width="70px" />
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="5">
                          <v-text-field
                            v-model="editedItem.personaIdoersona.nombre"
                            disabled
                          >
                          </v-text-field>
                          <v-text-field
                            v-model="editedItem.personaIdoersona.genero"
                            disabled
                          >
                          </v-text-field>
                        </v-col>
                        <v-col>
                          <v-text-field
                            v-model="editedItem.fechaEntrevista"
                            disabled
                          >
                          </v-text-field>
                          <v-text-field
                            v-model="editedItem.nombreEntrevistador"
                            disabled
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn color="primary" @click="resultadosPDF" style="">
                        <v-icon right dark> mdi-download </v-icon> Descargar
                        Reporte</v-btn
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
              <v-icon small class="mr-2" @click="deleteItem(item)">
                mdi-download
              </v-icon>
            </template>
            <template v-slot:[`item.entrevista`]>
              <a href="/Entrevista/Entrevista"> entrevistar</a>
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
      rules: {
        required: (value) => !!value || "Campo Requerido.",

        // counter: (value) => value.length == 10 || "Se requiere 10 dígitos",
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
          text: "Nombres",
          value: "personaIdoersona.nombre",
        },
        {
          text: "Apellidos",
          value: "personaIdoersona.apellido",
        },
        {
          text: "Cédula",
          value: "personaIdoersona.cedula",
          sortable: true,
        },

        {
          text: "Género",
          value: "personaIdoersona.genero",
        },
        {
          text: "Correo",
          value: "personaIdoersona.correo",
        },
        {
          text: "Teléfono",
          value: "personaIdoersona.telefono",
        },

 
        { value: "actions", sortable: false },
      ],
      search: "",
      cedula: "",
      nombre: "",
      apellido: "",
      correo: "",
      usuario: "",
      telefono: "",
      genero: "",

      dialog: false,
      dialogDelete: false,
      dialogResult: false,
      desserts: [],
      editedIndex: -1,
      generos: ["Masculino", "Femenino"],
      cedula1: "",
      estado: true,
      idEmpresa: "",
      contrasena: "",
      editedItem: {
        nombre: "",
        apellido: "",
        telefono: "",
        cedula: "",
        genero: "",
        correo: "",
        personaIdoersona: {
          empresa: {
            nombreempresa: "",
          },
        },
      },
      defaultItem: {
        nombre: "",
        apellido: "",
        telefono: "",
        cedula: "",
        genero: "",
        correo: "",
        personaIdoersona: {
          empresa: {
            nombreempresa: "",
          },
        },
      },
    };
  },
  mounted() {
    
    this.obtenerPost();
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
    cambiar() {
      if (this.editedItem.personaIdoersona.genero == "Femenino") {
        setTimeout(() => {
          let img = document.getElementById("img1");
       
          img.src = "/userMujer.png";
        }, 1);
      } else {
        setTimeout(() => {
          let img = document.getElementById("img1");
      
          img.src = "/userHombre.png";
        }, 1);
      }
    },
    iniciarEntrevista() {
      window.location.href = "/Entrevista/Entrevista";
    },
    async obtenerPost() {
      
      let Npsic = this.$cookies.get("dataClient").nombre;
      let Apsic = this.$cookies.get("dataClient").apellido;
      //FALTA CAPTURAR EL NOMBRE DEL PSICOLOGO

      try {
        const res = await axios.get(`/api/mineria/entrevistaLi/${Npsic + " "+Apsic}
        `);
        const lis = res.data;
      

        this.desserts = res.data;

        this.desserts = res.data;
      } catch (err) {
       
      }
    },
    limpiar() {
      (this.nombre = ""),
        (this.apellido = ""),
        (this.cedula = ""),
        (this.telefono = ""),
        (this.genero = ""),
        (this.correo = ""),
        (this.usuario = ""),
        (this.contrasena = ""),
        this.$refs.form.reset();
      this.obtenerPsic();
    },
    async actualizarDat() {
      try {
        const datos = {
          // 
          nombre: this.editedItem.personaIdoersona.nombre,
          apellido: this.editedItem.personaIdoersona.apellido,
          telefono: this.editedItem.personaIdoersona.telefono,
          rol: "post",
          cedula: this.editedItem.personaIdoersona.cedula,
          genero: this.editedItem.personaIdoersona.genero,
          correo: this.editedItem.personaIdoersona.correo,
        };

        await this.$axios.put(`api/updatePersona/${this.editedItem.personaIdoersona.id}`, datos);

        this.obtenerPost();
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
    async resulta() {
      this.dialogResult = true;
    },
    async resultadosPDF() {
      let idEnt = this.$cookies.get("dataClient").nombre;
      try {
        
        const resp = await axios.get(`/api/informe/print/${this.editedItem.id}`);
        window.open(`/api/informe/print/${this.editedItem.id}`);
        
        this.close();

        this.closeDelete();
      } catch (err) {
      
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
      this.cambiar();
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
  },
};
</script>
<style >
.theme--light.v-input--is-disabled input,
.theme--light.v-input--is-disabled textarea {
  color: black;
}
</style>