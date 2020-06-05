<template>
  <div>
    <v-sheet>
      <v-icon @click="hide()">mdi-close</v-icon>
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
  // TODO: created? mounted?
  mounted() {
    const url = `https://slack.com/api/conversations.replies`
    this.$axios
      .$get(url, {
        params: {
          token: process.env.ACCESS_TOKEN,
          channel: process.env.CONVERSATION_ID,
          ts: this.thread.thread_ts
        }
      })
      .then((res) => (this.messages = res.messages))
  },
  methods: {
    hide() {
      this.$emit('hide')
    }
  }
}
</script>
