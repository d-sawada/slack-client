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
