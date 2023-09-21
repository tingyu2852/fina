import api from '@/api/index'

const actions = {
    async getAgmt({ commit }) {
       let res = await api.caiwu.getAgmt('','','agmt')
       //console.log(res,123);
       commit('GETAGMT',res.data)
    }
}

const mutations = {
    GETAGMT(state,data){
       
        state.agmtList = data.agmtList
    }
}

const state = {
    agmtList:[]
}



export default {
    namespaced: true,
    state,
    mutations,
    actions
}

