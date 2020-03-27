<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :search="search"
    sort-by="nombre_cliente"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="gray">
        <v-toolbar-title>RECIBOS</v-toolbar-title>
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
            <v-btn color="blue" dark class="mb-2" v-on="on" @click="flag">Nuevo</v-btn>
          </template> 

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
    filasrecibo: 8,
    search: '',
    headers: [
      {
        text: 'Nombre del Cliente',
        align: 'left',
        value: 'nombre_cliente',
      },
      { text: 'Teléfono', value: 'telefono_cliente' },
      { text: 'Saldo', value: 'saldo' },
      { text: 'Fecha de Entrega', value: 'fecha_entrega' },
      { text: 'Acciones', value: 'action', sortable: false },
    ],
    //desserts: [],
    editedIndex: -1,
    editedItem: {
      nombre_cliente: '',
      telefono_cliente: '',
      saldo: 0,
      fecha_entrega: '',
    },
    defaultItem: {
      nombre_cliente: '',
      telefono_cliente: '',
      saldo: 0,
      fecha_entrega: '',
    },
  }),

  computed: {
    ...mapState(['recibo']),
    ...mapState(['recibos']),

    formTitle () {
      return this.recibo.indexEditado === -1 ? 'Nuevo Recibo' : 'Ver Recibo'
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
        var item = [{
            nombre_cliente: 'hugo',
            telefono_cliente: '41966767',
            saldo: 6.0,
            fecha_entrega: '24/08/2020',
            numero: '500',
            fecha: '15/15/2020',
          },
          {
            nombre_cliente: 'juan',
            telefono_cliente: '77672118',
            saldo: 6.0,
            fecha_entrega: '12/12/2020',
            numero: '200',
            fecha: '15/15/2020',
          }]; 
       //this.$store.dispatch('recibos/obtenerRecibos')
       this.$store.commit('recibos/createDessert', item)
      return this.recibos.desserts
      /*//-----> AQUI DEBERIA IR UNA ACCION
      QUE VA A HACER LA LLAMADA A LA API PARA
      OBTENER LOS RECIBOS

       /* this.desserts = [
        {
          nombre_cliente: 'Frozen Yogurt',
          telefono_cliente: 159,
          saldo: 6.0,
          fecha_entrega: 24,
        },
        {
          nombre_cliente: 'Ice cream sandwich',
          telefono_cliente: 237,
          saldo: 9.0,
          fecha_entrega: 37,
        },          
      ]  */
    }, 

    editItem (item) {      
      var indice = this.desserts.indexOf(item)
      console.log(indice)
      this.$store.commit('recibo/assignIndex', indice )
      var itemasignar = item
      console.log('ITEM DESDE RECIBOS '+itemasignar)      
      this.$store.commit('recibo/assignItem', { itemasignar })
      var titulo = this.formTitle
      this.$store.commit('recibo/assignTitle', titulo)
      this.$store.commit('recibos/editDialog', true)
    },

    deleteItem (item) {
      const index = this.desserts.indexOf(item)        
      confirm('Está seguro que desea eliminar este elemento?') && this.$store.commit('recibos/spliceItem',index)
    },       

    close () {          
    this.$store.commit('recibos/editDialog', false)
    var item = this.defaultItem
    
    setTimeout(() => {
        var itemasignar = Object.assign({}, item)
        this.$store.commit('recibo/assignItem', { itemasignar })
        var indice = -1
        this.$store.commit('recibo/assignIndex', indice )
        var titulo = this.formTitle
        this.$store.commit('recibo/assignTitle', titulo)
      }, 300)//cuando cierre, setear datosTemporales de recibo, a defaultItem
    },

    flag(){
      this.$store.commit('recibos/editDialog',true)
    },             
  },
}
</script>