<template>
  <div>
    <v-row>
      <v-col :cols="isDisplayThread ? 8 : 12">
        <v-text-field
          v-model="searchText"
          solo
          prepend-inner-icon="mdi-magnify"
          placeholder="メッセージを検索"
        />
        <div v-for="message in messages" :key="message.ts" class="mb-3">
          <MessageCard :message="message" @displayThread="displayThread" />
        </div>
        <MainMessageForm />
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
import MainMessageForm from '../components/MainMessageForm'
import ThreadSheet from '../components/ThreadSheet'

export default {
  components: {
    MessageCard,
    MainMessageForm,
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
      displayingMessage: {},
      searchText: ''
    }
  },
  computed: {
    messages() {
      return this.$store.getters['messages/filterByContent'](this.searchText)
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
