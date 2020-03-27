export default {
    obtenerRecibos: async function ({ commit }){
        //aqui ira axios
        const data = await fetch('recibos.json')
        const jsonrecibos = await data.json()
        const recibos = []
        recibos.push(jsonrecibos)
        console.log('desde actions '+recibos)
        commit('createDessert', recibos)
    },     
}
