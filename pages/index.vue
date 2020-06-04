<template>
  <div>
    <div
      v-for="message in this.$store.getters['messages/orderByTimestampDesc']"
      :key="message.ts"
      class="mb-3"
    >
      <MessageCard :message="message" />
    </div>
    <MessageForm />
  </div>
</template>

<script>
import MessageCard from '../components/MessageCard'
import MessageForm from '../components/MessageForm'

export default {
  components: {
    MessageCard,
    MessageForm
  },
  async asyncData({ app, store }) {
    const url = `https://slack.com/api/conversations.history?channel=${process.env.CONVERSATION_ID}`
    const headers = {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
    }
    const response = await app.$axios.$get(url, { headers })
    store.commit('messages/fetch', response.messages)
  }
}
</script>
