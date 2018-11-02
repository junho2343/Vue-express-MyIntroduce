import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
Vue.prototype.$http = axios

export const store = new Vuex.Store({
  state: {
    profile: {}
  },
  mutations: {
    updateJsonData (state, payload) {
      // let temp = JSON.parse(JSON.stringify(payload))
      state.profile = payload
    }
  },
  actions: {
    setJsonData: function (context) {
      axios.get('/data/get').then(response => {
        context.commit('updateJsonData', response.data)
      })
    },
    saveJsonData: function (context, payload) {
      console.log(payload)

      axios.post('/data/set', payload).then(response => {
        this.dispatch('setJsonData', response.data)
      })
    }
  }
})
