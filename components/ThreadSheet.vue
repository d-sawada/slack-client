<template>
  <div>
    <v-sheet>
      <v-icon @click="hide()">mdi-close</v-icon>
      <div v-for="message in messages" :key="message.ts">
        <MessageCard :message="message" />
      </div>
      <ReplyMessageForm :thread="thread" @postReply="updateThread" />
    </v-sheet>
  </div>
</template>

<script>
import MessageCard from '../components/MessageCard'
import ReplyMessageForm from '../components/ReplyMessageForm'

export default {
  components: {
    MessageCard,
    ReplyMessageForm
  },
  props: {
    thread: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      messages: []
    }
  },
  watch: {
    thread: {
      handler() {
        const url = `https://slack.com/api/conversations.replies`
        this.$axios
          .$get(url, {
            params: {
              token: process.env.ACCESS_TOKEN,
              channel: process.env.CONVERSATION_ID,
              ts: this.thread.ts
            }
          })
          .then((res) => (this.messages = res.messages))
      },
      immediate: true
    }
  },
  methods: {
    hide() {
      this.$emit('hide')
    },
    updateThread(message) {
      this.messages.push(message)
    }
  }
}
</script>
