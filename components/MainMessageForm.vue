<template>
  <MessageForm @submit="submitMessage" />
</template>

<script>
import MessageForm from './MessageForm'
export default {
  components: {
    MessageForm
  },
  data() {
    return {
      messageContent: ''
    }
  },
  computed: {
    disabled() {
      return !!this.messageContent
    }
  },
  methods: {
    submitMessage(content) {
      const url = `https://slack.com/api/chat.postMessage?channel=${process.env.CONVERSATION_ID}&text=${content}&token=${process.env.ACCESS_TOKEN}`
      // TODO: getではなくpostメソッドに書き換える
      this.$axios.$get(url).then((response) => {
        this.$store.commit('messages/add', response.message)
      })
    }
  }
}
</script>
