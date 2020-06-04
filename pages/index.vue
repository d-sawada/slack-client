<template>
  <div>
    <div v-for="message in messages" :key="message.ts" class="mb-3">
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
  async asyncData({ app }) {
    const url = `https://slack.com/api/conversations.history?channel=${process.env.CONVERSATION_ID}`
    const headers = {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
    }
    const messages = await app.$axios.$get(url, { headers })
    return messages
  }
}
</script>
