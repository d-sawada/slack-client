export const state = () => ({
  list: [],
  isDisplayThread: false
})

export const mutations = {
  fetch(state, messages) {
    state.list = messages
  },
  add(state, message) {
    state.list.push(message)
  },
  openThread(state) {
    state.isDisplayThread = true
  },
  closeThread(state) {
    state.isDisplayThread = false
  }
}

export const getters = {
  orderByTimestampDesc(state) {
    return [...state.list].sort((a, b) => {
      return a.ts < b.ts ? -1 : 1
    })
  }
}
