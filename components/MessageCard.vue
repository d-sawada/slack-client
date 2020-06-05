<template>
  <v-hover v-slot:default="{ hover }">
    <v-card>
      <v-card-subtitle>
        {{ message.text }}
      </v-card-subtitle>
      <v-card-actions>
        <v-btn
          v-if="message.reply_count"
          text
          @click="viewThread(message.thread_ts)"
        >
          {{ message.reply_count }}件の返信
        </v-btn>
        <v-icon v-if="hover" small @click="replyToThread(message.ts)">
          mdi-chat-outline
        </v-icon>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  methods: {
    viewThread(threadTs) {
      this.$store.commit('messages/openThread', threadTs)
    },
    replyToThread(ts) {
      console.log('replyToThread:', ts)
    }
  }
}
</script>
