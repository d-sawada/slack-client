<template>
  <v-form ref="form" @submit.prevent="submitMessage()">
    <v-textarea
      v-model="messageContent"
      outlined
      rows="1"
      auto-grow
      row-height="1"
      hide-details
      class="mb-1"
      @keydown.ctrl.enter.tab="submitMessage()"
    />
    <div class="d-flex flex-row-reverse">
      <v-btn :disabled="!disabled" type="submit" color="primary" depressed>
        送信
      </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
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
    submitMessage() {
      if (this.messageContent === '') {
        return
      }
      const url = `https://slack.com/api/chat.postMessage
                  ?channel=${process.env.CONVERSATION_ID}
                  &text=${this.messageContent}
                  &token=${process.env.ACCESS_TOKEN}`
      // TODO: getではなくpostメソッドに書き換える
      this.$axios.$get(url).then((response) => {
        this.$store.commit('messages/add', response.message)
      })
      this.$refs.form.reset()
    }
  }
}
</script>
