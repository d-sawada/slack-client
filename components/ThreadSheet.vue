<template>
  <div>
    <v-sheet>
      <v-icon @click="closeThread()">mdi-close</v-icon>
      <div v-for="message in messages" :key="message.ts">
        <MessageCard :message="message" />
      </div>
    </v-sheet>
  </div>
</template>

<script>
import MessageCard from '../components/MessageCard'

export default {
  components: {
    MessageCard
  },
  data() {
    return {
      messages: []
    }
  },
  // TODO: created? mounted?
  mounted() {
    const url = `https://slack.com/api/conversations.replies`
    this.$axios
      .$get(url, {
        params: {
          token: process.env.ACCESS_TOKEN,
          channel: process.env.CONVERSATION_ID,
          ts: this.$store.state.messages.threadMessage.thread_ts
        }
      })
      .then((res) => (this.messages = res.messages))
  },
  methods: {
    closeThread() {
      this.$store.commit('messages/closeThread')
    }
  }
}
</script>
