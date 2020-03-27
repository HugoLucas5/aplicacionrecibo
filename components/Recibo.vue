<template>
    <v-card>
        <v-card-title>
            <span class="headline">{{ this.recibo.tituloForm }}</span>
        </v-card-title>

        <v-card-text >
            <v-container >
            <v-row no-gutters>
                <v-col cols="12" md="3">
                <v-img
                    src="op.jpg"
                    aspect-ratio="1"
                    contain
                ></v-img>
                </v-col>

                <v-col cols="12" md="6">  
                <br/>
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
                <template v-for="n in filasrecibo">
                    <v-col 
                    :key="n"
                    :cols="(n%4) === 2 ? 6 : undefined"                   
                    >
                    <v-card
                        class="pa-2"
                        outlined
                        tile
                        style="text-align: center;"
                    >
                    {{ n === 1 ? 'Cant.' :  ''}}
                    {{ n === 2 ? 'Articulo' :  ''}}
                    {{ n === 3 ? 'Código' :  ''}}
                    {{ n === 4 ? 'Precio' :  ''}}
                    <v-text-field
                        v-if="n > 4 && recibo.indexEditado > -1"                                                    
                        dense
                        hide-details
                        disabled
                    ></v-text-field>
                    <v-text-field
                        v-if="n > 4 && recibo.indexEditado === -1"                                                    
                        dense
                        hide-details                                                 
                    ></v-text-field>
                    </v-card>
                    </v-col>
                    <v-responsive
                    v-if="n%4 === 0"
                    :key="`width-${n}`"
                    width="100%"
                    ></v-responsive>
                </template>
                </v-row>
            </v-container>

            <!-- Para abajo de decripcion; seccion lentes -->
            <v-row>
                <v-col cols="12" md="8" sm="12">
                    <v-container class="grey lighten-5">
                        <v-row no-gutters>
                            <template v-for="n in 27">
                            <v-col 
                                :key="n"
                                >
                                <v-card
                                class="pa-2"
                                outlined
                                tile
                                style="text-align: center;"
                                >
                                {{ n === 2 ? 'Esférico.' :  ''}}
                                {{ n === 3 ? 'Cilindro' :  ''}}
                                {{ n === 4 ? 'Eje' :  ''}}
                                {{ n === 5 ? 'DP' :  ''}}
                                {{ n === 6 ? 'OD' :  ''}}
                                {{ n === 11 ? 'OI' :  ''}}
                                {{ n === 16 ? 'ADD OD' :  ''}}
                                {{ n === 21 ? 'ADD OI' :  ''}}
                                {{ n === 26 ? 'Cristales' :  ''}}
                                {{ n === 27 ? 'Montura' :  ''}}
                                <v-text-field
                                v-if="(n === 7 || n === 8 || n === 9 || n === 10 || n === 12
                                || n === 13 || n === 14 || n === 15 || n === 17 || n === 18
                                || n === 19 || n === 20 || n === 22 || n === 23 || n === 24
                                || n === 25 || n === 26 || n === 27 ) && recibo.indexEditado > -1"                                                    
                                dense
                                hide-details
                                disabled                                                            
                                ></v-text-field>
                                <v-text-field
                                v-if="(n === 7 || n === 8 || n === 9 || n === 10 || n === 12
                                || n === 13 || n === 14 || n === 15 || n === 17 || n === 18
                                || n === 19 || n === 20 || n === 22 || n === 23 || n === 24
                                || n === 25 || n === 26 || n === 27 ) && recibo.indexEditado === -1"                                                    
                                dense
                                hide-details
                                v-model="datosTemporales.lentes[n-numero]"                        
                                ></v-text-field>
                                </v-card>
                            </v-col>
                            <v-responsive
                                v-if="(n === 5 || n === 10 || n === 15 || n === 20 || n === 25)"
                                :key="`width-${n}`"
                                width="100%"                             
                            ></v-responsive>
                            </template>
                        </v-row>
                        </v-container>
                </v-col>    

                <!-- seccion dinero -->
                <v-col cols="12" md="4" sm="12">
                <v-container class="grey lighten-5">
                    <v-row no-gutters>
                    <template v-for="n in 8">
                        <v-col :key="n">
                        <v-card
                            outlined
                            tile 
                            style="text-align: center; "                             
                        >                            
                        {{ n === 1 ? 'Total': ''}}
                        {{ n === 3 ? 'Descuento %': ''}}
                        {{ n === 5 ? 'Abono': ''}}
                        {{ n === 7 ? 'Saldo': ''}}
                        <v-text-field
                            v-if="(n%2 === 0)  
                            && recibo.indexEditado > -1"                                                    
                            dense
                            hide-details
                            disabled
                            style="margin: 0; padding: 0"
                        ></v-text-field>
                        <v-text-field
                            v-if="(n%2 === 0)  
                            && recibo.indexEditado === -1"                                                    
                            dense
                            hide-details                              
                            style="margin: 0; padding: 0"
                        ></v-text-field>
                        </v-card>
                        </v-col>

                        <v-responsive
                        v-if="n%2 === 0"
                        :key="`width-${n}`"
                        width="100%"
                        ></v-responsive>
                    </template>
                    <v-text-field
                        hint="Firma del cliente"
                        persistent-hint
                        
                    >
                    </v-text-field>
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
import { mapState, mapMutations } from 'vuex'

export default {        
    data: () => ({
      numero: 6,
      filasrecibo: 8,
      defaultItem: {
        nombre_cliente: '',
        telefono_cliente: '',        
        total: 0,
        descuento: 0,
        abono: 0,
        saldo: 0,
        fecha_entrega: '',
        numero: '',
        fecha: '',
        descripcion: [],
        lentes: [],
        dinero: [],
      },
      datosTemporales: {
        nombre_cliente: '',
        telefono_cliente: '',
        total: 0,
        descuento: 0,
        abono: 0,
        saldo: 0,
        fecha_entrega: '',
        numero: '',
        fecha: '',
        descripcion: [],
        lentes: [],
        dinero: [],
      },
    }),

    computed: {
        ...mapState(['recibo']),
        ...mapState(['recibos']),        

        nombre_cliente: {
            
            get(){
                var indice = this.recibo.indexEditado
                if(indice > -1){
                    return this.recibo.itemEditado.nombre_cliente
                }
                /* if (indice > -1){
                return this.recibo.itemEditado.item.nombre_cliente
                }else{
                return this.recibo.itemEditado.nombre_cliente
                } */                
            }
                            
        },        
        telefono_cliente: {
            get(){                          
              return this.recibo.itemEditado.telefono_cliente
            }
        }, 
        norecibo: {
            get(){
                return this.recibo.itemEditado.numero
            }
        },
        fecharecibo: {
            get(){
                return this.recibo.itemEditado.fecha
            }

        },
    },


    methods: {

      incrementar(){
        this.numero +=1
        console.log(this.numero)        
      },

      agregar(){
          this.filasrecibo += 4
          console.log(this.filasrecibo)
      },
      imprimir(){
        window.print()
      },

    close () {        
    this.$store.commit('recibos/editDialog', false)
    console.log('cerrando el dialogo')
    
    setTimeout(() => {
        var titulo ='Nuevo Recibo'
        this.$store.commit('recibo/assignTitle', titulo)
        var itemasignar = Object.assign({}, this.defaultItem)
        this.$store.commit('recibo/assignItem', { itemasignar })
        var indice = -1
        this.$store.commit('recibo/assignIndex', indice )
        Object.assign(this.datosTemporales, this.defaultItem)     
        }, 300)
    },
    
    save () {
    var item = this.recibo.itemEditado
    if (this.recibo.indexEditado > -1) {          
        this.$store.commit('recibos/assignDesserts', this.recibo.indexEditado, {item })          
    } else {
        this.$store.commit('recibos/addDessert', {item})
    }
    this.close()
    },
    }
}
</script>