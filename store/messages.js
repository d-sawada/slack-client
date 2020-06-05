export const state = () => ({
  list: [],
  isDisplayThread: false,
  threadMessage: { text: '' }
})

export const mutations = {
  fetch(state, messages) {
    state.list = messages
  },
  add(state, message) {
    state.list.push(message)
  },
  openThread(state, ts) {
    state.isDisplayThread = true
    state.threadMessage = state.list.find((message) => {
      return message.ts === ts
    })
  },
  closeThread(state) {
    state.isDisplayThread = false
    state.threadMessage = { text: '' }
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
