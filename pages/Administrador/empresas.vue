<template>
  <v-card>
    <v-responsive :aspect-ratio="16 / 9">
      <h1 style="text-align: center; margin-bottom: 10px">
        Ingreso de nuevas Empresas
      </h1>
      <img
        class="imagen"
        src="/empresa.svg"
        style="width: 250px; text-align: center"
      />
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
                  v-model="nombreempresa"
                  :rules="[() => !!nombreempresa]"
                  type="text"
                  color="primary"
                >
                </v-text-field>
                <v-text-field
                  ref="telefono"
                  label="Teléfono"
                  outlined
                  rounded
                  v-model="telefono"
                  :rules="[rules.tel]"
                  maxlength="10"
                  type="text"
                  color="primary"
                >
                </v-text-field>
              </v-form>
            </v-card-text>

            <v-btn
              id="btn-ingreso"
              color="secondary"
              @click="agregarEmpr"
              :disabled="!form"
            >
              Agregar Empresa
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <v-layout align-start>
        <v-flex>
          <!-- Tabla con la lista de Empresas -->
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
                    <v-card-title> </v-card-title>

                    <v-card-text>
                      <form ref="valid">
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                v-model="editedItem.nombreempresa"
                                label="Empresa"
                                :rules="[() => !!editedItem.nombreempresa]"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="6" md="6">
                              <v-text-field
                                v-model="editedItem.telefono"
                                label="Teléfono"
                                :rules="[rules.tel]"
                                maxlength="10"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </form>
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

                <v-dialog v-model="dialogDelete" max-width="800px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >¿Está seguro que desea cambiar el estado de la
                      empresa?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Cancelar</v-btn
                      >
                      <v-btn color="blue darken-1" text @click="estadoEmpresa"
                        >OK</v-btn
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
                mdi-update
              </v-icon>
            </template>
            <template v-slot:[`item.estado`]="{ item }">
              <v-chip :color="getColor(item.estado)" dark>
                {{ item.estado }}
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
      nombreempresa: "",
      telefono: "",
      estado: true,
      listaFacultades: [],
      dialog: false,
      dialogDelete: false,
      editedItem: {
        nombreempresa: "",
        telefono: "",
      },
      defaultItem: {
        nombreempresa: "",
        telefono: "",
      },
      editedIndex: -1,

      rules: {
        required: (value) => !!value || "Campo Requerido.",

        count: (value) => value.length >= 10 || "Se requiere 10 dígitos",

        tel: (value) => {
          const pattern = /^([0])+(9)+([0-9])*$/;
          return pattern.test(value) || "No es un número telefónico válido";
        },
      },
      headers: [
        {
          text: "Empresa",
          value: "nombreempresa",
        },
        {
          text: "Teléfono",
          value: "telefono",
        },
        {
          text: "Estado",
          value: "estado",
        },

        { value: "actions", sortable: false },
      ],
      search: "",
      desserts: [],
    };
  },
  mounted() {
    this.obtenerListaEmpr();
  },

  methods: {
    limpiar() {
      (this.nombreempresa = ""), (this.telefono = ""), this.$refs.form.reset();
      this.obtenerListaEmpr();
    },
    getColor(value) {
      if (value === "Activo") return "green";
      else if (value === "Inactivo") return "red";
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
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);

      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    guardarMod() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push({
          nombreempresa: this.editedItem.nombreempresa,
          telefono: this.editedItem.telefono,
        });
      }
      this.close();
    },
    llenarTabla() {
      this.desserts.push({
        nombreempresa: this.nombreempresa,
        telefono: this.telefono,
        estado: this.estado,
      });
    },
    async obtenerListaEmpr() {
      let listaEmpresas
      try {
        const res = await this.$axios.get(
          "https://mineriaproyecto.herokuapp.com/mineria/empresa",
          {       
        headers:{
          Authorization: "Kinesia" + this.$cookies.get("ROLE_ADMIN")
        }
        });
         
console.log(res.data)
        const lis = res.data;

        lis.forEach((element) => {
          if (element.estado == true) {
            element.estado = "Activo";
          } else {
            element.estado = "Inactivo";
          }
          this.desserts = res.data;
        });
      } catch (err) {
        this.$notifier.showMessage({
          content: `No se ha ingresado empresas`,
          color: "error",
        });
      }
    },
    async agregarEmpr() {
      if (!this.nombreempresa || !this.telefono) {
        this.$notifier.showMessage({
          content: "Rellene todos los datos",
          color: "error",
        });
      } else {
        try {
          await this.$axios.post("/api/empresaIS", {
            nombreempresa: this.nombreempresa,
            telefono: this.telefono,
            estado: true,
          });

          this.llenarTabla();
          this.limpiar();
          this.$notifier.showMessage({
            content: "Empresa añadida",
            color: "success",
          });
        } catch (err) {
          this.$notifier.showMessage({
            content: `No se pudo añadir la empresa`,
            color: "error",
          });
        }
      }
    },

    async actualizarDat() {
      try {
        const datos = {
          nombreempresa: this.editedItem.nombreempresa,
          telefono: this.editedItem.telefono,
        };

        await this.$axios.put(`api/empresaUP/${this.editedItem.id}`, datos);
        this.guardarMod();
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

    async estadoEmpresa() {
      try {
        const datos = {
          id: this.editedItem.id,
          nombreempresa: this.editedItem.nombreempresa,
          telefono: this.editedItem.telefono,
          estado: false,
        };
        const resp = await this.$axios.put(
          `api/empresaEs/${this.editedItem.id}`
        );
        this.deleteItemConfirm();
        this.obtenerListaEmpr();
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