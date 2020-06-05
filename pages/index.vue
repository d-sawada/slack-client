<template>
  <div>
    <v-row>
      <v-col :cols="isDisplayThread ? 8 : 12">
        <div
          v-for="message in this.$store.getters[
            'messages/orderByTimestampDesc'
          ]"
          :key="message.ts"
          class="mb-3"
        >
          <MessageCard :message="message" @displayThread="displayThread" />
        </div>
        <MessageForm />
      </v-col>
      <v-col col="4">
        <ThreadSheet
          v-if="isDisplayThread"
          :thread="displayingMessage"
          @hide="hideThread()"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import MessageCard from '../components/MessageCard'
import MessageForm from '../components/MessageForm'
import ThreadSheet from '../components/ThreadSheet'

export default {
  components: {
    MessageCard,
    MessageForm,
    ThreadSheet
  },
  async asyncData({ app, store }) {
    const url = `https://slack.com/api/conversations.history?channel=${process.env.CONVERSATION_ID}`
    const headers = {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
    }
    const response = await app.$axios.$get(url, { headers })
    store.commit('messages/fetch', response.messages)
  },
  data() {
    return {
      isDisplayThread: false,
      displayingMessage: {}
    }
  },
  methods: {
    displayThread(message) {
      this.isDisplayThread = true
      this.displayingMessage = message
    },
    hideThread() {
      this.isDisplayThread = false
      this.displayingMessage = {}
    }
  }
}
</script>
