<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ this.recibo.tituloForm }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" md="3">
            <v-img src="op.jpg" aspect-ratio="1" contain></v-img>
          </v-col>

          <v-col cols="12" md="6">
            <br />
            <v-row no-gutters>
              <v-col cols="12" md="11">
                <!-- llamar a itemEditado para v-model -->
                <v-text-field
                  v-if="recibo.indexEditado > -1"
                  v-model="nombre_cliente"
                  label="Cliente:"
                  dense
                  disabled
                ></v-text-field>
                <v-text-field
                  v-if="recibo.indexEditado === -1"
                  v-model="datosTemporales.nombre_cliente"
                  label="Cliente:"
                  dense
                ></v-text-field>
                <v-text-field
                  v-if="recibo.indexEditado > -1"
                  v-model="telefono_cliente"
                  label="Teléfono:"
                  hide-details
                  style="margin-top: 0; padding-top: 0;"
                  dense
                  disabled
                ></v-text-field>
                <v-text-field
                  v-if="recibo.indexEditado === -1"
                  v-model="datosTemporales.telefono_cliente"
                  label="Teléfono:"
                  hide-details
                  style="margin-top: 0; padding-top: 0;"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="3" style="padding-top: 4%">
            <v-row no-gutters>
              <v-col cols="12" md="12" sm="6">
                <v-text-field
                  v-if="recibo.indexEditado > -1"
                  v-model="norecibo"
                  label="Recibo No. "
                  outlined
                  placeholder="xxx"
                  dense
                  prefix="N°."
                  disabled
                ></v-text-field>
                <v-text-field
                  v-if="recibo.indexEditado === -1"
                  v-model="datosTemporales.norecibo"
                  label="Recibo No. "
                  outlined
                  placeholder="xxx"
                  dense
                  prefix="N°."
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="12" sm="6">
                <v-text-field
                  v-if="recibo.indexEditado > -1"
                  v-model="fecharecibo"
                  label="Fecha"
                  outlined
                  placeholder="xx/xx/xxxx"
                  dense
                  disabled
                ></v-text-field>
                <v-text-field
                  v-if="recibo.indexEditado === -1"
                  v-model="datosTemporales.fecharecibo"
                  label="Fecha"
                  outlined
                  placeholder="xx/xx/xxxx"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <!-- seccion descripcion -->

        <v-row justify="center">
          <v-col cols="12" md="11" sm="11">
            <v-row justify="center">
              <h3>Descripción</h3>
            </v-row>
          </v-col>
          <v-col cols="12" md="1" sm="1" v-if="recibo.indexEditado === -1">
            <v-row justify="center">
              <v-btn class="mx-5" fab dark small color="indigo" @click="agregar()">
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </v-row>
          </v-col>
        </v-row>

        <v-container class="grey lighten-5">
          <v-row no-gutters>
            <v-col
              v-for="(el, key) in descriptionTest"
              :key="`header-${key}`"
              :cols="key === 'article' ? 6 : undefined"
            >
              <v-card class="pa-2" outlined tile style="text-align: center;">{{ el.label }}</v-card>
            </v-col>
            <v-responsive width="100%"></v-responsive>

            <v-col
              v-for="(el, key) in descriptionTest"
              :key="key"
              :cols="key === 'article' ? 6 : undefined"
            >
              <v-card class="pa-2" outlined tile style="text-align: center;">
                <v-text-field v-model="el.value" dense hide-details style="text-align: center;">></v-text-field>
              </v-card>
            </v-col>
            <v-responsive width="100%"></v-responsive>
          </v-row>
        </v-container>

        <!-- Para abajo de decripcion; seccion lentes -->
        <v-row>
          <v-col cols="12" md="8" sm="12">
            <v-container class="grey lighten-5">
              <v-row no-gutters>

                <v-container style="width: 20%; height: 0"></v-container>

                <template v-for="(el, key) in lentesTest">
                <v-col :key="`Header-${key}`" v-if="key!=='cristales' &&  key!=='montura'">
                  <v-card class="pa-2" outlined tile style="text-align: center;">{{ el.label }}</v-card>
                </v-col>
                </template>
                <v-responsive width="100%"></v-responsive>

                <v-card class="pa-2" outlined tile style="width: 20%; text-align: center; ">OD</v-card>
                <template v-for="(el, key) in lentesTest">
                  <v-col :key="`RowOD-${key}`" v-if="key!=='cristales' &&  key!=='montura'">
                    <v-card class="pa-2" outlined tile style="text-align: center;">
                      <v-text-field v-model="el.od" dense hide-details></v-text-field>
                    </v-card>
                  </v-col>
                </template>
                <v-responsive width="100%"></v-responsive>

                <v-card class="pa-2" outlined tile style="width: 20%; text-align: center; ">OI</v-card>
                <template v-for="(el, key) in lentesTest">
                  <v-col :key="`RowOI-${key}`" v-if="key!=='cristales' &&  key!=='montura'">
                    <v-card class="pa-2" outlined tile style="text-align: center;">
                      <v-text-field v-model="el.oi" dense hide-details></v-text-field>
                    </v-card>
                  </v-col>
                </template>
                <v-responsive width="100%"></v-responsive>

                <v-card class="pa-2" outlined tile style="width: 20%; text-align: center; ">ADD OD</v-card>
                <template v-for="(el, key) in lentesTest">
                  <v-col :key="`RowADDOD-${key}`" v-if="key!=='cristales' &&  key!=='montura'">
                    <v-card class="pa-2" outlined tile style="text-align: center;">
                      <v-text-field v-model="el.addod" dense hide-details></v-text-field>
                    </v-card>
                  </v-col>
                </template>
                <v-responsive width="100%"></v-responsive>

                <v-card class="pa-2" outlined tile style="width: 20%; text-align: center; ">ADD OI</v-card>
                <template v-for="(el, key) in lentesTest">
                  <v-col :key="`RowADDOI-${key}`" v-if="key!=='cristales' &&  key!=='montura'">
                    <v-card class="pa-2" outlined tile style="text-align: center;">
                      <v-text-field v-model="el.addoi" dense hide-details></v-text-field>
                    </v-card>
                  </v-col>
                </template>
                <v-responsive width="100%"></v-responsive>

                <v-col>
                  <v-card class="pa-2" outlined tile style="text-align: center;">
                    Cristales
                    <v-text-field v-model="lentesTest.cristales" dense hide-details></v-text-field>
                  </v-card>
                </v-col>
                <v-col>
                  <v-card class="pa-2" outlined tile style="text-align: center;">
                    Montura
                    <v-text-field v-model="lentesTest.montura" dense hide-details></v-text-field>
                  </v-card>
                </v-col>

              </v-row>
            </v-container>
          </v-col>

          <!-- seccion dinero -->
          <v-col cols="12" md="4" sm="12">
            <v-container class="grey lighten-5">
              <v-row no-gutters>
                
                <template v-for="(el, key) in dineroTest">                  
                  <v-col :key="`label-${key}`" cols="12" md="6">                  
                    <v-card class="pa-2" outlined tile style="text-align: center;">{{el.label}}</v-card>                                     
                  </v-col>  
                  <v-col :key="`valor-${key}`" cols="12" md="6">
                    <v-card class="pa-2" outlined tile style="text-align: center;">                      
                      <v-text-field v-model="el.value" dense hide-details style="margin: 0; padding: 0"></v-text-field>
                    </v-card>    
                  </v-col>                             
                </template>                   

                <v-text-field hint="Firma del cliente" persistent-hint></v-text-field>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
      <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
      <v-btn color="blue darken-1" text @click="imprimir">Imprimir</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import moment from 'moment'

export default {
  data: () => ({
    descriptionTest: {
      quantity: {
        label: "Cant.",
        value: null
      },
      article: {
        label: "Artículo",
        value: null
      },
      code: {
        label: "Código.",
        value: null
      },
      price: {
        label: "Precio",
        value: null
      }
    },

    lentesTest: {
      esferico: {
        label: "Esférico",
        od: null,
        oi: null,
        addod: null,
        addoi: null
      },
      cilindro: {
        label: "Cilindro",
        od: null,
        oi: null,
        addod: null,
        addoi: null
      },
      eje: {
        label: "Eje",
        od: null,
        oi: null,
        addod: null,
        addoi: null
      },
      dp: {
        label: "DP",
        od: null,
        oi: null,
        addod: null,
        addoi: null
      },
      cristales: '',
      montura: '',
    },

    dineroTest: {
      total: {
        label: 'Total',
        value: null
      },
      descuento: {
        label: 'Descuento %',
        value: null
      },
      abono: {
        label: 'Abono',
        value: null
      },
      saldo: {
        label: 'Saldo',
        value: null
      }
    },

    numero: 6,
    filasrecibo: 8,
    defaultItem: {
      nombre_cliente: "",
      telefono_cliente: "",
      total: 0,
      descuento: 0,
      abono: 0,
      saldo: 0,
      fecha_entrega: "",
      numero: "",
      fecha: "",
      descripcion: [],
      lentes: [],
      dinero: []
    },
    datosTemporales: {
      nombre_cliente: "",
      telefono_cliente: "",
      total: 0,
      descuento: 0,
      abono: 0,
      saldo: 0,
      fecha_entrega: "",
      numero: "",
      fecha: "",
      descripcion: [],
      lentes: [],
      dinero: []
    }
  }),

  watch: {
    dialog(val) {
      val || this.close();
    },
    lentesTest: {
      deep: true,
      handler() {
        console.log(this.lentesTest.eje.od);
      }
    }
  },

  computed: {
    ...mapState(["recibo"]),
    ...mapState(["recibos"]),

    nombre_cliente: {
      get() {
        var indice = this.recibo.indexEditado;
        if (indice > -1) {
          return this.recibo.itemEditado.nombre_cliente;
        }
        /* if (indice > -1){
                return this.recibo.itemEditado.item.nombre_cliente
                }else{
                return this.recibo.itemEditado.nombre_cliente
                } */
      }
    },
    telefono_cliente: {
      get() {
        return this.recibo.itemEditado.telefono_cliente;
      }
    },
    norecibo: {
      get() {
        return this.recibo.itemEditado.numero;
      }
    },
    fecharecibo: {
      get() {
        return this.recibo.itemEditado.fecha;
      }
    }
  },

  methods: {
    incrementar() {
      this.numero += 1;
      console.log(this.numero);
    },

    agregar() {
      this.filasrecibo += 4;
      console.log(this.filasrecibo);
    },
    imprimir() {
      window.print();
    },

    close() {
      this.$store.commit("recibos/editDialog", false);
      console.log("cerrando el dialogo");

      setTimeout(() => {
        var titulo = "Nuevo Recibo";
        this.$store.commit("recibo/assignTitle", titulo);
        var itemasignar = Object.assign({}, this.defaultItem);
        this.$store.commit("recibo/assignItem", { itemasignar });
        var indice = -1;
        this.$store.commit("recibo/assignIndex", indice);
        Object.assign(this.datosTemporales, this.defaultItem);
      }, 300);
    },

    save() {
      var item = this.recibo.itemEditado;
      if (this.recibo.indexEditado > -1) {
        this.$store.commit("recibos/assignDesserts", this.recibo.indexEditado, {item});
      } else {
        this.$store.commit("recibos/addDessert", { item });
      }
      this.close();
    }
  }
};
</script>