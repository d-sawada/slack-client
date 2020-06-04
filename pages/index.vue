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
    const messages = await app.$axios.$get(
      `https://slack.com/api/conversations.history?channel=${process.env.CONVERSATION_ID}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        }
      }
    )
    return messages
  }
}
</script>
