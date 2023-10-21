import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, asyncRoutes, renyiRoutes, constantRoutes } from '@/router'
import router from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes: [],
    buttons: [],
    roles: [],
    resultAsyncRoutes: [],
    allRoutes: [],
    flag: false
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERINFO(state,userInfo){
    state.routes = userInfo.routes
  },
  //处理路由
  SET_RESULTASYNCROUTES: (state, asyncRoutes) => {
    state.resultAsyncRoutes = asyncRoutes
    //合并路由
    state.allRoutes = constantRoutes.concat(renyiRoutes, state.resultAsyncRoutes)

    // router.onReady(()=>{
      
    // })
    router.addRoutes(state.allRoutes)
    console.log(state.allRoutes);

    state.flag = true
  }
}

console.log(asyncRoutes);

const computedRoutes = (asyncRoutes, routes) => {

  return asyncRoutes.filter(item => {
    if (routes.indexOf(item.name) != -1) {
      if (item.children && item.children.length) {
        item.children = computedRoutes(item.children, routes)
      }
      return true
    }
  })

}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    // const { username, password } = userInfo
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
    const { username, password } = userInfo
    let result = await login({ username: username.trim(), password: password })
    console.log(result)
    if (result.code == 20000) {
      commit('SET_TOKEN', result.token)
      setToken(result.token)
      return 'ok'
    } else {

      return Promise.reject(new Error('faile'))
    }
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_USERINFO',data)
        //let a= computedRoutes(asyncRoutes,['Projs','Detail','Jichu','Bank','Corp'])
        commit('SET_RESULTASYNCROUTES', computedRoutes(asyncRoutes, data.routes))

        resolve(data)
      }).catch(error => {
        //console.log(error);
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        console.log('log');
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

