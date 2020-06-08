<template>
  <MessageForm @submit="replyThread" />
</template>

<script>
import MessageForm from './MessageForm'
export default {
  components: {
    MessageForm
  },
  props: {
    thread: {
      type: Object,
      required: true
    }
  },
  methods: {
    replyThread(content) {
      const url = `https://slack.com/api/chat.postMessage
      ?channel=${process.env.CONVERSATION_ID}&thread_ts=${this.thread.ts}&text=${content}&token=${process.env.ACCESS_TOKEN}`
      this.$axios.$get(url).then((response) => {
        console.log(response)
        this.$emit('postReply', response)
      })
    }
  }
}
</script>
