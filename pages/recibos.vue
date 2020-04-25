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
        <v-toolbar-title>RECIBOS, VENTA A: {{ cliente }}</v-toolbar-title>
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

          <Recibo> </Recibo>
         <!--  :titulo="formTitle" :item="editedItem" :index="editedIndex" -->

        </v-dialog>   
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-eye
      </v-icon>
      
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
      {text: 'No.',value: 'id', sortable: false},
      {text: 'Fecha', value: 'fecha', sortable: false},
      {text: 'Abono', value: 'abono', sortable: false},
      {text: 'Saldo', value: 'saldo_actual', sortable: false},      
      { text: 'Acciones', value: 'action', sortable: false },
    ],    
    copiaVenta: {},    
  }),

  computed: {
    ...mapState(['recibo']),
    ...mapState(['recibos']),
    

    cliente:{
      get(){
        const cli = this.copiaVenta.cliente.nombre + ' ' +this.copiaVenta.cliente.apellido
        return cli
      }
    },
    dialog: {
      get(){
          return this.recibos.dialog
      },
      set(){
        this.$store.commit('recibos/editDialog', false)
      },
    },
    desserts: {
      get(){
        console.log("imprimiendo desserts desde el get desserts "+this.recibos.desserts)
        return this.recibos.desserts
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
                id: 1,
                fecha: "2020-04-10",
                abono: "200.00",
                saldo_actual: "400.00",
                habilitado: true,
                fecha_entrega: "2020-04-30",
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
                habilitado: true,
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
                habilitado: true,
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
            ]; 
       //this.$store.dispatch('recibos/obtenerRecibos')
       this.$store.commit('recibos/createDessert', item)
       this.copiaVenta = {...this.recibo.itemEditado}
       this.$store.commit('recibo/assignItem', {})
       console.log('copia venta: ',this.copiaVenta)
       console.log('item editado',this.recibo.itemEditado)
      return this.recibos.desserts
      /*//-----> AQUI DEBERIA IR UNA ACCION
      QUE VA A HACER LA LLAMADA A LA API PARA
      OBTENER LOS RECIBOS */
       
    }, 

    editItem (item) {      
      var indice = this.desserts.indexOf(item)
      console.log(indice)
      this.$store.commit('recibo/assignIndex', indice )
      var objrecibosaux = item
      this.copiaVenta.recibo = item
      var itemasignar = Object.assign({}, {...this.copiaVenta})      
      console.log('ITEM DESDE RECIBOS, itemasignar ',itemasignar)      
      this.$store.commit('recibo/assignItem', { itemasignar })
      var titulo = "Ver Recibo"
      this.$store.commit('recibo/assignTitle', titulo)
      this.$store.commit('recibos/editDialog', true)
    },

    deleteItem (item) {
      const index = this.desserts.indexOf(item)        
      confirm('Está seguro que desea eliminar este elemento?') && this.$store.commit('recibos/spliceItem',index)
    },       

    close () {          
    this.$store.commit('recibos/editDialog', false)
    console.log('cierrte desde recibos')
    
    setTimeout(() => {
        var itemasignar = {}
        this.$store.commit('recibo/assignItem', {itemasignar})
        var indice = -1
        this.$store.commit('recibo/assignIndex', indice )
        var titulo = "Ver Recibo"
        this.$store.commit('recibo/assignTitle', titulo)
      }, 300)//cuando cierre, setear datosTemporales de recibo, a defaultItem
    },

    flag(){
      this.$store.commit('recibos/editDialog',true)
    },             
  },
}
</script>