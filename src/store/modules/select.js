import api from '@/api/index'


const actions = {
    
    async getSelcet({commit}){
        let res = await api.fina.getSelect('proj')
        console.log(res.data);
        commit('SETSELECTLIST',res.data)
    }
}

const mutations = {
    GETAGMT(state,data){
       
        state.agmtList = data.agmtList
    },
    SETSELECTLIST(state,data){
        state.bankList = data.bankList
        state.corpList = data.corpList
        state.finaCate = data.finaCate
        state.agmtList=data.agmtList
    }
}

const state = {
    bankList :[],
    corpList:[],
    finaCate:[],
    agmtList:[0]
}



export default {
    namespaced: true,
    state,
    mutations,
    actions
}
