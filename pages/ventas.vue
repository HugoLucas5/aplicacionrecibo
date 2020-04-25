<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :search="search"
    sort-by="fecha" 
    sort-desc
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="gray">
        <v-toolbar-title>VENTAS</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
        v-model="search"
        label="Buscar"
        single-line
        hide-details
        clearable
        ></v-text-field>
        <v-spacer></v-spacer>
         <v-dialog v-model="dialog" max-width="1000px">
          <template v-slot:activator="{ on }">
            <v-btn color="blue" dark class="mb-2" v-on="on" @click="flag">Nueva Venta</v-btn>
          </template> 

          <Recibo> </Recibo>
         <!--  :titulo="formTitle" :item="editedItem" :index="editedIndex" -->

        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <router-link to="/recibos">
        <v-icon
          small
          class="mr-2"       
          @click="pushVenta(item)"   
        >
          mdi-eye
        </v-icon>
      </router-link>
      
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>
<script>
import Recibo from '../components/Recibo'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  components:{
    Recibo,
  },

  data: () => ({
    search: '',
    headers: [
      {text: 'Venta No.',value: 'id', sortable: false},
      {text: 'Fecha', value: 'fecha', sortable: false},
      {text: 'Nombre del Cliente', value: 'cliente.nombre', sortable: false},
      {text: 'Apellido del cliente', value: 'cliente.apellido', sortable: false},
      { text: 'Total', value: 'total',sortable: false },
      { text: 'Saldada', value: 'cancelada', sortable: false },
      { text: 'Cant. Recibos', value: 'recibos_venta.length', sortable: false },
      { text: 'Responsable', value: 'responsable.username', sortable: false },
      { text: 'Acciones', value: 'action', sortable: false },
    ],    
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
      descriptionTest: {
        quantity: {
          label: "Cant.",
          value: []
        },
        article: {
          label: "Artículo",
          value: []
        },
        code: {
          label: "Código.",
          value: []
        },
        price: {
          label: "Precio",
          value: []
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
        },
        pago:{
          tipo: '',
          cantidad: null
        }
      },
    },
  }),

  computed: {
    ...mapState(['recibo']),
    ...mapState(['ventas']),

    
    dialog: {
      get(){
          return this.ventas.dialog
      },
      set(){
        this.$store.commit('ventas/editDialog', false)
      },
    },
    desserts: {
      get(){
        console.log("imprimiendo desserts desde el get desserts "+this.ventas.desserts)
        return this.ventas.desserts
      }
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    }, 
  },

  created () {
    this.initialize()
  }, 

  methods: {    
     initialize () {
        var item = [
          {
            id:1,
            fecha: "2020-04-15",
            cancelada: false,
            subtotal: "630.00",
            total: "600.00",
            descuento: "5.00",
            comision: "5.00",
            sucursal: {
              id: 1,
              nombre: "Quetzaltenango"
            },
            cliente: {
              id: 2,
              nombre: "Juan",
              apellido: "Monroy",
              telefono: "41966767",
              direccion: "Ciudad"
            },
            responsable: {
              username: "administrator",
              nombres: "Administrador",
              apellidos: "Administrador"
            },
            recibos_venta: [
              {
                id: 1,
                fecha: "2020-04-10",
                abono: "200.00",
                saldo_actual: "400.00",
                pagos: [
                  {
                    tipo_pago: {
                      id: 1,
                      nombre: "Efectivo"
                    },
                    cantidad: "66.66"
                  },
                  {
                    tipo_pago: {
                      id: 2,
                      nombre: "Cheque"
                    },
                    cantidad: "66.66"
                  },
                  {
                    tipo_pago: {
                      id: 3,
                      nombre: "VisaCuotas"
                    },
                    cantidad: "66.67"
                  }
                ],
                recibo_siguiente: 2
              }             
            ],
            detalle_accesorio: [
              {
                accesorio: {
                  id: 3,
                  nombre: "Estuche GUESS",
                  codigo: "456ZXY",
                  categoria: {
                    id: 7,
                    nombre: "Estuches"
                  },
                  color: "",
                  otro: "",
                  marca: {
                    id: 10,
                    nombre: "Super Q"
                  }
                },
                precio_compra: "100.00",
                precio_venta: "50.00",
                cantidad: "2.00"
              },
              {
                accesorio: {
                  id: 4,
                  nombre: "Correas para lentes",
                  codigo: "789QWE",
                  categoria: {
                    id: 4,
                    nombre: "Correas"
                  },
                  color: "Azul",
                  otro: "Esta mamalon",
                  marca: {
                    id: 8,
                    nombre: "Zeiss"
                  }
                },
                precio_compra: "200.00",
                precio_venta: "80.00",
                cantidad: "1.00"
              }
            ],
            detalle_aro: [],
            detalle_lente: []
          },     
          //--------------------------//       
          {
            id: 2,
            fecha: "2020-04-10",
            cancelada: true,
            subtotal: "630.00",
            total: "600.00",
            descuento: "5.00",
            comision: "5.00",
            sucursal: {
              id: 1,
              nombre: "Quetzaltenango"
            },
            cliente: {
              id: 1,
              nombre: "Hugo",
              apellido: "Perez",
              telefono: "4571644"
            },
            responsable: {
              username: "administrator",
              nombres: "Administrador",
              apellidos: "Administrador"
            },
            recibos_venta: [
              {
                id: 1,
                fecha: "2020-04-10",
                abono: "200.00",
                saldo_actual: "400.00",
                pagos: [
                  {
                    tipo_pago: {
                      id: 1,
                      nombre: "Efectivo"
                    },
                    cantidad: "66.66"
                  },
                  {
                    tipo_pago: {
                      id: 2,
                      nombre: "Cheque"
                    },
                    cantidad: "66.66"
                  },
                  {
                    tipo_pago: {
                      id: 3,
                      nombre: "VisaCuotas"
                    },
                    cantidad: "66.67"
                  }
                ],
                recibo_siguiente: 2
              },
              {
                id: 2,
                fecha: "2020-04-10",
                abono: "150.00",
                saldo_actual: "250.00",
                pagos: [
                  {
                    tipo_pago: {
                      id: 1,
                      nombre: "Efectivo"
                    },
                    cantidad: "50.00"
                  },
                  {
                    tipo_pago: {
                      id: 2,
                      nombre: "Cheque"
                    },
                    cantidad: "50.00"
                  },
                  {
                    tipo_pago: {
                      id: 3,
                      nombre: "VisaCuotas"
                    },
                    cantidad: "50.00"
                  }
                ],
                recibo_siguiente: 3
              },
              {
                id: 3,
                fecha: "2020-04-10",
                abono: "250.00",
                saldo_actual: "0.00",
                pagos: [
                  {
                    tipo_pago: {
                      id: 1,
                      nombre: "Efectivo"
                    },
                    cantidad: "83.33"
                  },
                  {
                    tipo_pago: {
                      id: 2,
                      nombre: "Cheque"
                    },
                    cantidad: "83.33"
                  },
                  {
                    tipo_pago: {
                      id: 3,
                      nombre: "VisaCuotas"
                    },
                    cantidad: "83.34"
                  }
                ],
                recibo_siguiente: null
              }
            ],
            detalle_accesorio: [
              {
                accesorio: {
                  id: 1,
                  nombre: "Limpia Lentes X",
                  codigo: "ABCD1234",
                  categoria: {
                    id: 5,
                    nombre: "Limpia Vidrios Foto Gray"
                  },
                  color: "",
                  otro: "",
                  marca: {
                    id: 10,
                    nombre: "Super Q"
                  }
                },
                precio_compra: "50.00",
                precio_venta: "40.00",
                cantidad: "1.00"
              },
              {
                accesorio: {
                  id: 2,
                  nombre: "Paños limpia lentes",
                  codigo: "1234ABCD",
                  categoria: {
                    id: 2,
                    nombre: "Paños"
                  },
                  color: "Verde",
                  otro: "",
                  marca: {
                    id: 6,
                    nombre: "Zeiss"
                  }
                },
                precio_compra: "150.00",
                precio_venta: "70.00",
                cantidad: "1.00"
              }
            ],
            detalle_aro: [
              {
                aro: {
                  id: 1,
                  codigo: "1234ABCD",
                  color: "Violeta",
                  otro: "",
                  marca: {
                    id: 4,
                    nombre: "Nike"
                  }
                },
                precio_compra: "50.00",
                precio_venta: "40.00",
                cantidad: "1.00"
              },
              {
                aro: {
                  id: 2,
                  codigo: "ABCD1234",
                  color: "Cian",
                  otro: "",
                  marca: {
                    id: 1,
                    nombre: "Gucci"
                  }
                },
                precio_compra: "90.00",
                precio_venta: "45.00",
                cantidad: "1.00"
              }
            ],
            detalle_lente: [
              {
                lente: {
                  id: 1,
                  esferico: "10.0 0.0 0.0 0.0",
                  cilindro: "2.2 2.21 67.2 21.02",
                  eje: "1.0 2.5 3.1 4.0",
                  dp: "42.20 11.2 11.0 88.2",
                  observaciones: "",
                  evaluador: "Hugo Tzul",
                  precio: "250.20",
                  costo: "127.00",
                  montura: {
                    id: 1,
                    codigo: "1234ABCD",
                    color: "Violeta",
                    otro: "",
                    ancho: "2.30",
                    largo_pata: "4.20",
                    dp: "1.00",
                    material: {
                      id: 1,
                      nombre: "Plastico"
                    },
                    marca: {
                      id: 4,
                      nombre: "Nike"
                    },
                    precio: "13.50",
                    costo: "4.00"
                  },
                  lente_base: {
                    id: 1,
                    tipo: {
                      id: 1,
                      nombre: "Progresivo"
                    },
                    tratamiento: {
                      id: 1,
                      nombre: "BlueGray"
                    },
                    material: {
                      id: 1,
                      nombre: "Policarbonato"
                    },
                    otro: ""
                  },
                  cliente: {
                    id: 1,
                    nombre: "Hugo",
                    apellido: "Perez",
                    telefono: "4571644"
                  }
                },
                precio_compra: "90.00",
                precio_venta: "70.00",
                cantidad: "1.00"
              }
            ]
          }        
          ]; 
       //this.$store.dispatch('recibos/obtenerRecibos')
       this.$store.commit('ventas/createDessert', item)
      return this.ventas.desserts
      /*//-----> AQUI DEBERIA IR UNA ACCION
      QUE VA A HACER LA LLAMADA A LA API PARA
      OBTENER LOS RECIBOS */
       
    }, 

    pushVenta(item){
      delete item.recibos_venta
      console.log('ventas: ', item)
      var itemasignar = item
      this.$store.commit('recibo/assignItem',{itemasignar})    
    },

    deleteItem (item) {
      const index = this.desserts.indexOf(item)       
      confirm('Está seguro que desea eliminar este elemento?') && this.$store.commit('ventas/spliceItem',index)
    },       

    close () {          
    this.$store.commit('ventas/editDialog', false)
    console.log('cierrte desde ventas')
    
    setTimeout(() => {        
        var indice = -1
        this.$store.commit('recibo/assignIndex', indice )
        var titulo = "Nuevo Recibo"
        this.$store.commit('recibo/assignTitle', titulo)
        var itemasignar = {}
        this.$store.commit('recibo/assignItem', {itemasignar})
      }, 300)//cuando cierre, setear datosTemporales de recibo, a defaultItem
    },

    flag(){
      this.$store.commit('ventas/editDialog',true)
    },             
  },
}
</script>