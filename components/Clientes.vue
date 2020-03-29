<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :search="search"
    sort-by="nombre"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="gray">
        <v-toolbar-title>CLIENTES</v-toolbar-title>
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

          <!-- <Ficha /> AQUI VA EL DIALOGO PARA MOSTRAR LA INFORMACION DEL CLIENTE -->       

          <v-dialog v-model="dialog" max-width="700px">
            <template v-slot:activator="{ on }">
              <v-btn  dark class="mb-2" v-on="on">Nuevo</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row justify="center">
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field 
                      v-model="editedItem.nombre" 
                      label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field 
                      v-model="editedItem.apellido" 
                      label="Apellido"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field 
                      v-model="editedItem.nit" 
                      label="NIT"                      
                      ></v-text-field>							
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-menu
                        v-model="menu1"
                        :close-on-content-click="false"
                        max-width="290"
                        >
                          <template v-slot:activator="{ on }">
                              <v-text-field
                              :value="computedDateFormattedMomentjs"
                              label="Fecha"
                              readonly
                              v-on="on"
                              @click:clear="editedItem.fechaNacimiento = null"
                              ></v-text-field>
                          </template>
                          <v-date-picker
                              v-model="editedItem.fechaNacimiento"
                              @change="menu1 = false"
                          ></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field 
                      v-model="editedItem.direccion" 
                      label="Dirección"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field 
                      v-model="editedItem.telefono" 
                      label="Teléfono"
                      ></v-text-field>
                    </v-col>
                    <!-- AQUI TODO ESTABA BIEN -->
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>   

      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <router-link to = '/fichas'>
        <v-icon
          small
          class="mr-2"
          @click="goFichas(item)"
        >
          mdi-table-eye
        </v-icon>
      </router-link>
      <v-icon
        small
        @click="goData(item)"
      >
        mdi-file-eye
      </v-icon>      
      <v-icon v-if="padre==='clientes'"
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>
<script>
  import moment from 'moment'
  import Ficha from '../components/Ficha'
  import { mapState, mapMutations, mapActions } from 'vuex'

  export default {    

    components: {
      Ficha,
    },

    data: () => ({                  
      search: '',
      dialog: false,
      menu1: false,
      headers: [
        {
          text: 'Nombre',
          align: 'left',
          value: 'nombre',
        },
        { text: 'Apellido', value: 'apellido' },
        { text: 'NIT', value: 'nit' },
        { text: 'Dirección', value: 'direccion' },
        { text: 'Acciones', value: 'action', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        fechaNacimiento: new Date().toISOString().substr(0, 10),
        nombre: '',
        apellido: '',
        nit: '',
        fechaNacimiento: '',
        direccion: '',
        telefono: '',        
      },
      defaultItem: {
        fechaNacimiento: new Date().toISOString().substr(0, 10),
        nombre: '',
        apellido: '',
        nit: '',        
        direccion: '',
        telefono: '', 
      },
    }),

    watch: {
      dialog (val) {
        val || this.close()
      },
    },


    computed: {
      ...mapState(['clientes']),
      ...mapState(['fichas']),

      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo Cliente' : 'Ver Cliente'
      },  
      padre: {
        get(){
          return this.clientes.padre
        }
      },

      computedDateFormattedMomentjs () {
        console.log(this.editedItem.fechaNacimiento)
          return this.editedItem.fechaNacimiento ? moment(this.editedItem.fechaNacimiento).format('dddd, MMMM Do YYYY') : ''
      },
    },

    created(){
      this.initialize()
    },

    methods: {
      initialize () {
        this.desserts = [
          {
            nombre: 'Frozen Yogurt',
            apellido: 159,
            nit: 6.0,
            direccion: 24,
          },
          {
            nombre: 'Ice cream sandwich',
            apellido: 237,
            nit: 9.0,
            direccion: 37,
          },  
          {
            fechaNacimiento: new Date().toISOString().substr(0, 10),
            nombre: 'Hugo',
            apellido: 'Lucas',
            nit: '2486197-9',            
            direccion: 'Ciudad',
            telefono: '41966767', 
          },   
        ]
        //this.$store.dispatch('recibos/obtenerRecibos')
        /* this.$store.commit('clientes/createDessert', item)        
        return this.clientes.desserts */
      },

      goFichas (item) {
        //llamar a todas las fichas que tenga relacionado este cliente
        var indice = this.desserts.indexOf(item)
        console.log(indice)
        this.$store.commit('fichas/assignIndexCli', indice )
        var itemasignar = item
        console.log('ITEM DESDE CLIENTES '+itemasignar)      
        this.$store.commit('fichas/assignItemCli',  itemasignar )        
      },

      goData(item){                
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Está seguro que desea eliminar este elemento?') && this.desserts.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {        
        var item = this.editedItem
        var index = this.editedIndex        
        if (index > -1) {           
          console.log('entro a condicion antes de clientes/assignDesserts ')
          console.log(item)          
          console.log('editeindex '+index)          
          //this.$store.commit('clientes/assignDesserts', index, {item})
          //console.log('despues del commit de clientes')
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          //this.$store.commit('clientes/addDessert',this.editedItem)
          this.desserts.push(this.editedItem)
        }
        this.close()
       },
    },
  }
</script>