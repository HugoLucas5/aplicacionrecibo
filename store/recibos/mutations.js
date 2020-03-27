export default {
    editDialog (state, flag){
        state.dialog = flag
    },

    assignDesserts (state, index, {item}){
        Object.assign(state.desserts[index], item)
        //modificar en la api el elemento que se acaba de editar
    },

    createDessert (state, item){
        state.desserts = item
        console.log('desde createDesserts')
    },

    addDessert (state, item){
        state.desserts.push(item)
        //modificar en la API, agregar lo que se acaba de añadir 
    },

    spliceItem (state, index){
        state.desserts.splice(index, 1)
        //modificar en la API, quitar lo que se acaba de eliminar
    },
}