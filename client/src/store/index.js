import { createStore } from 'vuex'

export default createStore({
  state: {
    curSmallTypeList: []
  },
  mutations: {
    setCurSmallTypeList: (state, pload) => {
      console.log('pload', pload)
      state.curSmallTypeList = pload
    }
  },
  actions: {
  }
})

