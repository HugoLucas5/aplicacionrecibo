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
                <v-text-field
                  v-if="recibo.indexEditado > -1"
                  v-model="nombreCliente"
                  label="Nombre del cliente:"
                  dense
                  disabled
                ></v-text-field>
                <v-autocomplete
                  v-if="recibo.indexEditado === -1 && !this.recibo.itemEditado.cliente"
                  v-model="ventaTemporal.cliente.nombre_cliente"
                  :items="nombres_clientes"                  
                  label="Nombre del cliente:"           
                  placeholder="Escriba..."
                  dense
                  hide-no-data                  
                  clearable
                  required                  
                ></v-autocomplete> 
                <v-text-field
                  v-if="recibo.indexEditado === -1 && this.recibo.itemEditado.cliente"
                  v-model="ventaTemporal.cliente.nombre_cliente"
                  label="Nombre del cliente:"
                  dense
                  disabled
                ></v-text-field>
                <v-text-field
                  v-if="recibo.indexEditado > -1"
                  v-model="telefonoCliente"
                  label="Teléfono:"
                  style="margin-top: 0; padding-top: 0;"                  
                  disabled
                  dense
                ></v-text-field>
                <v-text-field
                  v-if="recibo.indexEditado === -1"
                  v-model="ventaTemporal.cliente.telefono_cliente"
                  label="Teléfono:"  
                  dense                
                ></v-text-field>
                <v-text-field
                  v-if="recibo.indexEditado > -1"
                  v-model="direccionCliente"
                  label="Dirección:"
                  style="margin-top: 0; padding-top: 0;"                  
                  disabled
                  dense
                ></v-text-field>
                <v-text-field
                  v-if="recibo.indexEditado === -1"
                  v-model="ventaTemporal.cliente.direccion_cliente"
                  label="Dirección:"
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
                  v-model="noRecibo"
                  label="Recibo No. "
                  outlined
                  placeholder="xxx"
                  dense
                  prefix="N°."
                  disabled
                ></v-text-field>
                <v-text-field
                  v-if="recibo.indexEditado === -1"
                  v-model="ventaTemporal.reciboTemporal.numero"
                  label="Recibo No. "
                  outlined
                  placeholder="xxx"
                  dense
                  prefix="N°."
                ></v-text-field>
              </v-col>                           
              <v-col cols="12" md="12" sm="6" v-if="recibo.indexEditado === -1">
                  <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  max-width="290"
                  >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                        :value="computedDateFormattedMomentjsdtfecha"
                        label="Fecha"
                        outlined
                        placeholder="xx/xx/xxxx"
                        readonly
                        v-on="on"
                        @click:clear="ventaTemporal.reciboTemporal.fecha = null"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="ventaTemporal.reciboTemporal.fecha"
                        @change="menu1 = false"
                    ></v-date-picker>
                  </v-menu>
              </v-col>
              <v-col v-if="recibo.indexEditado > -1" cols="12" md="12" sm="6">  
                <v-text-field                    
                  v-model="fechaRecibo"
                  label="Fecha"
                  outlined
                  disabled                                        
                  dense
                ></v-text-field>
            </v-col>
            </v-row>
          </v-col>
        </v-row>

        <!-- seccion descripcion -->

        <v-row justify="center">
          <v-col cols="12" md="10" sm="11">
            <v-row justify="center">
              <h3>Descripción</h3>
            </v-row>
          </v-col>          
          <v-col cols="12" md="1" sm="1" v-if="recibo.indexEditado === -1 && ventaTemporal.detalle_accesorio.length > 1">
            <v-row justify="center">
              <v-btn class="mx-5" fab dark x-small color="#b50721" @click="quitarFilaAccesorio()">
                <v-icon dark>mdi-close-thick</v-icon>
              </v-btn>              
            </v-row>
          </v-col>
          <v-col cols="12" md="1" sm="1" v-if="recibo.indexEditado === -1">
            <v-row justify="center" v-if="!solorecibo">
              <v-btn class="mx-5" fab dark x-small color="indigo" @click="nuevaFilaAccesorio()">
                <v-icon dark>mdi-plus-thick</v-icon>
              </v-btn>              
            </v-row>
          </v-col>      
        </v-row>
        
        <v-container class="grey lighten-5" >
          <v-row no-gutters>
            <v-col
              v-for="(el, llave1) in defaultItem.descriptionTest"
              :key="`header-${llave1}`"
              :cols="llave1 === 'article' ? 6 : undefined"
            >
              <v-card class="pa-2" outlined tile style="text-align: center;">{{ el.label }}</v-card>
            </v-col>
            <v-responsive width="100%"></v-responsive>

            <template v-if="recibo.indexEditado === -1 && !seccionDescripcion">
              <template v-for="(item, indice) in ventaTemporal.detalle_accesorio">
                <v-col
                  v-for="(el, llave, index) in item"
                  :key="llave+indice+index"
                  :cols="llave === 'nombre' ? 6 : undefined || llave === 'costo' ? 7 : undefined"
                >                  

                    <v-card :key="`tarjeta-${llave+index}`" v-if="llave !== 'nombre' && llave !== 'codigo' && llave !== 'costo'" class="pa-2" outlined tile style="text-align: center;">
                      <v-text-field v-model="el.value" dense hide-details style="text-align: center;"></v-text-field>      
                    </v-card>
                    
                    <v-card :key="`articulo-${llave+index}`" v-if="llave === 'nombre' && !seccionDescripcion" class="pa-2" outlined tile style="text-align: center;">
                      <v-autocomplete                    
                        v-model="el.value"
                        :items="articulos"                                                                     
                        dense
                        clearable
                        hide-details
                      ></v-autocomplete>
                    </v-card>  

                    <v-card :key="`codigo-${llave+index}`" v-if="llave === 'codigo' && !seccionDescripcion" class="pa-2" outlined tile style="text-align: center;">
                      <v-autocomplete                    
                        v-model="el.value"
                        :items="codigos"                                                                     
                        dense
                        clearable
                        hide-details
                      ></v-autocomplete>
                    </v-card>                                                                                 
                </v-col>                                                         
                <v-responsive :key="indice" width="100%"></v-responsive>
              </template>
            </template>            

            <template v-if="recibo.indexEditado > -1 || (recibo.indexEditado === -1 && seccionDescripcion)">
              <template v-for="(item, key) in seccionDescripcion">
                <v-col cols="12" md="2" :key="`cantidad-${key}`">  
                  <v-card class="pa-2" outlined tile style="text-align: center;">               
                    <v-text-field v-model="seccionDescripcion[key].cantidad" dense hide-details disabled></v-text-field>
                  </v-card>
                </v-col>
                <v-col cols="12" md="6" :key="`articulo-${key}`">  
                  <v-card class="pa-2" outlined tile style="text-align: center;">               
                    <v-text-field v-model="seccionDescripcion[key].accesorio.nombre" dense hide-details disabled></v-text-field>
                  </v-card>
                </v-col> 
                <v-col cols="12" md="2" :key="`codigo-${key}`">
                  <v-card class="pa-2" outlined tile style="text-align: center;">
                    <v-text-field v-model="seccionDescripcion[key].accesorio.codigo" dense hide-details disabled></v-text-field>
                  </v-card>
                </v-col>
                <v-col cols="12" md="2" :key="`precio-${key}`">
                  <v-card class="pa-2" outlined tile style="text-align: center;">
                    <v-text-field v-model="seccionDescripcion[key].precio_venta" dense hide-details disabled></v-text-field>
                  </v-card>
                </v-col>
                <v-responsive :key="`responsive-${key}`" width="100%"></v-responsive>  
              </template>                                     
            </template>

          </v-row>          
        </v-container>
        

        <!-- Para abajo de decripcion; seccion lentes -->
        <v-row>
          <v-col cols="12" md="8" sm="12">
            <v-container class="grey lighten-5">
              <v-row no-gutters>

                <v-container style="width: 20%; height: 0"></v-container>

                <template v-for="(el, key) in defaultItem.lentesTest">
                  <v-col :key="`Header-${key}`" v-if="key!=='cristales' &&  key!=='montura' && key!=='precio'">
                    <v-card class="pa-2" outlined tile style="text-align: center;">{{ el.label }}</v-card>
                  </v-col>
                </template>
                <v-responsive width="100%"></v-responsive>

                <v-card class="pa-2" outlined tile style="width: 20%; text-align: center; ">OD</v-card>
                <template v-if="recibo.indexEditado === -1 ">
                  <template v-for="(el, key) in ventaTemporal.detalle_lente">
                    <v-col :key="`RowOD-${key}`" v-if="key!=='cristales' &&  key!=='montura' && key!=='precio'">
                      <v-card class="pa-2" outlined tile style="text-align: center;">
                        <v-text-field v-model="el.od" dense hide-details></v-text-field>
                      </v-card>
                    </v-col>
                  </template>                
                  <v-responsive width="100%"></v-responsive>
                </template>

                <template v-if="recibo.indexEditado > -1">
                  <template v-for="(el, key) in seccionLentes">
                    <v-col :key="`RowOD-${key}`" v-if="key!=='cristales' &&  key!=='montura' && key!=='precio'">
                      <v-card class="pa-2" outlined tile style="text-align: center;">
                        <v-text-field v-model="el.od" dense disabled hide-details></v-text-field>                      
                      </v-card>
                    </v-col>
                  </template>                
                  <v-responsive width="100%"></v-responsive>
                </template>

                <v-card class="pa-2" outlined tile style="width: 20%; text-align: center; ">OI</v-card>
                <template v-if="recibo.indexEditado === -1">
                  <template v-for="(el, key) in ventaTemporal.detalle_lente">
                    <v-col :key="`RowOI-${key}`" v-if="key!=='cristales' &&  key!=='montura' && key!=='precio'">
                      <v-card class="pa-2" outlined tile style="text-align: center;">
                        <v-text-field v-model="el.oi" dense hide-details></v-text-field>                        
                      </v-card>
                    </v-col>
                  </template>
                  <v-responsive width="100%"></v-responsive>
                </template>

                <template v-if="recibo.indexEditado > -1">
                  <template v-for="(el, key) in seccionLentes">
                    <v-col :key="`RowOI-${key}`" v-if="key!=='cristales' &&  key!=='montura' && key!=='precio'">
                      <v-card class="pa-2" outlined tile style="text-align: center;">
                        <v-text-field v-model="el.oi" dense hide-details disabled></v-text-field>                        
                      </v-card>
                    </v-col>
                  </template>
                  <v-responsive width="100%"></v-responsive>
                </template>

                <v-card class="pa-2" outlined tile style="width: 20%; text-align: center; ">ADD OD</v-card>
                <template v-if="recibo.indexEditado === -1">
                  <template v-for="(el, key) in ventaTemporal.detalle_lente">
                    <v-col :key="`RowADDOD-${key}`" v-if="key!=='cristales' &&  key!=='montura' && key!=='precio'">
                      <v-card class="pa-2" outlined tile style="text-align: center;">
                        <v-text-field v-model="el.addod" dense hide-details></v-text-field>                        
                      </v-card>
                    </v-col>
                  </template>
                  <v-responsive width="100%"></v-responsive>
                </template>

                <template v-if="recibo.indexEditado > -1">
                  <template v-for="(el, key) in seccionLentes">
                    <v-col :key="`RowADDOD-${key}`" v-if="key!=='cristales' &&  key!=='montura' && key!=='precio'">
                      <v-card class="pa-2" outlined tile style="text-align: center;">
                        <v-text-field v-model="el.addod" dense hide-details disabled></v-text-field>                        
                      </v-card>
                    </v-col>
                  </template>
                  <v-responsive width="100%"></v-responsive>
                </template>

                <v-card class="pa-2" outlined tile style="width: 20%; text-align: center; ">ADD OI</v-card>
                <template v-if="recibo.indexEditado === -1">
                  <template v-for="(el, key) in ventaTemporal.detalle_lente">
                    <v-col :key="`RowADDOI-${key}`" v-if="key!=='cristales' &&  key!=='montura' && key!=='precio'">
                      <v-card class="pa-2" outlined tile style="text-align: center;">
                        <v-text-field v-model="el.addoi" dense hide-details></v-text-field>                                           
                      </v-card>
                    </v-col>
                  </template>
                  <v-responsive width="100%"></v-responsive>
                </template>

                <template v-if="recibo.indexEditado > -1">
                  <template v-for="(el, key) in seccionLentes">
                    <v-col :key="`RowADDOI-${key}`" v-if="key!=='cristales' &&  key!=='montura' && key!=='precio'">
                      <v-card class="pa-2" outlined tile style="text-align: center;">
                        <v-text-field v-model="el.addoi" disabled dense hide-details></v-text-field>                        
                      </v-card>
                    </v-col>
                  </template>
                  <v-responsive width="100%"></v-responsive>
                </template>

                <v-col cols="12" md="6">
                  <v-card class="pa-2" outlined tile style="text-align: center;">
                    Cristales                    
                    <v-text-field v-model="ventaTemporal.detalle_lente.cristales" dense hide-details v-if="recibo.indexEditado === -1"></v-text-field>
                    <v-text-field v-model="seccionLentes.cristales" dense hide-details disabled v-if="recibo.indexEditado > -1"></v-text-field>                    
                  </v-card>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card class="pa-2" outlined tile style="text-align: center;">
                    Montura                    
                    <v-text-field v-model="ventaTemporal.detalle_lente.montura" dense hide-details v-if="recibo.indexEditado === -1"></v-text-field>
                    <v-text-field v-model="seccionLentes.montura" dense hide-details disabled v-if="recibo.indexEditado > -1"></v-text-field>                    
                  </v-card>
                </v-col>
                <v-col cols="12" md="12">                                
                  <v-text-field v-model="ventaTemporal.detalle_lente.precio" hide-details  label="Precio" prefix="Q" v-if="recibo.indexEditado === -1"></v-text-field>
                  <v-text-field v-model="seccionLentes.precio" dense hide-details disabled label="Precio" prefix="Q" v-if="recibo.indexEditado > -1"></v-text-field>              
                </v-col>

              </v-row>
            </v-container>
          </v-col>

          <!-- seccion dinero -->
          <v-col cols="12" md="4" sm="12">
            <v-container class="grey lighten-5">
              <v-row no-gutters>


                <template v-if="recibo.indexEditado === -1">      
                                               
                    <v-col cols="12" md="6">                  
                      <v-card class="pa-2" outlined tile style="text-align: center;">Subtotal</v-card>                                     
                    </v-col>                                      
                    <v-col cols="12" md="6">
                      <v-card class="pa-2" outlined tile style="text-align: center;">                      
                        <v-text-field v-model="ventaTemporal.subtotal" dense hide-details style="margin: 0; padding: 0"></v-text-field>                       
                      </v-card>    
                    </v-col> 
                    <v-col cols="12" md="6">                  
                      <v-card class="pa-2" outlined tile style="text-align: center;">Descuento %</v-card>                                     
                    </v-col>                                      
                    <v-col cols="12" md="6">
                      <v-card class="pa-2" outlined tile style="text-align: center;">                      
                        <v-text-field v-model="ventaTemporal.descuento" dense hide-details style="margin: 0; padding: 0"></v-text-field>                       
                      </v-card>    
                    </v-col> 
                    <v-col cols="12" md="6">                  
                      <v-card class="pa-2" outlined tile style="text-align: center;">Total</v-card>                                     
                    </v-col>                                      
                    <v-col cols="12" md="6">
                      <v-card class="pa-2" outlined tile style="text-align: center;">            
                        <v-text-field v-model="ventaTemporal.total" dense hide-details style="margin: 0; padding: 0"></v-text-field>                       
                      </v-card>    
                    </v-col>
                    <v-col cols="12" md="6">                  
                      <v-card class="pa-2" outlined tile style="text-align: center;">Abono</v-card>                                     
                    </v-col>                                      
                    <v-col cols="12" md="6">
                      <v-card class="pa-2" outlined tile style="text-align: center;">                      
                        <v-text-field v-model="ventaTemporal.reciboTemporal.abono" dense hide-details style="margin: 0; padding: 0"></v-text-field>                       
                      </v-card>    
                    </v-col>
                    <v-col cols="12" md="6">                  
                      <v-card class="pa-2" outlined tile style="text-align: center;">Saldo</v-card>                                     
                    </v-col>                                      
                    <v-col cols="12" md="6">
                      <v-card class="pa-2" outlined tile style="text-align: center;">                      
                        <v-text-field v-model="ventaTemporal.reciboTemporal.saldo_actual" dense hide-details style="margin: 0; padding: 0"></v-text-field>                       
                      </v-card>    
                    </v-col>
                </template>

                <template v-if="recibo.indexEditado > -1">                                                  
                    <v-col cols="12" md="6">                  
                      <v-card class="pa-2" outlined tile style="text-align: center;">Subtotal</v-card>                                     
                    </v-col>                                      
                    <v-col cols="12" md="6">
                      <v-card class="pa-2" outlined tile style="text-align: center;">                      
                        <v-text-field v-model="seccionDinero.subtotal" dense hide-details disabled style="margin: 0; padding: 0"></v-text-field>                       
                      </v-card>    
                    </v-col>
                    <v-col cols="12" md="6">                  
                      <v-card class="pa-2" outlined tile style="text-align: center;">Descuento %</v-card>                                     
                    </v-col>                                      
                    <v-col cols="12" md="6">
                      <v-card class="pa-2" outlined tile style="text-align: center;">                      
                        <v-text-field v-model="seccionDinero.descuento" dense hide-details disabled style="margin: 0; padding: 0"></v-text-field>                       
                      </v-card>    
                    </v-col> 
                    <v-col cols="12" md="6">                  
                      <v-card class="pa-2" outlined tile style="text-align: center;">Total</v-card>                                     
                    </v-col>                                      
                    <v-col cols="12" md="6">
                      <v-card class="pa-2" outlined tile style="text-align: center;">            
                        <v-text-field v-model="seccionDinero.total" dense disabled hide-details style="margin: 0; padding: 0"></v-text-field>                       
                      </v-card>    
                    </v-col>
                    <v-col cols="12" md="6">                  
                      <v-card class="pa-2" outlined tile style="text-align: center;">Abono</v-card>                                     
                    </v-col>                                      
                    <v-col cols="12" md="6">
                      <v-card class="pa-2" outlined tile style="text-align: center;">                      
                        <v-text-field v-model="seccionDinero.abono" dense disabled hide-details style="margin: 0; padding: 0"></v-text-field>                       
                      </v-card>    
                    </v-col>
                    <v-col cols="12" md="6">                  
                      <v-card class="pa-2" outlined tile style="text-align: center;">Saldo</v-card>                                     
                    </v-col>                                      
                    <v-col cols="12" md="6">
                      <v-card class="pa-2" outlined tile style="text-align: center;">                      
                        <v-text-field v-model="seccionDinero.saldo" dense disabled hide-details style="margin: 0; padding: 0"></v-text-field>                       
                      </v-card>    
                    </v-col>
                </template>
                <br/>
                <br/>
                <br/>

                  <v-card v-if="recibo.indexEditado === -1" class="pa-2" outlined tile style="text-align: center; width: 100%">                     
                      <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      max-width="290"                      
                      >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                            :value="computedDateFormattedMomentjsdtfechaentrega"
                            label="Fecha de entrega"
                            outlined
                            placeholder="xx/xx/xxxx"
                            readonly
                            dense
                            hide-details
                            clearable
                            v-on="on"
                            @click:clear="ventaTemporal.reciboTemporal.fecha_entrega = null"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="ventaTemporal.reciboTemporal.fecha_entrega"
                            @change="menu2 = false"
                        ></v-date-picker>
                      </v-menu>                                                           
                  </v-card> 
                  <v-card class="pa-2" outlined tile style="text-align: center; width: 100%" v-if="recibo.indexEditado > -1">
                    <v-text-field label="Fecha de entrega" disabled outlined dense hide-details v-model="fechaEntrega"></v-text-field>
                  </v-card>                    
                
              </v-row>
            </v-container>
            <br/>            

            <v-row justify="center" v-if="recibo.indexEditado === -1 ">
              <v-col cols="12" md="2" v-if="recibo.indexEditado === -1 && ventaTemporal.reciboTemporal.pagos.length > 1">                
                <v-btn class="mx-5" fab dark x-small color="#b50721" @click="quitarPago()">
                  <v-icon dark>mdi-close-thick</v-icon>
                </v-btn>                              
              </v-col>            
              <v-col cols="12" md="6">
                <v-btn class="mx-5" fab dark x-small color="indigo" @click="nuevoPago()">
                  <v-icon dark>mdi-plus-thick</v-icon>
                </v-btn> 
              </v-col>
            </v-row>

          </v-col>
        </v-row>

        <v-row justify="center">
          <template v-if="recibo.indexEditado === -1">
            <template v-for="(item, key) in ventaTemporal.reciboTemporal.pagos">
              <v-col cols="12" md="4" sm="12" :key="`tipo de pago-${key}`" >            
                <v-autocomplete                             
                  v-model="ventaTemporal.reciboTemporal.pagos[key].tipo_pago.nombre"
                  :items="tipos_pago"                  
                  label="Tipo de pago:"
                  dense
                  hide-no-data                  
                  clearable
                  required
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="4" sm="12" :key="`cantidad-${key}`">
                <v-text-field v-model="ventaTemporal.reciboTemporal.pagos[key].cantidad.value" label="Cantidad" prefix="Q" dense ></v-text-field>
              </v-col>
              <v-responsive :key="key" width="100%"></v-responsive>   
            </template>                   
                        
          </template>
                    
          <template v-if="recibo.indexEditado > -1">
            <template v-for="(item, key) in seccionDinero.pagos">
              <v-col cols="12" md="4" sm="12" :key="`pagotipo-${key}`">
                <v-text-field v-model="seccionDinero.pagos[key].tipo_pago.nombre" label="Tipo de pago" dense disabled></v-text-field>
              </v-col>
              <v-col cols="12" md="4" sm="12" :key="`pagocantidad-${key}`">
                <v-text-field v-model="seccionDinero.pagos[key].cantidad" label="Tipo de pago" dense disabled></v-text-field>
              </v-col> 
              <v-responsive :key="`responsive-${key}`" width="100%"></v-responsive>
            </template>
          </template>                              

        </v-row>

        <v-row justify="center" v-if="recibo.indexEditado > -1 && ventaCancelada === false && siguienteRecibo===null && seccionDinero.saldo !== 0">
          <v-btn color="blue" dark class="mb-2" @click="closeTemporal">Crear siguiente recibo</v-btn>
        </v-row>
      </v-container>

      <v-label disabled v-if="recibo.indexEditado > -1 || (recibo.indexEditado === -1 && responsable)">Atendido por: {{responsable.nombres +' '+responsable.apellidos}}</v-label>
      <v-label disabled v-if="recibo.indexEditado === -1 && !responsable">Atendido por: {{ventaTemporal.responsable.nombres +' '+ventaTemporal.responsable.apellidos}}</v-label>

    </v-card-text>

    <v-card-actions>
       <v-container v-if="recibo.indexEditado > -1" fluid>
        <v-switch v-model="habilitado" :label="`Habilitado: ${habilitado.toString()}`"></v-switch>        
      </v-container>
      <v-container v-if="recibo.indexEditado === -1" fluid>
        <v-switch v-model="ventaTemporal.reciboTemporal.habilitado" :label="`Habilitado: ${ventaTemporal.reciboTemporal.habilitado.toString()}`"></v-switch>        
      </v-container>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
      <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
      <v-btn color="blue darken-1" text @click="imprimir">Imprimir</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import moment from 'moment'

export default {
  data: () => ({    
    solorecibo: false,
    nombres_clientes: [
      'Hugo Daniel Lucas Gramajo',
      'Juan Miguel de Leon Castillo',
      'Juan Monroy',
      'Dannia Alejandroa Morales',        
    ],
    articulos: [
      'Colirio',
      'Estuche',
      'Gotas',
      'Spry', 
    ],
    codigos: [
      '001',
      '002',
      '003',
      '004', 
    ],
    tipos_pago: [
      'Efectivo',
      'Tarjeta',
      'Cheque',
      'Cuotas',        
    ],
    menu1: false,
    menu2: false,

    defaultItem: {
      habilitado: true,
      cliente:{
        nombre_cliente: "",
        apellido_cliente: "",
        telefono_cliente: "",
        direccion_cliente: '',
      }, 
      fecha_entrega: "",
      numero: "",
      fecha: new Date().toISOString().substr(0, 10),
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
          label: "Precio Unitario Q",
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
        precio: null,
      },

      dineroTest: {
        subtotal: null,
        total: null,
        descuento: null,
        abono: null,
        saldo: null,
        pago: {
          tipo: '',
          cantidad: null
        },
      },      
    },


    ////////////////////copia a editar

    ventaTemporal:{      
      fecha: new Date().toISOString().substr(0, 10),
      cancelado: false,
      subtotal: null,
      total: null,
      descuento: null,
      comision: null,
      sucursal: 'sucursal actual',
      responsable: {
        username: "administrator",
        nombres: "Administrador",
        apellidos: "Administrador"
      },
      cliente:{
        id: null,
        nombre_cliente: "",
        apellido_cliente: "",
        telefono_cliente: "",
        direccion_cliente: '',
      }, 
      detalle_accesorio: [
        {
          cantidad: {
            value: null,
          },         
          nombre: {
            value: ''
          },
          codigo: {
            value: null
          },
          precio: {
            value: null
          },
          costo: {
            value: null
          },
        }
      ],
      detalle_aro: [
        {
          cantidad:{
            value: null
          },
          nombre:{
            value: '',
          },
          codigo:{
            value: null
          },
          precio:{
            value: null
          },
          costo:{
            value: null
          },
        }
      ],      
      detalle_lente: {
        esferico: {
          od: null,
          oi: null,
          addod: null,
          addoi: null
        },
        cilindro: {
          od: null,
          oi: null,
          addod: null,
          addoi: null
        },
        eje: {
          od: null,
          oi: null,
          addod: null,
          addoi: null
        },
        dp: {
          od: null,
          oi: null,
          addod: null,
          addoi: null
        },
        cristales: '',
        montura: '',
        precio: null,
      },
      reciboTemporal:{
        fecha_entrega: '',
        numero: null,
        habilitado: true,
        fecha: new Date().toISOString().substr(0, 10),
        abono: null,
        saldo_actual: null,
        pagos: [
          {
            tipo_pago: {
              id: null,
              nombre: ''
            },
            cantidad: {
              value: null
            }
          },
        ],
        recibo_siguiente: null,
        recibo_anterior: null
      },
    },

  }),

  watch: {
    dialog(val) {
      val || this.close();
    },

    ventaTemporal: {
      deep: true,
      handler() {
        var subtot=0;
        var tpagos=0;        

        if (!this.seccionDinero) {
          for (let i in this.ventaTemporal.detalle_accesorio) {  
            console.log('Item ',this.ventaTemporal.detalle_accesorio[i])
            console.log('item.precio '+this.ventaTemporal.detalle_accesorio[i].precio.value)
            console.log('item.cantidad '+this.ventaTemporal.detalle_accesorio[i].cantidad.value)        
            subtot += this.ventaTemporal.detalle_accesorio[i].precio.value * this.ventaTemporal.detalle_accesorio[i].cantidad.value
          }
          console.log('subtot '+subtot)
          console.log('tpagos '+tpagos)
          this.ventaTemporal.subtotal = subtot          
          this.ventaTemporal.total = this.ventaTemporal.subtotal - ((this.ventaTemporal.subtotal * this.ventaTemporal.descuento)/100)          
        }

        for(let pos in this.ventaTemporal.reciboTemporal.pagos){
          console.log('pegos[] '+this.ventaTemporal.reciboTemporal.pagos[pos].cantidad.value)
          tpagos += Number(this.ventaTemporal.reciboTemporal.pagos[pos].cantidad.value)
        }
        this.ventaTemporal.reciboTemporal.abono = tpagos
        this.ventaTemporal.reciboTemporal.saldo_actual = this.ventaTemporal.total - this.ventaTemporal.reciboTemporal.abono

      }
    },
  },

  computed: {
    ...mapState(["recibo"]),
    ...mapState(["recibos"]),
    ...mapState(["ventas"]),

    ventaCancelada:{
      get(){
        return this.recibo.itemEditado.cancelada
      }
    },
    siguienteRecibo:{
      get(){
        return this.recibo.itemEditado.recibo.recibo_siguiente
      }
    },  
    responsable:{
      get(){
        return this.recibo.itemEditado.responsable
      }
    },
    habilitado: {
      get() {
        return this.recibo.itemEditado.recibo.habilitado
      },
      set(){
        this.$store.commit('recibo/editHabilitado', !this.recibo.itemEditado.recibo.habilitado) 
      }
    },
    idCliente:{
      get(){
        return this.recibo.itemEditado.cliente.id
      }
    },
    nombreCliente: {
      get() {                
        return this.recibo.itemEditado.cliente.nombre
      }      
    },
    apellidoCliente: {
      get() {
        return this.recibo.itemEditado.cliente.apellido
      }
    },
    telefonoCliente: {
      get() {
        return this.recibo.itemEditado.cliente.telefono
      }
    },
    direccionCliente:{
      get(){
        return this.recibo.itemEditado.cliente.direccion
      }
    },
    noRecibo: {
      get() {
        return this.recibo.itemEditado.recibo.id;
      }
    },
    fechaRecibo: {
      get(){
        return this.recibo.itemEditado.recibo.fecha
      }
    },
    fechaEntrega: {
      get(){
        return this.recibo.itemEditado.recibo.fecha_entrega
      }
    },
    seccionDescripcion: {
      get() {
        return this.recibo.itemEditado.detalle_accesorio;
      }
    },
    seccionLentes: {
      get() {
        return this.recibo.itemEditado.detalle_lente;
      }
    },
    seccionAro:{
      get(){
        return this.recibo.itemEditado.detalle_aro
      }
    },
    seccionDinero: {
      get() {
        const dinero = {}
        try {
          dinero.subtotal = this.recibo.itemEditado.subtotal
          dinero.descuento = this.recibo.itemEditado.descuento
          dinero.total = this.recibo.itemEditado.total
          dinero.abono = this.recibo.itemEditado.recibo.abono
          dinero.saldo = this.recibo.itemEditado.recibo.saldo_actual
          dinero.pagos = this.recibo.itemEditado.recibo.pagos
          console.log('seccionDinero: ',dinero)        
          return dinero
        } catch (error) {
          return false
        }
        
      }
    },
    computedDateFormattedMomentjsdtfecha () {
      console.log(this.ventaTemporal.reciboTemporal.fecha)
        return (this.ventaTemporal.reciboTemporal.fecha) ? moment(this.ventaTemporal.reciboTemporal.fecha).format('dddd, MMMM Do YYYY') : ''
    },
    computedDateFormattedMomentjsdtfechaentrega () {
      console.log(this.ventaTemporal.reciboTemporal.fecha_entrega)
        return (this.ventaTemporal.reciboTemporal.fecha_entrega) ? moment(this.ventaTemporal.reciboTemporal.fecha_entrega).format('dddd, MMMM Do YYYY') : ''
    },    

  },


  methods: {    

    nuevaFilaAccesorio(){      
      var naccesorio = {
        cantidad: {
          value: null
        },
        nombre: {
          value: '',
        },
        codigo: {
          value: null,
        },
        precio: {
          value: null
        },
        costo: {
          value: null
        },
      };
      this.ventaTemporal.detalle_accesorio.push(naccesorio)
      console.log(' push detalle accesorio: ', this.ventaTemporal.detalle_accesorio)
    },

    nuevoPago(){
      var npago = {
        tipo_pago:{
          id: null,
          nombre: '',          
        },
        cantidad: {
          value: null
        }
      }
      this.ventaTemporal.reciboTemporal.pagos.push(npago)
      console.log('push pagos: ', this.ventaTemporal.reciboTemporal.pagos)
    },

    quitarFilaAccesorio(){      
      this.ventaTemporal.detalle_accesorio.pop()      
      console.log('pop detalle accesorio: ', this.ventaTemporal.detalle_accesorio)
    },

    quitarPago(){
      this.ventaTemporal.reciboTemporal.pagos.pop()
      console.log('pop pagos: ', this.ventaTemporal.reciboTemporal.pagos)      
    },

    imprimir() {
      window.print();
    },    

    close() {      
      this.$store.commit("recibos/editDialog", false);
      this.$store.commit("ventas/editDialog", false);      
      console.log("cerrando el dialogo desde recibo");

      setTimeout(() => {        
        var titulo = "Nuevo Recibo";
        this.$store.commit("recibo/assignTitle", titulo);
        var itemasignar = {}
        this.$store.commit('recibo/assignItem', {itemasignar})
        var indice = -1;
        this.$store.commit("recibo/assignIndex", indice);                        
        console.log('termino de cerrar')
      }, 300);
    },

    closeTemporal(){
      this.reciboempezado()      
      this.solorecibo = true
      console.log('ventaTemporal: ',this.ventaTemporal)
      
      setTimeout(()=>{

        var titulo = "Nuevo Recibo";
        this.$store.commit("recibo/assignTitle", titulo)
        var indice = -1
        this.$store.commit("recibo/assignIndex", indice)
        console.log('termino de cerrar, pasa crear un nuevo recibo')       
                          
      },400)
    },

    /**
     * metodo que asigna lo que este en vuex a la venta temporal
     * pensando para crear un recibo a partir de otro por un abono
     * o para el flujo de consulta para capurar datos de la receta
     * o para cuando se cree un nuevo cliente en caliente
     */
    reciboempezado(){
      if (this.recibo.itemEditado.cliente.nombre) {
        console.log('telefono cliente: ',this.recibo.itemEditado.cliente.nombre)
        console.log('asignacion de cliente')
        if (this.recibo.itemEditado.cliente.apellido) {
          this.ventaTemporal.cliente.nombre_cliente = this.nombreCliente +' '+ this.apellidoCliente
        }else{
          this.ventaTemporal.cliente.nombre_cliente = this.nombreCliente
        }          
      }

      if (this.recibo.itemEditado.cliente.telefono) {
        console.log('telefono cliente: ',this.recibo.itemEditado.cliente.telefono)
        console.log('asignacion de cliente')
        this.ventaTemporal.cliente.telefono_cliente = this.telefonoCliente
      }

      if (this.recibo.itemEditado.cliente.direccion) {
        console.log('direccion cliente: ',this.recibo.itemEditado.cliente.direccion)
        this.ventaTemporal.cliente.direccion_cliente = this.direccionCliente
      }

      if (this.recibo.itemEditado.detalle_lente) {
        console.log('detalle lente: ',this.recibo.itemEditado.detalle_lente)
        this.ventaTemporal.detalle_lente = JSON.parse(JSON.stringify(this.recibo.itemEditado.detalle_lente))
      }

      if (this.seccionDinero) {
        console.log('seccion dinero: ',this.seccionDinero)
        this.ventaTemporal.subtotal = this.seccionDinero.subtotal
        console.log('subtotal: ',this.ventaTemporal.subtotal)
        this.ventaTemporal.descuento = this.seccionDinero.descuento
        console.log('descuento: ',this.ventaTemporal.descuento)
        this.ventaTemporal.total = this.seccionDinero.total
        console.log('total: ',this.ventaTemporal.total)       
      }
    },

    save() {    
      console.log(' recibo.itemeditado: ', this.recibo.itemEditado)            
      
      if (this.recibo.indexEditado > -1) {
        //si es > -1 es porque esta editando un recibo
        let index = this.recibo.indexEditado
        let item1 = {...this.recibo.itemEditado};
        console.log('item1: ',item1)
        console.log('index editado: ', index)
        this.$store.commit("recibos/assignDesserts", index, item1);
      } else {                     
        ///si es -1 es porque es desde ventas, una venta nueva
        //pero puede que exista que es un recibo nuevo desde otro recibo,
        // en cuyo caso el indice es -1
        if (this.solorecibo) {
          let reciboenv = {...this.ventaTemporal.reciboTemporal}
          console.log('recibo a enviar: ', reciboenv)
          this.$store.commit("recibos/addDessert", reciboenv)
        }else{
          console.log('es una venta individual')
          let item2 = {...this.ventaTemporal};
          console.log('item2: ',item2)
          this.$store.commit("ventas/addDessert", item2 );
        }        
      }
      this.close();
    }
  }
};
</script>