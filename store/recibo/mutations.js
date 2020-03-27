export default {
    assignIndex (state, index ) {
        console.log('DESDE ASSIGINDEX'+index)
        state.indexEditado = index
        console.log('DESDE ASSIGINDEX'+state.indexEditado)
    },

    assignItem (state, { itemasignar }) {
        console.log('DESDE ASSIGNITEM'+itemasignar)
        state.itemEditado = itemasignar
        console.log(state.itemEditado)
    },

    assignTitle (state, titulo ) {
        state.tituloForm = titulo
    },   

    editFilasRecibo (state, filas){
        state.filasRecibo = filas
    },
}