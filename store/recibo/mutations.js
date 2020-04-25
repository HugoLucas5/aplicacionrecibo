export default {
    assignIndex (state, index ) {
        console.log('DESDE ASSIGINDEX'+index)
        state.indexEditado = index
    },

    assignItem (state, { itemasignar }) {
        console.log('DESDE ASSIGNITEM'+itemasignar)
        state.itemEditado = itemasignar        
    },

    assignTitle (state, titulo ) {
        state.tituloForm = titulo
    }, 

    editHabilitado (state, flag) {
        state.itemEditado.habilitado = flag
    },
}