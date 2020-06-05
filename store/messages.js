export const state = () => ({
  list: []
})

export const mutations = {
  fetch(state, messages) {
    state.list = messages
  },
  add(state, message) {
    state.list.push(message)
  }
}

export const getters = {
  orderByTimestampDesc(state) {
    return [...state.list].sort((a, b) => {
      return a.ts < b.ts ? -1 : 1
    })
  },
  findByTimestamp: (state) => (timestamp) => {
    return state.list.find((message) => message.ts === timestamp)
  }
}
